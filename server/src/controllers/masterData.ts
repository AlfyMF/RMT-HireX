import { Request, Response } from 'express';
import { MasterDataService } from '../services/masterData';
import { successResponse, errorResponse } from '../utils/responseFormatter';

const service = new MasterDataService();

export class MasterDataController {
  async getJobTypes(req: Request, res: Response) {
    try {
      const result = await service.getJobTypes();
      return res.json(successResponse(result, 'Job types retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getCertifications(req: Request, res: Response) {
    try {
      const result = await service.getCertifications();
      return res.json(successResponse(result, 'Certifications retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getCountries(req: Request, res: Response) {
    try {
      const result = await service.getCountries();
      return res.json(successResponse(result, 'Countries retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getDepartments(req: Request, res: Response) {
    try {
      const result = await service.getDepartments();
      return res.json(successResponse(result, 'Departments retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getJobTitles(req: Request, res: Response) {
    try {
      const result = await service.getJobTitles();
      return res.json(successResponse(result, 'Job titles retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getQualifications(req: Request, res: Response) {
    try {
      const result = await service.getQualifications();
      return res.json(successResponse(result, 'Qualifications retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      const result = await service.getRoles();
      return res.json(successResponse(result, 'Roles retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getSkills(req: Request, res: Response) {
    try {
      const result = await service.getSkills();
      return res.json(successResponse(result, 'Skills retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getOfficeLocations(req: Request, res: Response) {
    try {
      const result = await service.getOfficeLocations();
      return res.json(successResponse(result, 'Office locations retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const result = await service.getUsers();
      return res.json(successResponse(result, 'Users retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getVisaStatuses(req: Request, res: Response) {
    try {
      const result = await service.getVisaStatuses();
      return res.json(successResponse(result, 'Visa statuses retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getWorkShifts(req: Request, res: Response) {
    try {
      const result = await service.getWorkShifts();
      return res.json(successResponse(result, 'Work shifts retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  async getWorkTimezones(req: Request, res: Response) {
    try {
      const result = await service.getWorkTimezones();
      return res.json(successResponse(result, 'Work timezones retrieved successfully'));
    } catch (error: any) {
      return res.status(500).json(errorResponse(error.message));
    }
  }
}
