import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SkillsQualificationsProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function SkillsQualifications({ data, onUpdate }: SkillsQualificationsProps) {
  const [mandatorySkills, setMandatorySkills] = useState<string[]>(data.mandatorySkills || data.primarySkills || []);
  const [secondarySkills, setSecondarySkills] = useState<string[]>(data.secondarySkills || []);
  const [niceToHaveSkills, setNiceToHaveSkills] = useState<string[]>(data.niceToHaveSkills || []);
  const [qualifications, setQualifications] = useState<string[]>(data.qualifications || []);
  const [certifications, setCertifications] = useState<string[]>(data.certifications || []);

  // Fetch master data
  const { data: skills } = useQuery<any[]>({ queryKey: ['/skills'] });
  const { data: qualificationsData } = useQuery<any[]>({ queryKey: ['/qualifications'] });
  const { data: certificationsData } = useQuery<any[]>({ queryKey: ['/certifications'] });

  // Convert master data to options arrays
  const skillsOptions = skills?.map(skill => skill.name) || [];
  const qualificationOptions = qualificationsData?.map(qual => qual.name) || [];
  const certificationsOptions = certificationsData?.map(cert => cert.name) || [];

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.mandatorySkills) setMandatorySkills(data.mandatorySkills);
    if (data.primarySkills && !data.mandatorySkills) setMandatorySkills(data.primarySkills);
    if (data.secondarySkills) setSecondarySkills(data.secondarySkills);
    if (data.niceToHaveSkills) setNiceToHaveSkills(data.niceToHaveSkills);
    if (data.qualifications) setQualifications(data.qualifications);
    if (data.certifications) setCertifications(data.certifications);
  }, [data.mandatorySkills, data.primarySkills, data.secondarySkills, data.niceToHaveSkills, data.qualifications, data.certifications]);

  // Update parent when state changes
  useEffect(() => {
    onUpdate({ 
      mandatorySkills, 
      primarySkills: mandatorySkills,
      secondarySkills, 
      niceToHaveSkills, 
      qualifications, 
      certifications 
    });
  }, [mandatorySkills, secondarySkills, niceToHaveSkills, qualifications, certifications, onUpdate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Skills & Qualifications</h2>
        <p className="text-muted-foreground">
          Define the required skills and qualifications for this position
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mandatorySkills">
              Primary Skills <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the essential skills required for this role. Candidates must have all these skills.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={skillsOptions}
            selected={mandatorySkills}
            onChange={setMandatorySkills}
            placeholder="Select primary skills"
            data-testid="multiselect-mandatory-skills"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="secondarySkills">
              Secondary Skills <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select additional skills that are beneficial but not essential.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={skillsOptions}
            selected={secondarySkills}
            onChange={setSecondarySkills}
            placeholder="Select secondary skills"
            data-testid="multiselect-secondary-skills"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="niceToHaveSkills">
              Skills – Nice to have <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select skills that are nice to have but not required.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={skillsOptions}
            selected={niceToHaveSkills}
            onChange={setNiceToHaveSkills}
            placeholder="Select nice to have skills"
            data-testid="multiselect-nice-to-have-skills"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="qualification">
              Qualification <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the minimum education level required for this role.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={qualificationOptions}
            selected={qualifications}
            onChange={setQualifications}
            placeholder="Select qualifications"
            data-testid="multiselect-qualification"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="specificQualification">Specific Qualification</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Specify the exact degree, major, or field required.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="specificQualification" 
            placeholder='e.g., "B.Tech in Computer Science"' 
            value={data.specificQualification || ""}
            onChange={(e) => onUpdate({ specificQualification: e.target.value })}
            data-testid="input-specific-qualification"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="certifications">Certification</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select relevant certifications from the master list.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={certificationsOptions}
            selected={certifications}
            onChange={setCertifications}
            placeholder="Select certifications"
            data-testid="multiselect-certifications"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="totalExpMin">
                Total Experience (Min) <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the minimum and maximum total years of experience required.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              type="number" 
              id="totalExpMin" 
              min="0" 
              placeholder="Min years" 
              value={data.totalExperience?.min || ""}
              onChange={(e) => onUpdate({ totalExperience: { ...data.totalExperience, min: e.target.value } })}
              data-testid="input-total-exp-min"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="totalExpMax">
                Total Experience (Max) <span className="text-destructive">*</span>
              </Label>
            </div>
            <Input 
              type="number" 
              id="totalExpMax" 
              min="0" 
              placeholder="Max years" 
              value={data.totalExperience?.max || ""}
              onChange={(e) => onUpdate({ totalExperience: { ...data.totalExperience, max: e.target.value } })}
              data-testid="input-total-exp-max"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="relevantExpMin">
                Relevant Experience (Min) <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the years of experience required specifically in the mandatory skills listed above.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              type="number" 
              id="relevantExpMin" 
              min="0" 
              placeholder="Min years" 
              value={data.relevantExperience?.min || ""}
              onChange={(e) => onUpdate({ relevantExperience: { ...data.relevantExperience, min: e.target.value } })}
              data-testid="input-relevant-exp-min"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="relevantExpMax">
                Relevant Experience (Max) <span className="text-destructive">*</span>
              </Label>
            </div>
            <Input 
              type="number" 
              id="relevantExpMax" 
              min="0" 
              placeholder="Max years" 
              value={data.relevantExperience?.max || ""}
              onChange={(e) => onUpdate({ relevantExperience: { ...data.relevantExperience, max: e.target.value } })}
              data-testid="input-relevant-exp-max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
