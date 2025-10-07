import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";

interface SkillsQualificationsProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
}

export default function SkillsQualifications({ data, onUpdate }: SkillsQualificationsProps) {
  const [primarySkills, setPrimarySkills] = useState<string[]>(data.primarySkills || []);
  const [secondarySkills, setSecondarySkills] = useState<string[]>(data.secondarySkills || []);
  const [certifications, setCertifications] = useState<string[]>(data.certifications || []);

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.primarySkills) setPrimarySkills(data.primarySkills);
    if (data.secondarySkills) setSecondarySkills(data.secondarySkills);
    if (data.certifications) setCertifications(data.certifications);
  }, [data.primarySkills, data.secondarySkills, data.certifications]);

  const primarySkillsOptions = [
    "React", "TypeScript", "Node.js", "Python", "Java", "C++", "C#", 
    "JavaScript", "Angular", "Vue.js", "Express.js", "Django", "Flask",
    "Spring Boot", "AWS", "Azure", "GCP", "Docker", "Kubernetes"
  ];

  const secondarySkillsOptions = [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API",
    "Git", "CI/CD", "Jenkins", "Terraform", "Ansible", "Linux", "Bash",
    "Microservices", "Agile", "Scrum", "TDD", "Jest", "Mocha"
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
          <Label htmlFor="primarySkills">
            Primary Skills <span className="text-destructive">*</span>
          </Label>
          <MultiSelect
            options={primarySkillsOptions}
            selected={primarySkills}
            onChange={setPrimarySkills}
            placeholder="Select primary skills"
          />
          <p className="text-xs text-muted-foreground">
            Select one or more primary skills
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondarySkills">Secondary Skills</Label>
          <MultiSelect
            options={secondarySkillsOptions}
            selected={secondarySkills}
            onChange={setSecondarySkills}
            placeholder="Select secondary skills"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifications">Certifications</Label>
          <MultiSelect
            options={certificationsOptions}
            selected={certifications}
            onChange={setCertifications}
            placeholder="Select certifications"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="experience">
              Experience (Years) <span className="text-destructive">*</span>
            </Label>
            <Input type="number" id="experience" min="0" placeholder="Years of experience" defaultValue={data.experience} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input id="education" placeholder="e.g., Bachelor's in Computer Science" defaultValue={data.education} />
          </div>
        </div>
      </div>
    </div>
  );
}
