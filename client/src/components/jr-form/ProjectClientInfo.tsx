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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ProjectClientInfoProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function ProjectClientInfo({ data, onUpdate, jobType }: ProjectClientInfoProps) {
  const [clientInterview, setClientInterview] = useState<boolean>(data.clientInterview || false);

  // Show Project Role/Job Title only for Contract/Consultant
  const showProjectRole = jobType === "contract" || jobType === "consultant";

  // Update parent when clientInterview changes
  useEffect(() => {
    onUpdate({ clientInterview });
  }, [clientInterview, onUpdate]);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "India", "Singapore", "Japan", "China", "Brazil", "Mexico",
    "Netherlands", "Switzerland", "UAE", "South Africa", "Spain", "Italy"
  ];

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
          <div className="flex items-center gap-2">
            <Label htmlFor="projectName">
              Project Name <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the name of the project this role is for.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="projectName" 
            placeholder="Enter project name" 
            defaultValue={data.projectName}
            onChange={(e) => onUpdate({ projectName: e.target.value })}
            data-testid="input-project-name"
          />
        </div>

        {showProjectRole && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="projectRole">Project Role / Job Title</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the project-specific job title, if applicable.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              id="projectRole" 
              placeholder="Enter project role/job title" 
              defaultValue={data.projectRole}
              onChange={(e) => onUpdate({ projectRole: e.target.value })}
              data-testid="input-project-role"
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="client">
              Client <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the client's name for whom the position is being raised.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="client" 
            placeholder="Enter client name" 
            defaultValue={data.client || data.clientName}
            onChange={(e) => onUpdate({ client: e.target.value })}
            data-testid="input-client"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="clientCountry">
              Client Country <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the client's country from the list.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            defaultValue={data.clientCountry}
            onValueChange={(value) => onUpdate({ clientCountry: value })}
          >
            <SelectTrigger data-testid="select-client-country">
              <SelectValue placeholder="Select client country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessUnit">
            Business Unit <span className="text-destructive">*</span>
          </Label>
          <Select 
            defaultValue={data.businessUnit}
            onValueChange={(value) => onUpdate({ businessUnit: value })}
          >
            <SelectTrigger data-testid="select-business-unit">
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
          <Input 
            id="projectLocation" 
            placeholder="Enter project location" 
            defaultValue={data.projectLocation}
            onChange={(e) => onUpdate({ projectLocation: e.target.value })}
            data-testid="input-project-location"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="clientInterview">
              Client Interview <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Will the client be conducting interviews for this position?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="clientInterview"
              checked={clientInterview}
              onCheckedChange={setClientInterview}
              data-testid="switch-client-interview"
            />
            <span className="text-sm text-muted-foreground">
              {clientInterview ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
