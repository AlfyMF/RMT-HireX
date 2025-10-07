import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
          <Label htmlFor="jobPurpose">
            Job Purpose <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="jobPurpose"
            rows={4}
            placeholder="Describe the primary purpose of this role..."
            defaultValue={data.jobPurpose}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryDuties">
            Primary Duties <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="primaryDuties"
            rows={6}
            placeholder="List the main responsibilities and duties..."
            defaultValue={data.primaryDuties}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goodToHave">Good to Have</Label>
          <Textarea
            id="goodToHave"
            rows={4}
            placeholder="Additional skills or qualifications that are beneficial..."
            defaultValue={data.goodToHave}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobSpecs">
            Job Specifications <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="jobSpecs"
            rows={6}
            placeholder="Detailed specifications and requirements for the role..."
            defaultValue={data.jobSpecifications}
          />
        </div>
      </div>
    </div>
  );
}
