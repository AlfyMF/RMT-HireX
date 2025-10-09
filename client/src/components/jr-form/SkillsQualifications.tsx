import { useState, useEffect } from "react";
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

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.mandatorySkills) setMandatorySkills(data.mandatorySkills);
    if (data.primarySkills && !data.mandatorySkills) setMandatorySkills(data.primarySkills);
    if (data.secondarySkills) setSecondarySkills(data.secondarySkills);
    if (data.niceToHaveSkills) setNiceToHaveSkills(data.niceToHaveSkills);
    if (data.qualifications) setQualifications(data.qualifications);
    if (data.certifications) setCertifications(data.certifications);
  }, [data.mandatorySkills, data.primarySkills, data.secondarySkills, data.niceToHaveSkills, data.qualifications, data.certifications]);

  const skillsOptions = [
    "React", "TypeScript", "Node.js", "Python", "Java", "C++", "C#", 
    "JavaScript", "Angular", "Vue.js", "Express.js", "Django", "Flask",
    "Spring Boot", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API",
    "Git", "CI/CD", "Jenkins", "Terraform", "Ansible", "Linux", "Bash",
    "Microservices", "Agile", "Scrum", "TDD", "Jest", "Mocha"
  ];

  const qualificationOptions = [
    "Undergraduate",
    "Graduate",
    "Post-graduate",
    "Diploma/Certification",
    "Doctorate/PhD"
  ];

  const certificationsOptions = [
    "AWS Certified Solutions Architect", "AWS Certified Developer",
    "Azure Developer Associate", "Google Cloud Professional",
    "Certified Kubernetes Administrator", "PMP", "Scrum Master",
    "Oracle Certified Professional", "Microsoft Certified", "React Certified"
  ];

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
            defaultValue={data.specificQualification}
            data-testid="input-specific-qualification"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="certifications">Certification (Mandatory & good to have)</Label>
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
              defaultValue={data.totalExperience?.min}
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
              defaultValue={data.totalExperience?.max}
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
              defaultValue={data.relevantExperience?.min}
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
              defaultValue={data.relevantExperience?.max}
              data-testid="input-relevant-exp-max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
