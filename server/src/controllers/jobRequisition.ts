import { Request, Response } from 'express';
import { JobRequisitionService } from '../services/jobRequisition';
import { approvalWorkflowService } from '../services/approvalWorkflow';
import { createJobRequisitionSchema, updateJobRequisitionSchema, jobRequisitionQuerySchema } from '../validators/jobRequisition';
import { successResponse, errorResponse } from '../utils/responseFormatter';

const service = new JobRequisitionService();

export class JobRequisitionController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = createJobRequisitionSchema.parse(req.body);
      const result = await service.create(validatedData);
      
      // If JR is submitted (not draft), initiate approval workflow
      if (validatedData.jrStatus === 'Submitted' && result.id) {
        await approvalWorkflowService.initiateApprovalWorkflow(result.id);
      }
      
      return res.status(201).json(successResponse(result, 'Job requisition created successfully'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query = jobRequisitionQuerySchema.parse(req.query);
      
      // Get user info from JWT token (set by auth middleware)
      const userId = (req as any).user?.userId;
      const userRole = (req as any).user?.role;
      
      const result = await service.findAll(query, userId, userRole);
      return res.json(successResponse(result.data, 'Job requisitions retrieved successfully', result.meta));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.findById(id);
      
      if (!result) {
        return res.status(404).json(errorResponse('Job requisition not found'));
      }
      
      return res.json(successResponse(result, 'Job requisition retrieved successfully'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateJobRequisitionSchema.parse(req.body);
      const result = await service.update(id, validatedData);
      return res.json(successResponse(result, 'Job requisition updated successfully'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.delete(id);
      return res.json(successResponse(null, 'Job requisition deleted successfully'));
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }
  }
}
