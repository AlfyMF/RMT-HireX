import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface BasicDetailsProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: "Offshore" | "Onsite";
  setWorkArrangement: (value: "Offshore" | "Onsite") => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function BasicDetails({ 
  data, 
  onUpdate, 
  workArrangement, 
  setWorkArrangement,
  jobType: parentJobType,
  setJobType: setParentJobType
}: BasicDetailsProps) {
  // Helper to capitalize first letter
  const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  
  const [billable, setBillable] = useState<string>(data.billable?.toLowerCase() || "");
  const [jobType, setJobType] = useState<string>(capitalize(data.jobType || parentJobType || ""));
  const [selectedDepartment, setSelectedDepartment] = useState<string>(data.department || data.deliveryUnit || "");

  // Fetch master data
  const { data: jobTypes } = useQuery<any[]>({ queryKey: ['/job-types'] });
  const { data: skills } = useQuery<any[]>({ queryKey: ['/skills'] });
  const { data: jobTitles } = useQuery<any[]>({ queryKey: ['/job-titles'] });
  const { data: departments } = useQuery<any[]>({ queryKey: ['/departments'] });
  const { data: users } = useQuery<any[]>({ queryKey: ['/users'] });

  // Filter users for Hiring Manager and Requested By based on selected department and role
  const filteredUsers = useMemo(() => {
    if (!users || !selectedDepartment) return [];
    return users.filter(user => 
      user.department?.name === selectedDepartment && 
      (user.roleRef?.name === "Hiring Manager" || user.roleRef?.name === "DU Head")
    );
  }, [users, selectedDepartment]);

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.billable) setBillable(data.billable.toLowerCase());
    if (data.jobType) setJobType(capitalize(data.jobType));
    if (data.department || data.deliveryUnit) setSelectedDepartment(data.department || data.deliveryUnit);
  }, [data.billable, data.jobType, data.department, data.deliveryUnit]);

  // Update parent jobType when local jobType changes
  useEffect(() => {
    if (setParentJobType && jobType) {
      setParentJobType(jobType.toLowerCase());
    }
  }, [jobType, setParentJobType]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Basic Details</h2>
        <p className="text-muted-foreground">
          Enter the fundamental information about the job requisition
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Type */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="jobType">
              Job Type <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the type of job employment (Permanent, Contract, or Consultant).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={jobType} onValueChange={(value) => {
            setJobType(value);
            onUpdate({ jobType: value.toLowerCase() });
          }}>
            <SelectTrigger data-testid="select-job-type">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes?.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Core Skill */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="coreSkill">Core Skill</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the primary skill required for this position (optional).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            defaultValue={data.coreSkill}
            onValueChange={(value) => onUpdate({ coreSkill: value })}
          >
            <SelectTrigger data-testid="select-core-skill">
              <SelectValue placeholder="Select core skill" />
            </SelectTrigger>
            <SelectContent>
              {skills?.map((skill) => (
                <SelectItem key={skill.id} value={skill.name}>
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="jobTitle">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the job title from the predefined JobTitle Master list.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            defaultValue={data.title}
            onValueChange={(value) => onUpdate({ title: value })}
          >
            <SelectTrigger data-testid="select-job-title">
              <SelectValue placeholder="Select job title" />
            </SelectTrigger>
            <SelectContent>
              {jobTitles?.map((title) => (
                <SelectItem key={title.id} value={title.title}>
                  {title.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Requested Date */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="requestedDate">
              Requested Date <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Auto-filled with the request creation date.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            type="date" 
            id="requestedDate" 
            defaultValue={data.requestedDate}
            data-testid="input-requested-date"
          />
        </div>

        {/* Department */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="department">
              Department <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the department this position belongs to. Auto-fills based on logged-in user if applicable.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={selectedDepartment} onValueChange={(value) => {
            setSelectedDepartment(value);
            onUpdate({ department: value });
          }}>
            <SelectTrigger data-testid="select-department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments?.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Requested By */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="requestedBy">
              Requested By <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically populated with the name of the logged-in user.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            defaultValue={data.requestedBy}
            onValueChange={(value) => onUpdate({ requestedBy: value })}
          >
            <SelectTrigger data-testid="select-requested-by">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {filteredUsers?.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hiring Manager */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="hiringManager">
              Hiring Manager <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the hiring manager for this request. Only users with 'Hiring Manager' or 'DU Head' roles in the selected Department are shown.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            defaultValue={data.hiringManager}
            onValueChange={(value) => onUpdate({ hiringManager: value })}
          >
            <SelectTrigger data-testid="select-hiring-manager">
              <SelectValue placeholder="Select hiring manager" />
            </SelectTrigger>
            <SelectContent>
              {filteredUsers?.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Number of Positions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="positions">
              Number of Positions <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the number of positions to be filled. Minimum is 1.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            type="number" 
            id="positions" 
            min="1" 
            defaultValue={data.positions || 1}
            data-testid="input-positions"
          />
        </div>

        {/* Expected Date of Onboarding - OFFSHORE ONLY */}
        {workArrangement === "Offshore" && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="onboardingFrom">
                  Expected Date of Onboarding (Start) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the expected date range for onboarding new hires (Offshore only).</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="date" 
                id="onboardingFrom" 
                defaultValue={data.onboardingFrom}
                data-testid="input-onboarding-start"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="onboardingTo">
                  Expected Date of Onboarding (End) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the expected date range for onboarding new hires (Offshore only).</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="date" 
                id="onboardingTo" 
                defaultValue={data.onboardingTo}
                data-testid="input-onboarding-end"
              />
            </div>
          </>
        )}

        {/* Ideal Start Date - ONSITE ONLY */}
        {workArrangement === "Onsite" && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="idealStartFrom">
                  Ideal Start Date (Start) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the ideal start date range for Onsite positions.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="date" 
                id="idealStartFrom" 
                defaultValue={data.idealStartFrom || data.startDateFrom}
                data-testid="input-ideal-start-from"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="idealStartTo">
                  Ideal Start Date (End) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the ideal start date range for Onsite positions.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="date" 
                id="idealStartTo" 
                defaultValue={data.idealStartTo || data.startDateTo}
                data-testid="input-ideal-start-to"
              />
            </div>
          </>
        )}

        {/* Billable */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="billable">
              Billable <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Specify whether this position is billable to a client.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={billable} onValueChange={setBillable}>
            <SelectTrigger data-testid="select-billable">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client Billing Rate */}
        {billable === "yes" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="billingRate">
                Client Billing Rate <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the billing rate (per hour) for the client. Required if the position is billable.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              type="number" 
              id="billingRate" 
              placeholder="Enter rate"
              defaultValue={data.clientBillingRate}
              data-testid="input-billing-rate"
            />
          </div>
        )}

        {/* Total Budget - Contract/Consultant only */}
        {(jobType === "contract" || jobType === "consultant") && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="budgetMin">
                  Total Budget (Min) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the total budget range (in lakhs). Applicable for Contract or Consultant positions.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="number" 
                id="budgetMin" 
                placeholder="Minimum budget"
                defaultValue={data.totalBudget?.min}
                data-testid="input-budget-min"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="budgetMax">
                  Total Budget (Max) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the total budget range (in lakhs). Applicable for Contract or Consultant positions.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="number" 
                id="budgetMax" 
                placeholder="Maximum budget"
                defaultValue={data.totalBudget?.max}
                data-testid="input-budget-max"
              />
            </div>
          </>
        )}

        {/* Expected Salary Range - Offshore only */}
        {workArrangement === "Offshore" && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="salaryMin">
                  Expected Salary Range (Min) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the expected salary range for this position in lakhs.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="number" 
                id="salaryMin" 
                placeholder="Minimum salary" 
                defaultValue={data.expectedSalary?.min}
                data-testid="input-salary-min"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="salaryMax">
                  Expected Salary Range (Max) <span className="text-destructive">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the expected salary range for this position in lakhs.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                type="number" 
                id="salaryMax" 
                placeholder="Maximum salary" 
                defaultValue={data.expectedSalary?.max}
                data-testid="input-salary-max"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
