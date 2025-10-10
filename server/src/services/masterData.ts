import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MasterDataService {
  async getJobTypes() {
    return await prisma.jobType.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getCertifications() {
    return await prisma.certification.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getCountries() {
    return await prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getDepartments() {
    return await prisma.department.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getJobTitles() {
    return await prisma.jobTitle.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
    });
  }

  async getQualifications() {
    return await prisma.qualification.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getRoles() {
    return await prisma.role.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getSkills() {
    return await prisma.skill.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getOfficeLocations() {
    return await prisma.officeLocation.findMany({
      where: { isActive: true },
      include: { country: true },
      orderBy: { name: 'asc' },
    });
  }

  async getUsers() {
    return await prisma.user.findMany({
      where: { isActive: true },
      include: {
        roleRef: true,
        department: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async getVisaStatuses() {
    return await prisma.visaStatus.findMany({
      where: { isActive: true },
      orderBy: { status: 'asc' },
    });
  }

  async getWorkShifts() {
    return await prisma.workShift.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getWorkTimezones() {
    return await prisma.workTimeZone.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}
