/**
 * Transforms form data from the multi-step JR form to the backend API schema format
 */

export interface TransformOptions {
  jobTypes?: any[];
  skills?: any[];
  jobTitles?: any[];
  departments?: any[];
  users?: any[];
  countries?: any[];
  workShifts?: any[];
  officeLocations?: any[];
  workTimeZones?: any[];
}

export function transformFormDataToAPIPayload(
  formData: Record<string, any>,
  workArrangement: string,
  options: TransformOptions = {}
) {
  const {
    jobTypes = [],
    skills = [],
    jobTitles = [],
    departments = [],
    users = [],
    countries = [],
    workShifts = [],
    officeLocations = [],
    workTimeZones = [],
  } = options;

  // Helper function to find ID by name
  const findIdByName = (array: any[], name: string | undefined | null) => {
    // Preserve explicit null values (for clearing fields)
    if (name === null) return null;
    if (!name) return undefined;
    const item = array.find(
      (i) => i.name?.toLowerCase() === name.toLowerCase() || 
             i.title?.toLowerCase() === name.toLowerCase() ||
             i.status?.toLowerCase() === name.toLowerCase()
    );
    return item?.id;
  };

  // Helper function to find user ID by name
  const findUserIdByName = (name: string | undefined | null) => {
    // Preserve explicit null values (for clearing fields)
    if (name === null) return null;
    if (!name) return undefined;
    const user = users.find((u) => u.name === name || u.email === name);
    return user?.id;
  };

  // Helper to parse date
  const parseDate = (dateValue: any) => {
    // Preserve explicit null values (for clearing fields)
    if (dateValue === null) return null;
    if (!dateValue) return undefined;
    if (dateValue instanceof Date) return dateValue.toISOString();
    if (typeof dateValue === 'string' && dateValue) {
      try {
        return new Date(dateValue).toISOString();
      } catch {
        return undefined;
      }
    }
    return undefined;
  };

  // Helper to parse number
  const parseNumber = (value: any) => {
    // Preserve explicit null values (for clearing fields)
    if (value === null) return null;
    if (value === undefined || value === '') return undefined;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? undefined : num;
  };

  // Build the payload
  const payload: Record<string, any> = {
    // Core fields
    workArrangement,
    jrStatus: formData.jrStatus || formData.status || 'Draft',

    // Basic Details (Step 1)
    jobTypeId: findIdByName(jobTypes, formData.jobType),
    coreSkillId: findIdByName(skills, formData.coreSkill),
    jobTitleId: findIdByName(jobTitles, formData.jobTitle),
    requestedDate: parseDate(formData.requestedDate),
    departmentId: findIdByName(departments, formData.department || formData.deliveryUnit),
    requestedById: findUserIdByName(formData.requestedBy),
    hiringManagerId: findUserIdByName(formData.hiringManager),
    numberOfPositions: formData.numberOfPositions ? parseInt(formData.numberOfPositions) : 1,
    expectedDateOfOnboardingStart: parseDate(formData.expectedDateOfOnboardingStart),
    expectedDateOfOnboardingEnd: parseDate(formData.expectedDateOfOnboardingEnd),
    idealStartDateStart: parseDate(formData.idealStartDateStart),
    idealStartDateEnd: parseDate(formData.idealStartDateEnd),
    billable: formData.billable === 'yes' || formData.billable === true,
    clientBillingRate: parseNumber(formData.clientBillingRate),
    totalBudgetMin: parseNumber(formData.totalBudgetMin),
    totalBudgetMax: parseNumber(formData.totalBudgetMax),
    expectedSalaryMin: parseNumber(formData.expectedSalaryMin),
    expectedSalaryMax: parseNumber(formData.expectedSalaryMax),

    // Skills & Qualifications (Step 2)
    primarySkills: formData.primarySkills === null ? null : (Array.isArray(formData.primarySkills) ? formData.primarySkills : []),
    secondarySkills: formData.secondarySkills === null ? null : (Array.isArray(formData.secondarySkills) ? formData.secondarySkills : []),
    niceToHaveSkills: formData.niceToHaveSkills === null ? null : (Array.isArray(formData.niceToHaveSkills) ? formData.niceToHaveSkills : []),
    qualifications: formData.qualifications === null ? null : (Array.isArray(formData.qualifications) ? formData.qualifications : []),
    certifications: formData.certifications === null ? null : (Array.isArray(formData.certifications) ? formData.certifications : []),
    specificQualification: formData.specificQualification,
    totalExperienceMin: parseNumber(formData.totalExperienceMin),
    totalExperienceMax: parseNumber(formData.totalExperienceMax),
    relevantExperienceMin: parseNumber(formData.relevantExperienceMin),
    relevantExperienceMax: parseNumber(formData.relevantExperienceMax),

    // Project & Client (Step 3)
    projectName: formData.projectName,
    projectRole: formData.projectRole,
    clientName: formData.clientName || formData.client,
    clientCountryId: findIdByName(countries, formData.clientCountry),
    clientInterview: formData.clientInterview === 'yes' || formData.clientInterview === true,

    // Location & Shift (Step 4)
    workLocations: formData.workLocations === null ? null : (Array.isArray(formData.workLocations) ? formData.workLocations : []),
    workShiftId: findIdByName(workShifts, formData.workShift),
    shiftTime: formData.shiftTime === null ? null : formData.shiftTime,
    onsiteWorkMode: formData.onsiteWorkMode === null ? null : formData.onsiteWorkMode,
    onsiteLocation: formData.onsiteLocation === null ? null : formData.onsiteLocation,
    onsiteDaysPerWeek: formData.onsiteDaysPerWeek === null ? null : (formData.onsiteDaysPerWeek ? parseInt(formData.onsiteDaysPerWeek) : undefined),
    preferredTimeZoneId: findIdByName(workTimeZones, formData.preferredTimeZone),

    // Job Description (Step 5)
    jobPurpose: formData.jobPurpose,
    primaryDuties: formData.primaryDuties,
    goodToHaveDuties: formData.goodToHaveDuties,
    jobSpecification: formData.jobSpecification,

    // Onsite-Specific (Step 6)
    rate: parseNumber(formData.rate),
    rateUnit: formData.rateUnit === null ? null : formData.rateUnit,
    rateCurrency: formData.rateCurrency === null ? null : formData.rateCurrency,
    paymentCycle: formData.paymentCycle === null ? null : formData.paymentCycle,
    visaStatuses: formData.visaStatuses === null ? null : (Array.isArray(formData.visaStatuses) ? formData.visaStatuses : []),
    contractDuration: formData.contractDuration === null ? null : formData.contractDuration,
    durationUnit: formData.durationUnit === null ? null : formData.durationUnit,
    reportingManager: formData.reportingManager === null ? null : formData.reportingManager,
    interviewProcess: formData.interviewProcess === null ? null : formData.interviewProcess,
    h1Transfer: formData.h1Transfer === null ? null : (formData.h1Transfer === 'yes' || formData.h1Transfer === true),
    travelRequired: formData.travelRequired === null ? null : (formData.travelRequired === 'yes' || formData.travelRequired === true),

    // Additional fields
    recruiterLeadId: findUserIdByName(formData.recruiterLead),
    recruiterPocId: findUserIdByName(formData.recruiterPoc),
    submittedBy: formData.submittedBy,
  };

  // Remove undefined values but keep null (null explicitly clears fields in DB)
  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
    // Keep null values - they tell the backend to set fields to NULL
  });

  return payload;
}

