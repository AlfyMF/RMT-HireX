import { z } from "zod";

/**
 * Comprehensive validation schema for Job Requisition form
 * Triggers only on Submit (not on Next or Save & Continue)
 * All validation messages match the exact user specification
 */

// Common required fields for all JRs
const commonRequiredFields = z.object({
  jobType: z.string({ required_error: "Job Type is required" }).min(1, "Job Type is required"),
  jobTitle: z.string({ required_error: "Job Title is required" }).min(1, "Job Title is required"),
  requestedDate: z.string({ required_error: "Requested Date is required" }).min(1, "Requested Date is required").refine(val => !isNaN(Date.parse(val)), "Requested Date is required"),
  department: z.string({ required_error: "Department is required" }).min(1, "Department is required"),
  requestedBy: z.string({ required_error: "Requested By is required" }).min(1, "Requested By is required"),
  hiringManager: z.string({ required_error: "Hiring Manager is required" }).min(1, "Hiring Manager is required"),
  numberOfPositions: z.union([
    z.string({ required_error: "Number of Positions is required" }).min(1, "Number of Positions is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, "Number of Positions is required"),
    z.number({ required_error: "Number of Positions is required", invalid_type_error: "Number of Positions is required" }).min(1, "Number of Positions is required")
  ], { required_error: "Number of Positions is required", invalid_type_error: "Number of Positions is required" }),
  billable: z.string({ required_error: "Billable is required" }).min(1, "Billable is required"),
  
  // Skills & Qualifications
  primarySkills: z.array(z.string(), { required_error: "Primary Skills is required", invalid_type_error: "Primary Skills is required" }).min(1, "Primary Skills is required"),
  secondarySkills: z.array(z.string(), { required_error: "Secondary Skills is required", invalid_type_error: "Secondary Skills is required" }).min(1, "Secondary Skills is required"),
  niceToHaveSkills: z.array(z.string(), { required_error: "Skills – Nice to have is required", invalid_type_error: "Skills – Nice to have is required" }).min(1, "Skills – Nice to have is required"),
  qualifications: z.array(z.string(), { required_error: "Qualification is required", invalid_type_error: "Qualification is required" }).min(1, "Qualification is required"),
  
  // Experience with min-max validation (must be numeric)
  totalExperienceMin: z.union([
    z.string({ required_error: "Total Experience (Min) is required" }).min(1, "Total Experience (Min) is required").refine(val => !isNaN(Number(val)), "Total Experience (Min) is required"),
    z.number({ required_error: "Total Experience (Min) is required", invalid_type_error: "Total Experience (Min) is required" })
  ], { required_error: "Total Experience (Min) is required", invalid_type_error: "Total Experience (Min) is required" }),
  totalExperienceMax: z.union([
    z.string({ required_error: "Total Experience (Max) is required" }).min(1, "Total Experience (Max) is required").refine(val => !isNaN(Number(val)), "Total Experience (Max) is required"),
    z.number({ required_error: "Total Experience (Max) is required", invalid_type_error: "Total Experience (Max) is required" })
  ], { required_error: "Total Experience (Max) is required", invalid_type_error: "Total Experience (Max) is required" }),
  relevantExperienceMin: z.union([
    z.string({ required_error: "Relevant Experience (Min) is required" }).min(1, "Relevant Experience (Min) is required").refine(val => !isNaN(Number(val)), "Relevant Experience (Min) is required"),
    z.number({ required_error: "Relevant Experience (Min) is required", invalid_type_error: "Relevant Experience (Min) is required" })
  ], { required_error: "Relevant Experience (Min) is required", invalid_type_error: "Relevant Experience (Min) is required" }),
  relevantExperienceMax: z.union([
    z.string({ required_error: "Relevant Experience (Max) is required" }).min(1, "Relevant Experience (Max) is required").refine(val => !isNaN(Number(val)), "Relevant Experience (Max) is required"),
    z.number({ required_error: "Relevant Experience (Max) is required", invalid_type_error: "Relevant Experience (Max) is required" })
  ], { required_error: "Relevant Experience (Max) is required", invalid_type_error: "Relevant Experience (Max) is required" }),
  
  // Project & Client Info
  projectName: z.string({ required_error: "Project Name is required" }).min(1, "Project Name is required"),
  client: z.string({ required_error: "Client is required" }).min(1, "Client is required"),
  clientCountry: z.string({ required_error: "Client Country is required" }).min(1, "Client Country is required"),
  clientInterview: z.string({ required_error: "Client Interview is required" }).min(1, "Client Interview is required"),
  
  // Job Description
  jobPurpose: z.string({ required_error: "Job Purpose is required" }).min(1, "Job Purpose is required"),
  primaryDuties: z.string({ required_error: "Primary Duties is required" }).min(1, "Primary Duties is required"),
  goodToHaveDuties: z.string({ required_error: "Good-to-Have Duties is required" }).min(1, "Good-to-Have Duties is required"),
  jobSpecification: z.string({ required_error: "Job Specification is required" }).min(1, "Job Specification is required"),
});

// Offshore-specific required fields
const offshoreSpecificFields = z.object({
  expectedDateOfOnboardingStart: z.string({ required_error: "Expected Date of Onboarding (Start) is required" }).min(1, "Expected Date of Onboarding (Start) is required").refine(val => !isNaN(Date.parse(val)), "Expected Date of Onboarding (Start) is required"),
  expectedDateOfOnboardingEnd: z.string({ required_error: "Expected Date of Onboarding (End) is required" }).min(1, "Expected Date of Onboarding (End) is required").refine(val => !isNaN(Date.parse(val)), "Expected Date of Onboarding (End) is required"),
  workLocations: z.array(z.string(), { required_error: "Work Location is required", invalid_type_error: "Work Location is required" }).min(1, "Work Location is required"),
  workShift: z.string({ required_error: "Work Shift is required" }).min(1, "Work Shift is required"),
  expectedSalaryMin: z.union([
    z.string({ required_error: "Expected Salary Range (Min) is required" }).min(1, "Expected Salary Range (Min) is required").refine(val => !isNaN(Number(val)), "Expected Salary Range (Min) is required"),
    z.number({ required_error: "Expected Salary Range (Min) is required", invalid_type_error: "Expected Salary Range (Min) is required" })
  ], { required_error: "Expected Salary Range (Min) is required", invalid_type_error: "Expected Salary Range (Min) is required" }),
  expectedSalaryMax: z.union([
    z.string({ required_error: "Expected Salary Range (Max) is required" }).min(1, "Expected Salary Range (Max) is required").refine(val => !isNaN(Number(val)), "Expected Salary Range (Max) is required"),
    z.number({ required_error: "Expected Salary Range (Max) is required", invalid_type_error: "Expected Salary Range (Max) is required" })
  ], { required_error: "Expected Salary Range (Max) is required", invalid_type_error: "Expected Salary Range (Max) is required" }),
});

// Onsite-specific required fields
const onsiteSpecificFields = z.object({
  idealStartDateStart: z.string({ required_error: "Ideal Start Date is required" }).min(1, "Ideal Start Date is required").refine(val => !isNaN(Date.parse(val)), "Ideal Start Date is required"),
  idealStartDateEnd: z.string({ required_error: "Ideal Start Date is required" }).min(1, "Ideal Start Date is required").refine(val => !isNaN(Date.parse(val)), "Ideal Start Date is required"),
  onsiteWorkMode: z.string({ required_error: "Onsite Work Mode is required" }).min(1, "Onsite Work Mode is required"),
  onsiteLocation: z.string({ required_error: "Onsite Location is required" }).min(1, "Onsite Location is required"),
  onsiteDaysPerWeek: z.union([
    z.string({ required_error: "Onsite Days in Office per Week is required" }).min(1, "Onsite Days in Office per Week is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Onsite Days in Office per Week is required"),
    z.number({ required_error: "Onsite Days in Office per Week is required", invalid_type_error: "Onsite Days in Office per Week is required" }).min(0, "Onsite Days in Office per Week is required")
  ], { required_error: "Onsite Days in Office per Week is required", invalid_type_error: "Onsite Days in Office per Week is required" }),
  preferredTimeZone: z.string({ required_error: "Preferred Work Time Zone is required" }).min(1, "Preferred Work Time Zone is required"),
  rate: z.union([
    z.string({ required_error: "Rate is required" }).min(1, "Rate is required").refine(val => !isNaN(Number(val)), "Rate is required"),
    z.number({ required_error: "Rate is required", invalid_type_error: "Rate is required" })
  ], { required_error: "Rate is required", invalid_type_error: "Rate is required" }),
  rateUnit: z.string({ required_error: "Rate Unit is required" }).min(1, "Rate Unit is required"),
  rateCurrency: z.string({ required_error: "Currency is required" }).min(1, "Currency is required"),
  paymentCycle: z.string({ required_error: "Payment Cycle is required" }).min(1, "Payment Cycle is required"),
  visaStatuses: z.array(z.string(), { required_error: "Preferred Visa Status is required", invalid_type_error: "Preferred Visa Status is required" }).min(1, "Preferred Visa Status is required"),
  contractDuration: z.string({ required_error: "Contract Duration is required" }).min(1, "Contract Duration is required"),
  durationUnit: z.string({ required_error: "Duration Unit is required" }).min(1, "Duration Unit is required"),
  reportingManager: z.string({ required_error: "Reporting Manager is required" }).min(1, "Reporting Manager is required"),
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
 * Validate a single field and return error message if invalid
 * Returns null if field is valid, or error message string if invalid
 */
export function validateSingleField(
  fieldName: string,
  fieldValue: any,
  formData: Record<string, any>,
  workArrangement: "Offshore" | "Onsite"
): string | null {
  const toNumber = (val: any) => typeof val === 'string' ? parseFloat(val) : val;
  const jobType = String(formData.jobType || "").toLowerCase();
  const billable = String(formData.billable || "").toLowerCase();
  
  // Run full validation on the entire form to get all errors
  const { errors } = validateJRFormData(formData, workArrangement);
  
  // Return the error for this specific field, or null if no error
  return errors[fieldName] || null;
}

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
    console.log('🔍 VALIDATION ERRORS FOUND:', result.error.errors);
    result.error.errors.forEach((err) => {
      const fieldPath = err.path.join('.');
      errors[fieldPath] = err.message;
      console.log(`❌ Field: ${fieldPath} | Error: ${err.message}`);
    });
  }
  
  // Conditional validation: Total Budget is required only for Contract or Consultant job types
  const jobType = String(formData.jobType || "").toLowerCase();
  if (jobType === "contract" || jobType === "consultant") {
    if (!formData.totalBudgetMin || formData.totalBudgetMin === "") {
      errors.totalBudgetMin = "Total Budget (Min) is required";
    }
    if (!formData.totalBudgetMax || formData.totalBudgetMax === "") {
      errors.totalBudgetMax = "Total Budget (Max) is required";
    }
  }
  
  // Conditional validation: Client Billing Rate is required when Billable = "Yes"
  const billable = String(formData.billable || "").toLowerCase();
  if (billable === "yes") {
    if (!formData.clientBillingRate || formData.clientBillingRate === "") {
      errors.clientBillingRate = "Client Billing Rate is required";
    }
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
