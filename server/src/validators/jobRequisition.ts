import { z } from 'zod';

export const createJobRequisitionSchema = z.object({
  // Core Identification (server generates these)
  jrStatus: z.enum(['Draft', 'Submitted', 'DU Head Approved', 'CDO Approved', 'COO Approved', 'Approved']).default('Draft'),
  submittedBy: z.string().uuid().optional(),

  // Basic Details (Step 1)
  workArrangement: z.enum(['Offshore', 'Onsite']),
  jobTypeId: z.string().uuid(),
  coreSkillId: z.string().uuid().optional(),
  jobTitleId: z.string().uuid(),
  requestedDate: z.string().datetime().or(z.date()).optional(),
  departmentId: z.string().uuid(),
  requestedById: z.string().uuid(),
  hiringManagerId: z.string().uuid(),
  numberOfPositions: z.number().int().min(1).default(1),
  expectedDateOfOnboardingStart: z.string().datetime().or(z.date()).optional(),
  expectedDateOfOnboardingEnd: z.string().datetime().or(z.date()).optional(),
  idealStartDateStart: z.string().datetime().or(z.date()).optional(),
  idealStartDateEnd: z.string().datetime().or(z.date()).optional(),
  billable: z.boolean().default(false),
  clientBillingRate: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  totalBudgetMin: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  totalBudgetMax: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  expectedSalaryMin: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  expectedSalaryMax: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),

  // Skills & Qualifications (Step 2)
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  niceToHaveSkills: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  specificQualification: z.string().optional(),
  totalExperienceMin: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  totalExperienceMax: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  relevantExperienceMin: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  relevantExperienceMax: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),

  // Project & Client (Step 3)
  projectName: z.string().optional(),
  projectRole: z.string().optional(),
  clientName: z.string().optional(),
  clientCountryId: z.string().uuid().optional(),
  clientInterview: z.boolean().default(false),

  // Location & Shift (Step 4)
  workLocations: z.array(z.string()).default([]),
  workShiftId: z.string().uuid().optional(),
  shiftTime: z.string().optional(),
  onsiteWorkMode: z.string().optional(),
  onsiteLocationId: z.string().uuid().optional(),
  onsiteDaysPerWeek: z.number().int().min(1).max(7).optional(),
  preferredTimeZoneId: z.string().uuid().optional(),

  // Job Description (Step 5)
  jobPurpose: z.string().optional(),
  primaryDuties: z.string().optional(),
  goodToHaveDuties: z.string().optional(),
  jobSpecification: z.string().optional(),

  // Onsite-Specific (Step 6)
  rate: z.number().or(z.string()).optional().transform(val => val ? Number(val) : undefined),
  rateUnit: z.string().optional(),
  rateCurrency: z.string().optional(),
  paymentCycle: z.string().optional(),
  visaStatuses: z.array(z.string()).default([]),
  contractDuration: z.string().optional(),
  durationUnit: z.string().optional(),
  reportingManager: z.string().optional(),
  interviewProcess: z.string().optional(),
  h1Transfer: z.boolean().default(false),
  travelRequired: z.boolean().default(false),

  // Additional Required Fields
  recruiterLeadId: z.string().uuid().optional(),
  recruiterPocId: z.string().uuid().optional(),
});

export const updateJobRequisitionSchema = createJobRequisitionSchema.partial();

export const jobRequisitionQuerySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  status: z.string().optional(),
  department: z.string().optional(),
  workArrangement: z.string().optional(),
  search: z.string().optional(),
});

export type CreateJobRequisitionInput = z.infer<typeof createJobRequisitionSchema>;
export type UpdateJobRequisitionInput = z.infer<typeof updateJobRequisitionSchema>;
export type JobRequisitionQuery = z.infer<typeof jobRequisitionQuerySchema>;
