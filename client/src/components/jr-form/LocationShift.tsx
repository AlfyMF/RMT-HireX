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
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface LocationShiftProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function LocationShift({ data, onUpdate, workArrangement }: LocationShiftProps) {
  // Offshore state
  const [workLocations, setWorkLocations] = useState<string[]>(data.workLocations || []);
  const [workShifts, setWorkShifts] = useState<string[]>(data.workShifts || []);
  
  // Onsite state
  const [onsiteWorkMode, setOnsiteWorkMode] = useState<string>(data.onsiteWorkMode || "");
  
  const workLocationOptions = ["Trivandrum", "Kochi", "Bangalore", "Remote"];
  const workShiftOptions = ["General: 9am - 6pm", "UK", "US", "Australia", "Other"];
  const timezoneOptions = ["EST", "PST", "IST", "GMT", "CET", "JST", "AEST"];

  // Check if shift time field should be shown (if UK/US/Australia/Other is selected)
  const showShiftTime = workShifts.some(shift => 
    ["UK", "US", "Australia", "Other"].includes(shift)
  );

  // Check if onsite location and days should be shown
  const showOnsiteLocationFields = onsiteWorkMode === "WFO" || onsiteWorkMode === "Hybrid";

  // Update parent when state changes
  useEffect(() => {
    if (workArrangement === "Offshore") {
      onUpdate({ workLocations, workShifts });
    } else {
      onUpdate({ onsiteWorkMode });
    }
  }, [workLocations, workShifts, onsiteWorkMode, workArrangement, onUpdate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Location & Shift Details</h2>
        <p className="text-muted-foreground">
          Specify work location and shift preferences
        </p>
      </div>

      {workArrangement === "Offshore" ? (
        <div className="grid gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="workLocation">
                Work Location <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select all applicable work locations for this role</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <MultiSelect
              options={workLocationOptions}
              selected={workLocations}
              onChange={setWorkLocations}
              placeholder="Select work locations"
              data-testid="multiselect-work-location"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="workShifts">
                Work Shifts <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select all applicable work shifts. If you choose UK/US/Australia/Other, specify the Indian time below.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <MultiSelect
              options={workShiftOptions}
              selected={workShifts}
              onChange={setWorkShifts}
              placeholder="Select work shifts"
              data-testid="multiselect-work-shifts"
            />
          </div>

          {showShiftTime && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="shiftTime">Shift Time</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the working hours in Indian Standard Time for the selected shift(s) (e.g., "1pm – 10pm IST").</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="shiftTime"
                placeholder='e.g., "1pm – 10pm IST"'
                defaultValue={data.shiftTime}
                onChange={(e) => onUpdate({ shiftTime: e.target.value })}
                data-testid="input-shift-time"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="onsiteWorkMode">
                Onsite Work Mode <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the onsite work mode: Remote, Hybrid, or Work From Office (WFO).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={onsiteWorkMode} onValueChange={setOnsiteWorkMode}>
              <SelectTrigger data-testid="select-onsite-work-mode">
                <SelectValue placeholder="Select work mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="WFO">Work From Office (WFO)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showOnsiteLocationFields && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="onsiteLocation">
                    Onsite Location <span className="text-destructive">*</span>
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the onsite office location if the work mode is WFO or Hybrid.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="onsiteLocation"
                  placeholder="Enter onsite location"
                  defaultValue={data.onsiteLocation}
                  onChange={(e) => onUpdate({ onsiteLocation: e.target.value })}
                  data-testid="input-onsite-location"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="onsiteDaysInOffice">
                    Onsite Days in Office per Week <span className="text-destructive">*</span>
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the number of days per week the candidate is expected in the office (1–7).</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  id="onsiteDaysInOffice"
                  min="1"
                  max="7"
                  placeholder="Number of days (1-7)"
                  defaultValue={data.onsiteDaysInOffice}
                  onChange={(e) => onUpdate({ onsiteDaysInOffice: e.target.value })}
                  data-testid="input-onsite-days-in-office"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="preferredTimezone">
                Preferred Work Time Zone <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the preferred time zone for this role.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              defaultValue={data.preferredTimezone}
              onValueChange={(value) => onUpdate({ preferredTimezone: value })}
            >
              <SelectTrigger data-testid="select-preferred-timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezoneOptions.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
