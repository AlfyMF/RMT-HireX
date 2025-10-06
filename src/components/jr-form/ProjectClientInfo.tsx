import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectClientInfoProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
}

export default function ProjectClientInfo({ data, onUpdate }: ProjectClientInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project & Client Information</h2>
        <p className="text-muted-foreground">
          Provide details about the project and client
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectName">
            Project Name <span className="text-destructive">*</span>
          </Label>
          <Input id="projectName" placeholder="Enter project name" defaultValue={data.projectName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName">
            Client Name <span className="text-destructive">*</span>
          </Label>
          <Input id="clientName" placeholder="Enter client name" defaultValue={data.clientName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessUnit">
            Business Unit <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.businessUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Select business unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Enterprise Solutions">Enterprise Solutions</SelectItem>
              <SelectItem value="Digital Solutions">Digital Solutions</SelectItem>
              <SelectItem value="Consulting Services">Consulting Services</SelectItem>
              <SelectItem value="Innovation Lab">Innovation Lab</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectLocation">Project Location</Label>
          <Input id="projectLocation" placeholder="Enter project location" defaultValue={data.projectLocation} />
        </div>
      </div>
    </div>
  );
}
