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
  clientBillingRate: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  totalBudgetMin: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  totalBudgetMax: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  expectedSalaryMin: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  expectedSalaryMax: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),

  // Skills & Qualifications (Step 2)
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  niceToHaveSkills: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  specificQualification: z.string().nullable().optional(),
  totalExperienceMin: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  totalExperienceMax: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  relevantExperienceMin: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  relevantExperienceMax: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),

  // Project & Client (Step 3)
  projectName: z.string().nullable().optional(),
  projectRole: z.string().nullable().optional(),
  clientName: z.string().nullable().optional(),
  clientCountryId: z.string().uuid().optional(),
  clientInterview: z.boolean().default(false),

  // Location & Shift (Step 4)
  workLocations: z.union([z.array(z.string()), z.null()]).default([]),
  workShiftId: z.string().uuid().nullable().optional(),
  shiftTime: z.string().nullable().optional(),
  onsiteWorkMode: z.string().nullable().optional(),
  onsiteLocation: z.string().nullable().optional(),
  onsiteDaysPerWeek: z.number().int().min(1).max(7).nullable().optional(),
  preferredTimeZoneId: z.string().uuid().nullable().optional(),

  // Job Description (Step 5)
  jobPurpose: z.string().nullable().optional(),
  primaryDuties: z.string().nullable().optional(),
  goodToHaveDuties: z.string().nullable().optional(),
  jobSpecification: z.string().nullable().optional(),

  // Onsite-Specific (Step 6)
  rate: z.union([z.number(), z.string(), z.null()]).optional().transform(val => (val === null || val === undefined || val === '') ? null : Number(val)),
  rateUnit: z.string().nullable().optional(),
  rateCurrency: z.string().nullable().optional(),
  paymentCycle: z.string().nullable().optional(),
  visaStatuses: z.union([z.array(z.string()), z.null()]).default([]),
  contractDuration: z.string().nullable().optional(),
  durationUnit: z.string().nullable().optional(),
  reportingManager: z.string().nullable().optional(),
  interviewProcess: z.string().nullable().optional(),
  h1Transfer: z.union([z.boolean(), z.null()]).default(false),
  travelRequired: z.union([z.boolean(), z.null()]).default(false),

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
