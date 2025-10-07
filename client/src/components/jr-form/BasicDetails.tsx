import { useState, useEffect } from "react";
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
  const [billable, setBillable] = useState<string>(data.billable?.toLowerCase() || "");
  const [jobType, setJobType] = useState<string>(data.jobType?.toLowerCase() || parentJobType || "");

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.billable) setBillable(data.billable.toLowerCase());
    if (data.jobType) setJobType(data.jobType.toLowerCase());
  }, [data.billable, data.jobType]);

  // Update parent jobType when local jobType changes
  useEffect(() => {
    if (setParentJobType && jobType) {
      setParentJobType(jobType);
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
        <div className="space-y-2">
          <Label htmlFor="workArrangement">
            Work Arrangement <span className="text-destructive">*</span>
          </Label>
          <Select 
            value={workArrangement} 
            onValueChange={(value: "Offshore" | "Onsite") => setWorkArrangement(value)}
          >
            <SelectTrigger data-testid="select-work-arrangement">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Offshore">Offshore</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobType">
            Job Type <span className="text-destructive">*</span>
          </Label>
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger data-testid="select-job-type">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="permanent">Permanent</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">
            Job Title <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.title}>
            <SelectTrigger data-testid="select-job-title">
              <SelectValue placeholder="Select job title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Developer">Software Developer</SelectItem>
              <SelectItem value="Senior Full Stack Developer">Senior Full Stack Developer</SelectItem>
              <SelectItem value="Tech Lead">Tech Lead</SelectItem>
              <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requestedDate">
            Requested Date <span className="text-destructive">*</span>
          </Label>
          <Input 
            type="date" 
            id="requestedDate" 
            defaultValue={data.requestedDate}
            data-testid="input-requested-date"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryUnit">
            Delivery Unit <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.deliveryUnit || data.department}>
            <SelectTrigger data-testid="select-delivery-unit">
              <SelectValue placeholder="Select delivery unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requestedBy">
            Requested By <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.requestedBy}>
            <SelectTrigger data-testid="select-requested-by">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Doe">John Doe</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              <SelectItem value="Bob Wilson">Bob Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiringManager">
            Hiring Manager <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.hiringManager}>
            <SelectTrigger data-testid="select-hiring-manager">
              <SelectValue placeholder="Select hiring manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
              <SelectItem value="Carol Martinez">Carol Martinez</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              <SelectItem value="David Lee">David Lee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="positions">
            Number of Positions <span className="text-destructive">*</span>
          </Label>
          <Input 
            type="number" 
            id="positions" 
            min="1" 
            defaultValue={data.positions || 1}
            data-testid="input-positions"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="onboardingFrom">Expected Date of Onboarding (Start)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the expected date range for onboarding.</p>
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
          <Label htmlFor="onboardingTo">Expected Date of Onboarding (End)</Label>
          <Input 
            type="date" 
            id="onboardingTo" 
            defaultValue={data.onboardingTo}
            data-testid="input-onboarding-end"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="idealStartFrom">Ideal Start Date (Start)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the ideal start date range for candidate onboarding.</p>
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
          <Label htmlFor="idealStartTo">Ideal Start Date (End)</Label>
          <Input 
            type="date" 
            id="idealStartTo" 
            defaultValue={data.idealStartTo || data.startDateTo}
            data-testid="input-ideal-start-to"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billable">
            Billable <span className="text-destructive">*</span>
          </Label>
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

        <div className="space-y-2">
          <Label htmlFor="billingRate">Client Billing Rate</Label>
          <Input 
            type="number" 
            id="billingRate" 
            placeholder="Enter rate"
            defaultValue={data.clientBillingRate}
            disabled={billable !== "yes"}
            data-testid="input-billing-rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetMin">Total Budget (Min)</Label>
          <Input 
            type="number" 
            id="budgetMin" 
            placeholder="Minimum budget"
            defaultValue={data.totalBudget?.min}
            disabled={jobType === "permanent"}
            data-testid="input-budget-min"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetMax">Total Budget (Max)</Label>
          <Input 
            type="number" 
            id="budgetMax" 
            placeholder="Maximum budget"
            defaultValue={data.totalBudget?.max}
            disabled={jobType === "permanent"}
            data-testid="input-budget-max"
          />
        </div>

        {workArrangement === "Offshore" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Expected Salary Range (Min)</Label>
              <Input 
                type="number" 
                id="salaryMin" 
                placeholder="Minimum salary" 
                defaultValue={data.expectedSalary?.min}
                data-testid="input-salary-min"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Expected Salary Range (Max)</Label>
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
