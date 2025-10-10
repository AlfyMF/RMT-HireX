import { PrismaClient } from '@prisma/client';
import { CreateJobRequisitionInput, UpdateJobRequisitionInput, JobRequisitionQuery } from '../validators/jobRequisition';

const prisma = new PrismaClient();

export class JobRequisitionService {
  async generateJrId(): Promise<string> {
    const count = await prisma.jobRequisition.count();
    const jrNumber = String(count + 1).padStart(3, '0');
    return `JR-${jrNumber}`;
  }

  async create(data: CreateJobRequisitionInput) {
    const jrId = await this.generateJrId();
    
    return await prisma.jobRequisition.create({
      data: {
        ...data,
        jrId,
      },
      include: {
        jobTitle: true,
        department: true,
        jobType: true,
        location: true,
        requester: true,
      },
    });
  }

  async findAll(query: JobRequisitionQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.status) {
      where.status = query.status;
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

    if (query.location) {
      where.location = {
        name: {
          contains: query.location,
          mode: 'insensitive',
        },
      };
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
          location: true,
          requester: true,
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
        location: true,
        requester: true,
      },
    });
  }

  async update(id: string, data: UpdateJobRequisitionInput) {
    return await prisma.jobRequisition.update({
      where: { id },
      data,
      include: {
        jobTitle: true,
        department: true,
        jobType: true,
        location: true,
        requester: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.jobRequisition.delete({
      where: { id },
    });
  }
}
