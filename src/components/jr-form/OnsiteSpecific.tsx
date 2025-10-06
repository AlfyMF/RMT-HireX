import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OnsiteSpecificProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
}

export default function OnsiteSpecific({ data, onUpdate }: OnsiteSpecificProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Onsite Specific Information</h2>
        <p className="text-muted-foreground">
          Additional details for onsite positions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="onsiteWorkMode">
            Onsite Work Mode <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.onsiteWorkMode}>
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

        <div className="space-y-2">
          <Label htmlFor="onsiteLocation">
            Onsite Location <span className="text-destructive">*</span>
          </Label>
          <Input id="onsiteLocation" placeholder="Enter onsite location" defaultValue={data.onsiteLocation} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="onsiteDays">
            Days in Office <span className="text-destructive">*</span>
          </Label>
          <Input 
            type="number" 
            id="onsiteDays" 
            min="0" 
            max="7" 
            placeholder="Number of days"
            defaultValue={data.onsiteDays}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="onsiteShift">
            Work Shift <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue={data.onsiteShift}>
            <SelectTrigger>
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9 AM - 5 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (2 PM - 10 PM)</SelectItem>
              <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="onsiteTimezone">Preferred Timezone</Label>
          <Select defaultValue={data.onsiteTimezone}>
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
