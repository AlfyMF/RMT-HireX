import { PrismaClient } from '@prisma/client';
import { CreateJobRequisitionInput, UpdateJobRequisitionInput, JobRequisitionQuery } from '../validators/jobRequisition';

const prisma = new PrismaClient();

export class JobRequisitionService {
  async generateJrId(departmentId: string): Promise<string> {
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Fetch department to get the code
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      select: { code: true },
    });

    if (!department || !department.code) {
      throw new Error('Department not found or has no code');
    }

    // Find the highest serial number for this department and year
    const existingJRs = await prisma.jobRequisition.findMany({
      where: {
        departmentId,
        jrId: {
          contains: `EXP-${currentYear}-${department.code}-`,
        },
      },
      select: { jrId: true },
      orderBy: { jrId: 'desc' },
      take: 1,
    });

    let serialNumber = 1;
    
    if (existingJRs.length > 0 && existingJRs[0].jrId) {
      // Extract the serial number from the last JR ID (format: EXP-YYYY-CODE-###)
      const parts = existingJRs[0].jrId.split('-');
      if (parts.length === 4) {
        const lastSerial = parseInt(parts[3]);
        if (!isNaN(lastSerial)) {
          serialNumber = lastSerial + 1;
        }
      }
    }

    // Format: EXP-2025-DAI-006
    const formattedSerial = String(serialNumber).padStart(3, '0');
    return `EXP-${currentYear}-${department.code}-${formattedSerial}`;
  }

  async create(data: CreateJobRequisitionInput) {
    // Only generate JR ID if status is 'Submitted'
    // For drafts, explicitly set jrId to null (record identified by id primary key)
    const createData: any = { ...data };
    
    if (data.jrStatus === 'Submitted' && data.departmentId) {
      createData.jrId = await this.generateJrId(data.departmentId);
    } else {
      createData.jrId = null;
    }
    
    return await prisma.jobRequisition.create({
      data: createData,
      include: {
        jobTitle: true,
        department: true,
        jobType: true,
        coreSkill: true,
        requestedBy: true,
        hiringManager: true,
        clientCountry: true,
        workShift: true,
        preferredTimeZone: true,
        recruiterLead: true,
        recruiterPoc: true,
        submitter: true,
      },
    });
  }

  /**
   * Build role-based filter for JR listing
   * - Hiring Manager → Can view only JRs they submitted
   * - DU Head → Can view JRs belonging to their Department
   * - Recruiter Lead / Recruiter POC → Can view JRs assigned to them
   * - CDO / COO → Can view JRs in their approval/review pipeline
   * - Admin → Can view all JRs
   */
  async buildRoleBasedFilter(userId: string, userRole: string): Promise<any> {
    const filter: any = {};

    switch (userRole) {
      case 'Hiring Manager':
        // Only JRs they submitted or are hiring manager for
        filter.OR = [
          { submittedBy: userId },
          { hiringManagerId: userId }
        ];
        break;

      case 'DU Head':
        // JRs from their department
        const duDepartments = await prisma.department.findMany({
          where: { duHead: userId },
          select: { id: true }
        });
        filter.departmentId = {
          in: duDepartments.map(d => d.id)
        };
        break;

      case 'CDO':
        // JRs from departments they oversee (as CDO) or in CDO approval pipeline
        const cdoDepartments = await prisma.department.findMany({
          where: { cdo: userId },
          select: { id: true }
        });
        filter.OR = [
          {
            departmentId: {
              in: cdoDepartments.map(d => d.id)
            }
          },
          {
            jrStatus: {
              in: ['Pending CDO Approval', 'Pending COO Approval', 'Approved']
            }
          }
        ];
        break;

      case 'COO':
        // All JRs that reached COO level or are approved
        filter.jrStatus = {
          in: ['Pending COO Approval', 'Approved']
        };
        break;

      case 'Recruiter Lead':
        // JRs assigned to them as recruiter lead
        filter.recruiterLeadId = userId;
        break;

      case 'Recruiter POC':
        // JRs assigned to them as recruiter POC
        filter.recruiterPocId = userId;
        break;

      case 'Admin':
        // No filter - can view all
        break;

      default:
        // Unknown role - only their submissions
        filter.submittedBy = userId;
        break;
    }

    return filter;
  }

  async findAll(query: JobRequisitionQuery, userId?: string, userRole?: string) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Apply role-based filtering
    if (userId && userRole) {
      const roleFilter = await this.buildRoleBasedFilter(userId, userRole);
      Object.assign(where, roleFilter);
    }

    if (query.status) {
      where.jrStatus = query.status;
    }

    if (query.department) {
      where.department = {
        name: {
          contains: query.department,
          mode: 'insensitive',
        },
      };
    }

    if (query.workArrangement) {
      where.workArrangement = query.workArrangement;
    }

    if (query.search) {
      where.OR = [
        { jrId: { contains: query.search, mode: 'insensitive' } },
        { jobTitle: { title: { contains: query.search, mode: 'insensitive' } } },
        { department: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.jobRequisition.findMany({
        where,
        skip,
        take: limit,
        include: {
          jobTitle: true,
          department: true,
          jobType: true,
          coreSkill: true,
          requestedBy: true,
          hiringManager: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.jobRequisition.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return await prisma.jobRequisition.findUnique({
      where: { id },
      include: {
        jobTitle: true,
        department: true,
        jobType: true,
        coreSkill: true,
        requestedBy: true,
        hiringManager: true,
        clientCountry: true,
        workShift: true,
        preferredTimeZone: true,
        recruiterLead: true,
        recruiterPoc: true,
        submitter: true,
      },
    });
  }

  async update(
    id: string, 
    data: UpdateJobRequisitionInput,
    userId?: string,
    userRole?: string,
    userDepartmentId?: string
  ) {
    // Use id field (primary key) to identify and update the record
    const existingJR = await prisma.jobRequisition.findUnique({
      where: { id },
      select: { 
        jrStatus: true, 
        jrId: true, 
        departmentId: true,
        submittedBy: true 
      },
    });

    if (!existingJR) {
      throw new Error('Job requisition not found');
    }

    // Prepare the update data
    const updateData: any = { ...data };

    // Ensure submittedBy is preserved (set on creation, never changed)
    // If it's missing in existing JR and we have userId, set it now (backward compatibility)
    if (!existingJR.submittedBy && userId) {
      updateData.submittedBy = userId;
      console.log(`[JR Update] Setting missing submittedBy to userId: ${userId}`);
    } else if (existingJR.submittedBy) {
      // Preserve existing submittedBy, don't allow it to be changed
      updateData.submittedBy = existingJR.submittedBy;
    }

    // Role-based auto-advancement logic for Draft JRs
    // Only auto-advance if:
    // 1. JR is currently in Draft status
    // 2. User is submitting (jrStatus in payload is "Submitted")
    // 3. User has a role that can submit
    console.log(`[JR Update] Auto-advancement check - Current Status: ${existingJR.jrStatus}, Payload Status: ${data.jrStatus}, User Role: ${userRole}`);
    
    if (
      existingJR.jrStatus === 'Draft' && 
      data.jrStatus === 'Submitted' && 
      userRole && 
      userId
    ) {
      let autoAdvanceStatus: string | null = null;

      // Hiring Manager submits Draft → Pending DU Head Approval
      if (userRole === 'Hiring Manager') {
        autoAdvanceStatus = 'Pending DU Head Approval';
        console.log(`[JR Update] Auto-advancing HM Draft → ${autoAdvanceStatus}`);
      } 
      // DU Head submits Draft → Pending CDO Approval
      else if (userRole === 'DU Head') {
        autoAdvanceStatus = 'Pending CDO Approval';
        console.log(`[JR Update] Auto-advancing DU Head Draft → ${autoAdvanceStatus}`);
      }

      // If we determined an auto-advance status, update it
      if (autoAdvanceStatus) {
        updateData.jrStatus = autoAdvanceStatus;
        console.log(`[JR Update] Status auto-advanced to: ${autoAdvanceStatus}`);
      }
    } else {
      console.log(`[JR Update] No auto-advancement - Conditions not met`);
    }

    // Generate JR ID if transitioning from Draft to any approval status
    const isTransitioningFromDraft = existingJR.jrStatus === 'Draft' && 
                                      updateData.jrStatus && 
                                      updateData.jrStatus !== 'Draft' &&
                                      !existingJR.jrId;

    if (isTransitioningFromDraft) {
      // Use departmentId from payload or fall back to existing record
      const deptId = data.departmentId || existingJR.departmentId;
      if (deptId) {
        const jrId = await this.generateJrId(deptId);
        updateData.jrId = jrId;
      } else {
        throw new Error('Department ID is required to generate JR number');
      }
    }

    // Update the job requisition
    const updatedJR = await prisma.jobRequisition.update({
      where: { id },
      data: updateData,
      include: {
        jobTitle: true,
        department: true,
        jobType: true,
        coreSkill: true,
        requestedBy: true,
        hiringManager: true,
        clientCountry: true,
        workShift: true,
        preferredTimeZone: true,
        recruiterLead: true,
        recruiterPoc: true,
        submitter: true,
      },
    });

    // Trigger approval workflow if status was auto-advanced
    if (isTransitioningFromDraft && updateData.jrStatus && updateData.jrStatus !== 'Draft') {
      // Import and trigger approval workflow
      const { ApprovalWorkflowService } = await import('./approvalWorkflow.js');
      const approvalService = new ApprovalWorkflowService();
      
      try {
        await approvalService.initiateApprovalWorkflow(updatedJR.id);
      } catch (error) {
        console.error('Failed to initiate approval workflow:', error);
        // Don't fail the update if approval workflow has issues
      }
    }

    return updatedJR;
  }

  async delete(id: string) {
    return await prisma.jobRequisition.delete({
      where: { id },
    });
  }
}