/**
 * Transforms API response data back to form data structure
 */
export function transformAPIResponseToFormData(apiData: any): Record<string, any> {
  if (!apiData) return {};

  return {
    // Basic Details
    jobType: apiData.jobType?.name,
    coreSkill: apiData.coreSkill?.name,
    jobTitle: apiData.jobTitle?.title,
    requestedDate: apiData.requestedDate ? apiData.requestedDate.split('T')[0] : undefined,
    department: apiData.department?.name,
    requestedBy: apiData.requestedBy?.name,
    hiringManager: apiData.hiringManager?.name,
    numberOfPositions: apiData.numberOfPositions,
    expectedDateOfOnboardingStart: apiData.expectedDateOfOnboardingStart ? apiData.expectedDateOfOnboardingStart.split('T')[0] : undefined,
    expectedDateOfOnboardingEnd: apiData.expectedDateOfOnboardingEnd ? apiData.expectedDateOfOnboardingEnd.split('T')[0] : undefined,
    idealStartDateStart: apiData.idealStartDateStart ? apiData.idealStartDateStart.split('T')[0] : undefined,
    idealStartDateEnd: apiData.idealStartDateEnd ? apiData.idealStartDateEnd.split('T')[0] : undefined,
    onboardingFrom: apiData.expectedDateOfOnboardingStart ? apiData.expectedDateOfOnboardingStart.split('T')[0] : undefined,
    onboardingTo: apiData.expectedDateOfOnboardingEnd ? apiData.expectedDateOfOnboardingEnd.split('T')[0] : undefined,
    idealStartFrom: apiData.idealStartDateStart ? apiData.idealStartDateStart.split('T')[0] : undefined,
    idealStartTo: apiData.idealStartDateEnd ? apiData.idealStartDateEnd.split('T')[0] : undefined,
    billable: apiData.billable ? 'yes' : 'no',
    clientBillingRate: apiData.clientBillingRate,
    totalBudgetMin: apiData.totalBudgetMin,
    totalBudgetMax: apiData.totalBudgetMax,
    expectedSalaryMin: apiData.expectedSalaryMin,
    expectedSalaryMax: apiData.expectedSalaryMax,

    // Skills & Qualifications
    primarySkills: apiData.primarySkills || [],
    secondarySkills: apiData.secondarySkills || [],
    niceToHaveSkills: apiData.niceToHaveSkills || [],
    qualifications: apiData.qualifications || [],
    certifications: apiData.certifications || [],
    specificQualification: apiData.specificQualification,
    totalExperienceMin: apiData.totalExperienceMin,
    totalExperienceMax: apiData.totalExperienceMax,
    relevantExperienceMin: apiData.relevantExperienceMin,
    relevantExperienceMax: apiData.relevantExperienceMax,

    // Project & Client
    projectName: apiData.projectName,
    projectRole: apiData.projectRole,
    clientName: apiData.clientName,
    clientCountry: apiData.clientCountry?.name,
    clientInterview: apiData.clientInterview ? 'yes' : 'no',

    // Location & Shift
    workLocations: apiData.workLocations || [],
    workShift: apiData.workShift?.name,
    shiftTime: apiData.shiftTime,
    onsiteWorkMode: apiData.onsiteWorkMode,
    onsiteLocation: apiData.onsiteLocation,
    onsiteDaysPerWeek: apiData.onsiteDaysPerWeek,
    preferredTimeZone: apiData.preferredTimeZone?.name,

    // Job Description
    jobPurpose: apiData.jobPurpose,
    primaryDuties: apiData.primaryDuties,
    goodToHaveDuties: apiData.goodToHaveDuties,
    jobSpecification: apiData.jobSpecification,

    // Onsite-Specific
    rate: apiData.rate,
    rateUnit: apiData.rateUnit,
    rateCurrency: apiData.rateCurrency,
    paymentCycle: apiData.paymentCycle,
    visaStatuses: apiData.visaStatuses || [],
    contractDuration: apiData.contractDuration,
    durationUnit: apiData.durationUnit,
    reportingManager: apiData.reportingManager,
    interviewProcess: apiData.interviewProcess,
    h1Transfer: apiData.h1Transfer ? 'yes' : 'no',
    travelRequired: apiData.travelRequired ? 'yes' : 'no',

    // Status and IDs
    workArrangement: apiData.workArrangement,
    status: apiData.jrStatus,
    jrId: apiData.jrId,
    id: apiData.id,
  };
}
