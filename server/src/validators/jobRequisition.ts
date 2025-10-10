import { z } from 'zod';

export const createJobRequisitionSchema = z.object({
  jobTitleId: z.string().uuid(),
  departmentId: z.string().uuid(),
  jobTypeId: z.string().uuid(),
  workArrangement: z.enum(['Offshore', 'Onsite']),
  locationId: z.string().uuid(),
  positions: z.number().int().min(1).default(1),
  experience: z.string().optional(),
  salaryRange: z.string().optional(),
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  niceToHaveSkills: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  projectName: z.string().optional(),
  projectDescription: z.string().optional(),
  clientName: z.string().optional(),
  projectDuration: z.string().optional(),
  jobDescription: z.string().optional(),
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  preferredQualifications: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  workMode: z.string().optional(),
  workShift: z.string().optional(),
  workTimezone: z.string().optional(),
  clientLocation: z.string().optional(),
  visaRequirement: z.string().optional(),
  travelRequired: z.boolean().default(false),
  travelPercentage: z.number().int().min(0).max(100).optional(),
  requestedBy: z.string().uuid(),
  hiringManager: z.string().optional(),
  status: z.enum(['Draft', 'Submitted', 'DU Head Approved', 'CDO Approved', 'COO Approved', 'Approved']).default('Draft'),
});

export const updateJobRequisitionSchema = createJobRequisitionSchema.partial();

export const jobRequisitionQuerySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  status: z.string().optional(),
  department: z.string().optional(),
  workArrangement: z.string().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
});

export type CreateJobRequisitionInput = z.infer<typeof createJobRequisitionSchema>;
export type UpdateJobRequisitionInput = z.infer<typeof updateJobRequisitionSchema>;
export type JobRequisitionQuery = z.infer<typeof jobRequisitionQuerySchema>;
