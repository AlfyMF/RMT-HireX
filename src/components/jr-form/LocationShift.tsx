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

interface LocationShiftProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
}

export default function LocationShift({ data, onUpdate }: LocationShiftProps) {
  const [workMode, setWorkMode] = useState<string>(data.workMode?.toLowerCase() || "");

  // Update local state when data changes (for edit mode)
  useEffect(() => {
    if (data.workMode) setWorkMode(data.workMode.toLowerCase());
  }, [data.workMode]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Location & Shift Details</h2>
        <p className="text-muted-foreground">
          Specify work location and shift preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="workMode">
            Work Mode <span className="text-destructive">*</span>
          </Label>
          <Select value={workMode} onValueChange={setWorkMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select work mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="wfo">Work From Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {workMode !== "remote" && workMode !== "" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter office location" defaultValue={data.location} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysInOffice">Days in Office</Label>
              <Input 
                type="number" 
                id="daysInOffice" 
                min="0" 
                max="7" 
                placeholder="Number of days"
                defaultValue={data.daysInOffice}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="workShift">
            Work Shift <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.workShift}>
            <SelectTrigger>
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning (9 AM - 5 PM)">Morning (9 AM - 5 PM)</SelectItem>
              <SelectItem value="Afternoon (2 PM - 10 PM)">Afternoon (2 PM - 10 PM)</SelectItem>
              <SelectItem value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Preferred Timezone</Label>
          <Select defaultValue={data.timezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
              <SelectItem value="est">EST (UTC-5)</SelectItem>
              <SelectItem value="pst">PST (UTC-8)</SelectItem>
              <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
