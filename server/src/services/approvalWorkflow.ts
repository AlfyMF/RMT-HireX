import { PrismaClient } from '@prisma/client';
import { emailService } from './email';
import { getAppConfig } from '../config/appConfig';

const prisma = new PrismaClient();

export interface ApprovalDecision {
  action: 'approve' | 'reject';
  comments?: string;
  approverId: string;
}

export class ApprovalWorkflowService {
  /**
   * Determine next approver based on current status and submitter role
   */
  private async determineNextApprover(jr: any): Promise<{
    nextStatus: string;
    approverId: string | null;
    approverEmail: string | null;
    approverName: string | null;
    approverRole: string;
  }> {
    const department = await prisma.department.findUnique({
      where: { id: jr.departmentId },
      include: {
        duHeadUser: true,
        cdoUser: true
      }
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const submitter = await prisma.user.findUnique({
      where: { id: jr.submittedBy }
    });

    const config = await getAppConfig();

    // Determine submitter type based on who actually submitted the JR
    const isSubmitterDUHead = submitter?.role === 'DU Head';

    switch (jr.jrStatus) {
      case 'Draft':
      case 'Submitted':
        // If submitter is Hiring Manager → DU Head
        if (!isSubmitterDUHead) {
          return {
            nextStatus: 'Pending DU Head Approval',
            approverId: department.duHead || null,
            approverEmail: department.duHeadUser?.email || null,
            approverName: department.duHeadUser?.name || null,
            approverRole: 'DU Head'
          };
        }
        // If submitter is DU Head → CDO
        else {
          return {
            nextStatus: 'Pending CDO Approval',
            approverId: department.cdo || null,
            approverEmail: department.cdoUser?.email || null,
            approverName: department.cdoUser?.name || null,
            approverRole: 'CDO'
          };
        }

      case 'Pending DU Head Approval':
        // DU Head approved → CDO
        return {
          nextStatus: 'Pending CDO Approval',
          approverId: department.cdo || null,
          approverEmail: department.cdoUser?.email || null,
          approverName: department.cdoUser?.name || null,
          approverRole: 'CDO'
        };

      case 'Pending CDO Approval':
        // CDO approved → COO
        const cooUser = await prisma.user.findFirst({
          where: { 
            role: 'COO',
            isActive: true
          }
        });
        
        return {
          nextStatus: 'Pending COO Approval',
          approverId: cooUser?.id || null,
          approverEmail: cooUser?.email || config.COO_EMAIL,
          approverName: cooUser?.name || 'COO',
          approverRole: 'COO'
        };

      case 'Pending COO Approval':
        // COO approved → Approved (final)
        return {
          nextStatus: 'Approved',
          approverId: null,
          approverEmail: null,
          approverName: null,
          approverRole: 'COO'
        };

      default:
        throw new Error(`Cannot determine next approver for status: ${jr.jrStatus}`);
    }
  }

  /**
   * Initiate approval workflow when JR is submitted
   */
  async initiateApprovalWorkflow(jrId: string): Promise<void> {
    const jr = await prisma.jobRequisition.findUnique({
      where: { id: jrId },
      include: {
        jobTitle: true,
        hiringManager: true,
        department: true
      }
    });

    if (!jr || !jr.jrId) {
      throw new Error('Job requisition not found');
    }

    const nextApprover = await this.determineNextApprover(jr);

    // Update JR status
    await prisma.jobRequisition.update({
      where: { id: jrId },
      data: { jrStatus: nextApprover.nextStatus }
    });

    // Create approval history record
    await prisma.approvalHistory.create({
      data: {
        jobRequisitionId: jrId,
        approverRole: nextApprover.approverRole,
        approverId: nextApprover.approverId,
        action: 'pending',
        previousStatus: jr.jrStatus,
        newStatus: nextApprover.nextStatus
      }
    });

    // Send approval request email
    if (nextApprover.approverEmail && nextApprover.approverName) {
      const workLocations = jr.workLocations.join(', ') || 'Not specified';
      const experience = `${jr.totalExperienceMin || 0}–${jr.totalExperienceMax || 0} years`;
      const mandatorySkills = jr.primarySkills.slice(0, 3).join(', ') || 'Not specified';

      await emailService.sendApprovalRequestEmail(
        nextApprover.approverEmail,
        nextApprover.approverName,
        {
          jrId: jr.jrId,
          jobTitle: jr.jobTitle.title,
          hiringManager: jr.hiringManager.name || jr.hiringManager.email,
          location: workLocations,
          experience,
          mandatorySkills
        }
      );
    }
  }

  /**
   * Process approval decision (approve/reject)
   */
  async processApprovalDecision(
    jrId: string,
    decision: ApprovalDecision
  ): Promise<void> {
    const jr = await prisma.jobRequisition.findUnique({
      where: { id: jrId },
      include: {
        jobTitle: true,
        hiringManager: true,
        department: true,
        submitter: true
      }
    });

    if (!jr || !jr.jrId) {
      throw new Error('Job requisition not found');
    }

    const approver = await prisma.user.findUnique({
      where: { id: decision.approverId }
    });

    if (!approver) {
      throw new Error('Approver not found');
    }

    if (decision.action === 'reject') {
      // Handle rejection
      await this.handleRejection(jr, approver, decision.comments || 'No comments provided');
    } else {
      // Handle approval
      await this.handleApproval(jr, approver, decision.comments);
    }
  }

  /**
   * Handle approval
   */
  private async handleApproval(jr: any, approver: any, comments?: string): Promise<void> {
    const nextApprover = await this.determineNextApprover(jr);

    // Update JR status
    await prisma.jobRequisition.update({
      where: { id: jr.id },
      data: { jrStatus: nextApprover.nextStatus }
    });

    // Create approval history record
    await prisma.approvalHistory.create({
      data: {
        jobRequisitionId: jr.id,
        approverRole: approver.role,
        approverId: approver.id,
        action: 'approved',
        comments,
        previousStatus: jr.jrStatus,
        newStatus: nextApprover.nextStatus
      }
    });

    // Send approval notification to submitter
    const submitterEmail = jr.submitter?.email || jr.hiringManager.email;
    const submitterName = jr.submitter?.name || jr.hiringManager.name || 'User';

    await emailService.sendApprovalNotificationEmail(
      submitterEmail,
      submitterName,
      jr.jrId,
      approver.name || approver.email,
      approver.role,
      comments
    );

    // If final approval (COO), create JobDescription and assign to Recruiter Lead
    if (nextApprover.nextStatus === 'Approved') {
      await this.handleFinalApproval(jr);
    } else {
      // Send approval request to next approver
      if (nextApprover.approverEmail && nextApprover.approverName) {
        const workLocations = jr.workLocations.join(', ') || 'Not specified';
        const experience = `${jr.totalExperienceMin || 0}–${jr.totalExperienceMax || 0} years`;
        const mandatorySkills = jr.primarySkills.slice(0, 3).join(', ') || 'Not specified';

        await emailService.sendApprovalRequestEmail(
          nextApprover.approverEmail,
          nextApprover.approverName,
          {
            jrId: jr.jrId,
            jobTitle: jr.jobTitle.title,
            hiringManager: jr.hiringManager.name || jr.hiringManager.email,
            location: workLocations,
            experience,
            mandatorySkills
          }
        );
      }
    }
  }

  /**
   * Handle rejection
   */
  private async handleRejection(jr: any, approver: any, remarks: string): Promise<void> {
    // Update JR status to Rejected
    await prisma.jobRequisition.update({
      where: { id: jr.id },
      data: { jrStatus: 'Rejected' }
    });

    // Create approval history record
    await prisma.approvalHistory.create({
      data: {
        jobRequisitionId: jr.id,
        approverRole: approver.role,
        approverId: approver.id,
        action: 'rejected',
        comments: remarks,
        previousStatus: jr.jrStatus,
        newStatus: 'Rejected'
      }
    });

    // Send rejection notification to submitter
    const submitterEmail = jr.submitter?.email || jr.hiringManager.email;
    const submitterName = jr.submitter?.name || jr.hiringManager.name || 'User';

    await emailService.sendRejectionNotificationEmail(
      submitterEmail,
      submitterName,
      jr.jrId,
      approver.name || approver.email,
      remarks
    );
  }

  /**
   * Handle final approval by COO
   */
  private async handleFinalApproval(jr: any): Promise<void> {
    // Get department to find recruiter lead
    const department = await prisma.department.findUnique({
      where: { id: jr.departmentId },
      include: {
        recruiterLeadUser: true
      }
    });

    if (!department) {
      throw new Error('Department not found');
    }

    // Assign Recruiter Lead
    if (department.recruiterLead) {
      await prisma.jobRequisition.update({
        where: { id: jr.id },
        data: { recruiterLeadId: department.recruiterLead }
      });

      // Send assignment notification to Recruiter Lead
      if (department.recruiterLeadUser) {
        const workLocations = jr.workLocations.join(', ') || 'Not specified';
        
        await emailService.sendRecruiterAssignmentEmail(
          department.recruiterLeadUser.email,
          department.recruiterLeadUser.name || 'Recruiter',
          jr.jrId,
          jr.jobTitle.title,
          workLocations
        );
      }

      // Send status change notification to submitter
      const submitterEmail = jr.submitter?.email || jr.hiringManager.email;
      const submitterName = jr.submitter?.name || jr.hiringManager.name || 'User';

      await emailService.sendStatusChangeNotificationEmail(
        submitterEmail,
        submitterName,
        jr.jrId,
        'Assigned to Recruiter'
      );
    }

    // Create JobDescription
    await this.createJobDescription(jr);
  }

  /**
   * Create JobDescription from approved JR
   */
  private async createJobDescription(jr: any): Promise<void> {
    // Check if JobDescription already exists
    const existing = await prisma.jobDescription.findUnique({
      where: { jobRequisitionId: jr.id }
    });

    if (existing) {
      return; // Already created
    }

    // Create JobDescription
    await prisma.jobDescription.create({
      data: {
        jrId: jr.jrId,
        jobRequisitionId: jr.id,
        primarySkills: jr.primarySkills,
        secondarySkills: jr.secondarySkills,
        niceToHaveSkills: jr.niceToHaveSkills,
        qualifications: jr.qualifications,
        certifications: jr.certifications,
        specificQualification: jr.specificQualification,
        totalExperienceMin: jr.totalExperienceMin,
        totalExperienceMax: jr.totalExperienceMax,
        relevantExperienceMin: jr.relevantExperienceMin,
        relevantExperienceMax: jr.relevantExperienceMax,
        numberOfPositions: jr.numberOfPositions,
        expectedDateOfOnboardingStart: jr.expectedDateOfOnboardingStart,
        expectedDateOfOnboardingEnd: jr.expectedDateOfOnboardingEnd,
        workLocations: jr.workLocations,
        workShiftId: jr.workShiftId,
        shiftTime: jr.shiftTime,
        jobPurpose: jr.jobPurpose,
        primaryDuties: jr.primaryDuties,
        goodToHaveDuties: jr.goodToHaveDuties,
        jobSpecification: jr.jobSpecification,
        workArrangement: jr.workArrangement,
        requestedDate: jr.requestedDate,
        departmentId: jr.departmentId,
        hiringManagerId: jr.hiringManagerId,
        recruiterLeadId: jr.recruiterLeadId,
        recruiterPocId: jr.recruiterPocId,
        submittedBy: jr.submittedBy
      }
    });
  }

  /**
   * Check for pending approvals and send reminders
   */
  async sendPendingApprovalReminders(): Promise<void> {
    const config = await getAppConfig();
    
    if (!config.REMINDER_EMAIL_ENABLED) {
      return;
    }

    const reminderThreshold = new Date();
    reminderThreshold.setDate(reminderThreshold.getDate() - config.APPROVAL_WAITING_PERIOD_DAYS);

    // Find pending approvals older than threshold
    const pendingApprovals = await prisma.approvalHistory.findMany({
      where: {
        action: 'pending',
        actionDate: {
          lte: reminderThreshold
        }
      },
      include: {
        jobRequisition: true,
        approver: true
      }
    });

    for (const approval of pendingApprovals) {
      if (approval.approver && approval.jobRequisition.jrId) {
        await emailService.sendPendingApprovalReminderEmail(
          approval.approver.email,
          approval.approver.name || 'Approver',
          approval.jobRequisition.jrId,
          approval.actionDate
        );
      }
    }
  }
}

export const approvalWorkflowService = new ApprovalWorkflowService();
