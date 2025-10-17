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

  async findAll(query: JobRequisitionQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

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

  async update(id: string, data: UpdateJobRequisitionInput) {
    // Use id field (primary key) to identify and update the record
    const existingJR = await prisma.jobRequisition.findUnique({
      where: { id },
      select: { jrStatus: true, jrId: true, departmentId: true },
    });

    // Prepare the update data
    const updateData: any = { ...data };

    // If transitioning to Submitted and JR ID is not yet set (null), generate formatted JR number
    if (
      data.jrStatus === 'Submitted' && 
      existingJR?.jrStatus === 'Draft' &&
      !existingJR?.jrId
    ) {
      // Use departmentId from payload or fall back to existing record
      const deptId = data.departmentId || existingJR?.departmentId;
      if (deptId) {
        const jrId = await this.generateJrId(deptId);
        updateData.jrId = jrId;
      } else {
        throw new Error('Department ID is required to generate JR number');
      }
    }

    return await prisma.jobRequisition.update({
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
  }

  async delete(id: string) {
    return await prisma.jobRequisition.delete({
      where: { id },
    });
  }
}
