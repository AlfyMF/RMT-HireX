import { Request, Response } from 'express';
import { approvalWorkflowService, ApprovalDecision } from '../services/approvalWorkflow';
import { successResponse, errorResponse } from '../utils/responseFormatter';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const approvalDecisionSchema = z.object({
  action: z.enum(['approve', 'reject']),
  comments: z.string().optional()
});

export class ApprovalController {
  /**
   * Approve or reject a job requisition
   */
  async processApproval(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;
      
      if (!userId) {
        return res.status(401).json(errorResponse('User not authenticated'));
      }

      const validatedData = approvalDecisionSchema.parse(req.body);

      const decision: ApprovalDecision = {
        action: validatedData.action,
        comments: validatedData.comments,
        approverId: userId
      };

      await approvalWorkflowService.processApprovalDecision(id, decision);

      return res.json(successResponse(
        null,
        `Job requisition ${validatedData.action === 'approve' ? 'approved' : 'rejected'} successfully`
      ));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  /**
   * Get approval history for a job requisition
   */
  async getApprovalHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const history = await prisma.approvalHistory.findMany({
        where: { jobRequisitionId: id },
        include: {
          approver: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          actionDate: 'asc'
        }
      });

      return res.json(successResponse(history, 'Approval history retrieved successfully'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  /**
   * Revise a rejected job requisition (submitter only)
   */
  async reviseJobRequisition(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json(errorResponse('User not authenticated'));
      }

      // Get the JR
      const jr = await prisma.jobRequisition.findUnique({
        where: { id }
      });

      if (!jr) {
        return res.status(404).json(errorResponse('Job requisition not found'));
      }

      // Check if user is the submitter
      if (jr.submittedBy !== userId && jr.hiringManagerId !== userId) {
        return res.status(403).json(errorResponse('Only the submitter can revise this job requisition'));
      }

      // Check if JR is in rejected status
      if (jr.jrStatus !== 'Rejected') {
        return res.status(400).json(errorResponse('Only rejected job requisitions can be revised'));
      }

      // Update JR status back to Draft for revision
      await prisma.jobRequisition.update({
        where: { id },
        data: { jrStatus: 'Draft' }
      });

      return res.json(successResponse(
        null,
        'Job requisition moved to draft for revision. Please update and resubmit.'
      ));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  /**
   * Check if user can approve a specific JR
   */
  async canApprove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;
      const userRole = (req as any).user?.role;

      if (!userId) {
        return res.status(401).json(errorResponse('User not authenticated'));
      }

      const jr = await prisma.jobRequisition.findUnique({
        where: { id },
        include: {
          department: true
        }
      });

      if (!jr) {
        return res.status(404).json(errorResponse('Job requisition not found'));
      }

      let canApprove = false;
      let reason = '';

      // Check based on status and user role
      if (jr.jrStatus === 'Pending DU Head Approval' && userRole === 'DU Head') {
        canApprove = jr.department.duHead === userId;
        reason = canApprove ? 'You are the DU Head for this department' : 'You are not the DU Head for this department';
      } else if (jr.jrStatus === 'Pending CDO Approval' && userRole === 'CDO') {
        canApprove = jr.department.cdo === userId;
        reason = canApprove ? 'You are the CDO for this department' : 'You are not the CDO for this department';
      } else if (jr.jrStatus === 'Pending COO Approval' && userRole === 'COO') {
        canApprove = true;
        reason = 'You are the COO';
      } else {
        reason = `JR is in status "${jr.jrStatus}" which does not require your approval`;
      }

      return res.json(successResponse({
        canApprove,
        reason,
        currentStatus: jr.jrStatus
      }, 'Approval permission check completed'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }
}
