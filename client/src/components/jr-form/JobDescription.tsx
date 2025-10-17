import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface JobDescriptionProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function JobDescription({ data, onUpdate }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Job Description & Expectations</h2>
        <p className="text-muted-foreground">
          Describe the role and responsibilities in detail
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="jobPurpose">
              Job Purpose <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Describe the main objective and intent of the job</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea
            id="jobPurpose"
            rows={4}
            placeholder="Describe the primary purpose of this role..."
            value={data.jobPurpose || ""}
            onChange={(e) => onUpdate({ jobPurpose: e.target.value })}
            data-testid="textarea-job-purpose"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mandatoryDuties">
              Primary Duties <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>List all essential job duties and responsibilities. These are must-have tasks for the role.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea
            id="mandatoryDuties"
            rows={6}
            placeholder="List the main responsibilities and duties..."
            value={data.mandatoryDuties || data.primaryDuties || ""}
            onChange={(e) => onUpdate({ 
              mandatoryDuties: e.target.value,
              primaryDuties: e.target.value 
            })}
            data-testid="textarea-mandatory-duties"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="goodToHaveDuties">
              Good-to-Have Duties <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>List additional duties or responsibilities that are desirable but not required for the role.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea
            id="goodToHaveDuties"
            rows={4}
            placeholder="Additional skills or qualifications that are beneficial..."
            value={data.goodToHaveDuties || data.goodToHave || ""}
            onChange={(e) => onUpdate({ goodToHaveDuties: e.target.value })}
            data-testid="textarea-good-to-have-duties"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="jobSpecificationSkills">
              Job Specification <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Provide detailed job specifications and required skills for the position.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea
            id="jobSpecificationSkills"
            rows={6}
            placeholder="Detailed specifications and requirements for the role..."
            value={data.jobSpecificationSkills || data.jobSpecification || ""}
            onChange={(e) => onUpdate({ 
              jobSpecificationSkills: e.target.value,
              jobSpecification: e.target.value 
            })}
            data-testid="textarea-job-specification-skills"
          />
        </div>
      </div>
    </div>
  );
}
