import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Resend client setup
let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key,
    fromEmail: connectionSettings.settings.from_email
  };
}

async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  const { Resend } = await import('resend');
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export interface EmailData {
  recipientEmail: string;
  recipientName?: string;
  emailType: string;
  subject: string;
  body: string;
  jrId?: string;
}

export class EmailService {
  /**
   * Send email using Resend
   */
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const { client, fromEmail } = await getResendClient();

      // Create email notification record
      const notification = await prisma.emailNotification.create({
        data: {
          recipientEmail: emailData.recipientEmail,
          recipientName: emailData.recipientName,
          emailType: emailData.emailType,
          subject: emailData.subject,
          body: emailData.body,
          jrId: emailData.jrId,
          status: 'pending'
        }
      });

      // Send email via Resend
      const response = await client.emails.send({
        from: fromEmail,
        to: emailData.recipientEmail,
        subject: emailData.subject,
        html: emailData.body
      });

      // Update notification status
      await prisma.emailNotification.update({
        where: { id: notification.id },
        data: {
          status: 'sent',
          sentAt: new Date()
        }
      });

      return true;
    } catch (error: any) {
      console.error('Failed to send email:', error);
      
      // Log error
      await prisma.emailNotification.updateMany({
        where: {
          recipientEmail: emailData.recipientEmail,
          emailType: emailData.emailType,
          status: 'pending'
        },
        data: {
          status: 'failed',
          error: error.message
        }
      });

      return false;
    }
  }

  /**
   * 1. JR Assigned for Approval
   */
  async sendApprovalRequestEmail(
    approverEmail: string,
    approverName: string,
    jrDetails: {
      jrId: string;
      jobTitle: string;
      hiringManager: string;
      location: string;
      experience: string;
      mandatorySkills: string;
    }
  ): Promise<boolean> {
    const portalLink = process.env.REPLIT_DOMAINS?.split(',')[0] || 'https://your-portal-url.com';
    
    const subject = `[Action Required] Approval Needed for JR: ${jrDetails.jrId}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${approverName},</h2>
        <p>You've been assigned a new Job Requisition for approval. Please review the details below and take appropriate action:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>JR ID:</strong> ${jrDetails.jrId}</p>
          <p><strong>Role:</strong> ${jrDetails.jobTitle}</p>
          <p><strong>Hiring Manager:</strong> ${jrDetails.hiringManager}</p>
          <p><strong>Location:</strong> ${jrDetails.location}</p>
          <p><strong>Experience:</strong> ${jrDetails.experience}</p>
          <p><strong>Mandatory Skills:</strong> ${jrDetails.mandatorySkills}</p>
        </div>
        
        <p>
          <a href="${portalLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Review and Approve/Reject
          </a>
        </p>
        
        <p style="margin-top: 20px; color: #666;">Thank you,<br>HireX System</p>
        <p style="font-size: 12px; color: #999;">This is a system-generated email. Please do not reply.</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: approverEmail,
      recipientName: approverName,
      emailType: 'approval_request',
      subject,
      body,
      jrId: jrDetails.jrId
    });
  }

  /**
   * 2. JR Approved
   */
  async sendApprovalNotificationEmail(
    submitterEmail: string,
    submitterName: string,
    jrId: string,
    approverName: string,
    approverRole: string,
    remarks?: string
  ): Promise<boolean> {
    const subject = `JR ${jrId} – Approved by ${approverName}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${submitterName},</h2>
        <p>Your JR has been approved.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>JR ID:</strong> ${jrId}</p>
          <p><strong>Approved By:</strong> ${approverName} (${approverRole})</p>
          ${remarks ? `<p><strong>Remarks:</strong> ${remarks}</p>` : ''}
        </div>
        
        <p>You may proceed to the next step.</p>
        
        <p style="margin-top: 20px; color: #666;">Thank you,<br>HireX System</p>
        <p style="font-size: 12px; color: #999;">This is a system-generated email.</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: submitterEmail,
      recipientName: submitterName,
      emailType: 'approval_notification',
      subject,
      body,
      jrId
    });
  }

  /**
   * 3. JR Rejected
   */
  async sendRejectionNotificationEmail(
    submitterEmail: string,
    submitterName: string,
    jrId: string,
    approverName: string,
    remarks: string
  ): Promise<boolean> {
    const subject = `JR ${jrId} – Rejected by ${approverName}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${submitterName},</h2>
        <p>Your JR has been rejected by ${approverName}.</p>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p><strong>JR ID:</strong> ${jrId}</p>
          <p><strong>Remarks:</strong> ${remarks}</p>
        </div>
        
        <p>Kindly update the JR and resubmit it for approval.</p>
        
        <p style="margin-top: 20px; color: #666;">Thank you,<br>HireX System</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: submitterEmail,
      recipientName: submitterName,
      emailType: 'rejection_notification',
      subject,
      body,
      jrId
    });
  }

  /**
   * 4. Pending JR Reminder
   */
  async sendPendingApprovalReminderEmail(
    approverEmail: string,
    approverName: string,
    jrId: string,
    assignedDate: Date
  ): Promise<boolean> {
    const subject = `Reminder: JR ${jrId} Still Awaits Your Review`;
    const formattedDate = assignedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${approverName},</h2>
        <p>This is a reminder that the following JR is still pending your action:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>JR ID:</strong> ${jrId}</p>
          <p><strong>Assigned On:</strong> ${formattedDate}</p>
        </div>
        
        <p>Please review it at your earliest convenience.</p>
        
        <p style="margin-top: 20px; color: #666;">Thank you,<br>HireX System</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: approverEmail,
      recipientName: approverName,
      emailType: 'pending_reminder',
      subject,
      body,
      jrId
    });
  }

  /**
   * 5. JR Status Change Notification
   */
  async sendStatusChangeNotificationEmail(
    submitterEmail: string,
    submitterName: string,
    jrId: string,
    newStatus: string
  ): Promise<boolean> {
    const subject = `JR ${jrId} – Status Changed: ${newStatus}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${submitterName},</h2>
        <p>JR status has been updated.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>JR ID:</strong> ${jrId}</p>
          <p><strong>New Status:</strong> ${newStatus}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <p>View details in the system.</p>
        
        <p style="margin-top: 20px; color: #666;">Regards,<br>HireX System</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: submitterEmail,
      recipientName: submitterName,
      emailType: 'status_change',
      subject,
      body,
      jrId
    });
  }

  /**
   * 6. Auto-Assignment Notification to Recruiter Lead
   */
  async sendRecruiterAssignmentEmail(
    recruiterEmail: string,
    recruiterName: string,
    jrId: string,
    jobTitle: string,
    location: string
  ): Promise<boolean> {
    const subject = `JR ${jrId} Assigned to You`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${recruiterName},</h2>
        <p>You've been assigned as the recruiter for the following position:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Role:</strong> ${jobTitle}</p>
          <p><strong>Location:</strong> ${location}</p>
        </div>
        
        <p>Please begin sourcing at your earliest convenience.</p>
        
        <p style="margin-top: 20px; color: #666;">Regards,<br>HireX System</p>
      </div>
    `;

    return this.sendEmail({
      recipientEmail: recruiterEmail,
      recipientName: recruiterName,
      emailType: 'recruiter_assignment',
      subject,
      body,
      jrId
    });
  }
}

export const emailService = new EmailService();
