import { z } from "zod";

/**
 * Comprehensive validation schema for Job Requisition form
 * Triggers only on Submit (not on Next or Save & Continue)
 */

// Common required fields for all JRs
const commonRequiredFields = z.object({
  jobType: z.string().min(1, "Job Type is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  requestedDate: z.string().min(1, "Requested Date is required").refine(val => !isNaN(Date.parse(val)), "Requested Date must be a valid date"),
  department: z.string().min(1, "Department is required"),
  requestedBy: z.string().min(1, "Requested By is required"),
  hiringManager: z.string().min(1, "Hiring Manager is required"),
  numberOfPositions: z.union([
    z.string().min(1, "Number of Positions is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, "Number of Positions must be a valid number"),
    z.number().min(1, "Number of Positions is required")
  ]),
  billable: z.string().min(1, "Billable is required"),
  
  // Skills & Qualifications
  primarySkills: z.array(z.string()).min(1, "Primary Skills is required"),
  secondarySkills: z.array(z.string()).min(1, "Secondary Skills is required"),
  niceToHaveSkills: z.array(z.string()).min(1, "Skills – Nice to have is required"),
  qualifications: z.array(z.string()).min(1, "Qualification is required"),
  
  // Experience with min-max validation (must be numeric)
  totalExperienceMin: z.union([
    z.string().min(1, "Total Experience (Min) is required").refine(val => !isNaN(Number(val)), "Total Experience (Min) must be a number"),
    z.number()
  ]),
  totalExperienceMax: z.union([
    z.string().min(1, "Total Experience (Max) is required").refine(val => !isNaN(Number(val)), "Total Experience (Max) must be a number"),
    z.number()
  ]),
  relevantExperienceMin: z.union([
    z.string().min(1, "Relevant Experience (Min) is required").refine(val => !isNaN(Number(val)), "Relevant Experience (Min) must be a number"),
    z.number()
  ]),
  relevantExperienceMax: z.union([
    z.string().min(1, "Relevant Experience (Max) is required").refine(val => !isNaN(Number(val)), "Relevant Experience (Max) must be a number"),
    z.number()
  ]),
  
  // Project & Client Info
  projectName: z.string().min(1, "Project Name is required"),
  client: z.string().min(1, "Client is required"),
  clientCountry: z.string().min(1, "Client Country is required"),
  
  // Job Description
  jobPurpose: z.string().min(1, "Job Purpose is required"),
  primaryDuties: z.string().min(1, "Primary Duties is required"),
  goodToHaveDuties: z.string().min(1, "Good-to-Have Duties is required"),
  jobSpecification: z.string().min(1, "Job Specification is required"),
  
  // Budget & Salary (must be numeric)
  expectedSalaryMin: z.union([
    z.string().min(1, "Expected Salary Range (Min) is required").refine(val => !isNaN(Number(val)), "Expected Salary Range (Min) must be a number"),
    z.number()
  ]),
  expectedSalaryMax: z.union([
    z.string().min(1, "Expected Salary Range (Max) is required").refine(val => !isNaN(Number(val)), "Expected Salary Range (Max) must be a number"),
    z.number()
  ]),
  totalBudgetMin: z.union([
    z.string().min(1, "Total Budget (Min) is required").refine(val => !isNaN(Number(val)), "Total Budget (Min) must be a number"),
    z.number()
  ]),
  totalBudgetMax: z.union([
    z.string().min(1, "Total Budget (Max) is required").refine(val => !isNaN(Number(val)), "Total Budget (Max) must be a number"),
    z.number()
  ]),
});

// Offshore-specific required fields
const offshoreSpecificFields = z.object({
  expectedDateOfOnboardingStart: z.string().min(1, "Expected Date of Onboarding (Start) is required").refine(val => !isNaN(Date.parse(val)), "Expected Date of Onboarding (Start) must be a valid date"),
  expectedDateOfOnboardingEnd: z.string().min(1, "Expected Date of Onboarding (End) is required").refine(val => !isNaN(Date.parse(val)), "Expected Date of Onboarding (End) must be a valid date"),
  workLocations: z.array(z.string()).min(1, "Work Location is required"),
  workShift: z.string().min(1, "Work Shifts is required"),
  preferredTimeZone: z.string().min(1, "Preferred Work Time Zone is required"),
});

// Onsite-specific required fields
const onsiteSpecificFields = z.object({
  idealStartDateStart: z.string().min(1, "Ideal Start Date (Start) is required").refine(val => !isNaN(Date.parse(val)), "Ideal Start Date (Start) must be a valid date"),
  idealStartDateEnd: z.string().min(1, "Ideal Start Date (End) is required").refine(val => !isNaN(Date.parse(val)), "Ideal Start Date (End) must be a valid date"),
  onsiteWorkMode: z.string().min(1, "Onsite Work Mode is required"),
  onsiteLocation: z.string().min(1, "Onsite Location is required"),
  onsiteDaysPerWeek: z.union([
    z.string().min(1, "Onsite Days in Office per Week is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Onsite Days in Office per Week must be a valid number"),
    z.number().min(0, "Onsite Days in Office per Week must be 0 or greater")
  ]),
  rate: z.union([
    z.string().min(1, "Rate is required").refine(val => !isNaN(Number(val)), "Rate must be a number"),
    z.number()
  ]),
  rateUnit: z.string().min(1, "Rate Unit is required"),
  rateCurrency: z.string().min(1, "Currency is required"),
  paymentCycle: z.string().min(1, "Payment Cycle is required"),
  visaStatuses: z.array(z.string()).min(1, "Preferred Visa Status is required"),
  contractDuration: z.string().min(1, "Contract Duration is required"),
  durationUnit: z.string().min(1, "Duration Unit is required"),
  reportingManager: z.string().min(1, "Reporting Manager is required"),
});

/**
 * Create validation schema based on work arrangement
 */
export function createJRValidationSchema(workArrangement: "Offshore" | "Onsite") {
  const baseSchema = workArrangement === "Offshore" 
    ? commonRequiredFields.merge(offshoreSpecificFields)
    : commonRequiredFields.merge(onsiteSpecificFields);
  
  return baseSchema;
}

export type JRValidationErrors = Record<string, string>;

/**
 * Validate form data and return errors object
 */
export function validateJRFormData(
  formData: Record<string, any>, 
  workArrangement: "Offshore" | "Onsite"
): { isValid: boolean; errors: JRValidationErrors } {
  const schema = createJRValidationSchema(workArrangement);
  const result = schema.safeParse(formData);
  
  const errors: JRValidationErrors = {};
  
  // First collect all schema validation errors
  if (!result.success) {
    result.error.errors.forEach((err) => {
      const fieldPath = err.path.join('.');
      errors[fieldPath] = err.message;
    });
  }
  
  // Add custom comparison validations
  const toNumber = (val: any) => typeof val === 'string' ? parseFloat(val) : val;
  
  // Total Experience Min < Max
  const totalExpMin = toNumber(formData.totalExperienceMin);
  const totalExpMax = toNumber(formData.totalExperienceMax);
  if (!isNaN(totalExpMin) && !isNaN(totalExpMax)) {
    if (totalExpMin >= totalExpMax) {
      errors.totalExperienceMin = "Total Experience (Min) must be less than Total Experience (Max)";
    }
  }
  
  // Relevant Experience Min < Max
  const relExpMin = toNumber(formData.relevantExperienceMin);
  const relExpMax = toNumber(formData.relevantExperienceMax);
  if (!isNaN(relExpMin) && !isNaN(relExpMax)) {
    if (relExpMin >= relExpMax) {
      errors.relevantExperienceMin = "Relevant Experience (Min) must be less than Relevant Experience (Max)";
    }
  }
  
  // Expected Salary Min < Max
  const salaryMin = toNumber(formData.expectedSalaryMin);
  const salaryMax = toNumber(formData.expectedSalaryMax);
  if (!isNaN(salaryMin) && !isNaN(salaryMax)) {
    if (salaryMin >= salaryMax) {
      errors.expectedSalaryMin = "Expected Salary Range (Min) must be less than Expected Salary Range (Max)";
    }
  }
  
  // Total Budget Min < Max
  const budgetMin = toNumber(formData.totalBudgetMin);
  const budgetMax = toNumber(formData.totalBudgetMax);
  if (!isNaN(budgetMin) && !isNaN(budgetMax)) {
    if (budgetMin >= budgetMax) {
      errors.totalBudgetMin = "Total Budget (Min) must be less than Total Budget (Max)";
    }
  }
  
  // Date validations
  if (workArrangement === "Offshore") {
    if (formData.expectedDateOfOnboardingStart && formData.expectedDateOfOnboardingEnd) {
      const onboardingStart = new Date(formData.expectedDateOfOnboardingStart);
      const onboardingEnd = new Date(formData.expectedDateOfOnboardingEnd);
      if (onboardingStart >= onboardingEnd) {
        errors.expectedDateOfOnboardingStart = "Expected Date of Onboarding (Start) must be before Expected Date of Onboarding (End)";
      }
    }
  }
  
  if (workArrangement === "Onsite") {
    if (formData.idealStartDateStart && formData.idealStartDateEnd) {
      const idealStart = new Date(formData.idealStartDateStart);
      const idealEnd = new Date(formData.idealStartDateEnd);
      if (idealStart >= idealEnd) {
        errors.idealStartDateStart = "Ideal Start Date (Start) must be before Ideal Start Date (End)";
      }
    }
  }
  
  return { 
    isValid: Object.keys(errors).length === 0, 
    errors 
  };
}
