import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

interface OnsiteSpecificProps {
  data: Record<string, any>;
  onUpdate: (data: Record<string, any>) => void;
  workArrangement: string;
  setWorkArrangement: (value: any) => void;
  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function OnsiteSpecific({ data, onUpdate }: OnsiteSpecificProps) {
  const [rateUnit, setRateUnit] = useState<string>(data.rateUnit || "per hour");
  const [rateCurrency, setRateCurrency] = useState<string>(data.rateCurrency || "USD");
  const [contractDurationUnit, setContractDurationUnit] = useState<string>(data.contractDurationUnit || "months");
  const [preferredVisaStatus, setPreferredVisaStatus] = useState<string[]>(data.preferredVisaStatus || []);
  const [acceptH1Transfer, setAcceptH1Transfer] = useState<boolean>(data.acceptH1Transfer || false);
  const [travelRequired, setTravelRequired] = useState<boolean>(data.travelRequired || false);

  // Fetch master data
  const { data: visaStatuses } = useQuery<any[]>({ queryKey: ['/visa-statuses'] });

  // Convert master data to options array
  const visaStatusOptions = visaStatuses?.map(visa => visa.status) || [];

  useEffect(() => {
    onUpdate({
      rateUnit,
      rateCurrency,
      contractDurationUnit,
      preferredVisaStatus,
      acceptH1Transfer,
      travelRequired
    });
  }, [rateUnit, rateCurrency, contractDurationUnit, preferredVisaStatus, acceptH1Transfer, travelRequired, onUpdate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Onsite-Specific Information</h2>
        <p className="text-muted-foreground">
          Additional details for onsite positions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Rate (for Contract) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rate">
              Rate (for Contract) <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the rate for contract positions. Select the appropriate unit and currency.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            type="number"
            id="rate"
            placeholder="Enter rate amount"
            value={data.rate || ""}
            onChange={(e) => onUpdate({ rate: e.target.value })}
            data-testid="input-rate"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rateUnit">Rate Unit <span className="text-destructive">*</span></Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the unit for the rate (per hour, month, year, or contract).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={rateUnit} onValueChange={setRateUnit}>
            <SelectTrigger data-testid="select-rate-unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per hour">Per Hour</SelectItem>
              <SelectItem value="per month">Per Month</SelectItem>
              <SelectItem value="per year">Per Year</SelectItem>
              <SelectItem value="per contract">Per Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rateCurrency">Currency <span className="text-destructive">*</span></Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the currency for the rate.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={rateCurrency} onValueChange={setRateCurrency}>
            <SelectTrigger data-testid="select-rate-currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Cycle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="paymentCycle">
              Payment Cycle <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select how often payments should be processed for this role.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={data.paymentCycle || ""}
            onValueChange={(value) => onUpdate({ paymentCycle: value })}
          >
            <SelectTrigger data-testid="select-payment-cycle">
              <SelectValue placeholder="Select payment cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Visa Status */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="preferredVisaStatus">
              Preferred Visa Status <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the preferred visa status for the candidate, if applicable.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <MultiSelect
            options={visaStatusOptions}
            selected={preferredVisaStatus}
            onChange={setPreferredVisaStatus}
            placeholder="Select visa status options"
            data-testid="multiselect-visa-status"
          />
        </div>

        {/* Contract Duration */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="contractDuration">
              Contract Duration <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the contract duration and select the unit (months or years).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            type="number"
            id="contractDuration"
            placeholder="Enter duration"
            value={data.contractDuration || ""}
            onChange={(e) => onUpdate({ contractDuration: e.target.value })}
            data-testid="input-contract-duration"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="contractDurationUnit">Duration Unit <span className="text-destructive">*</span></Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the unit for contract duration (months or years).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={contractDurationUnit} onValueChange={setContractDurationUnit}>
            <SelectTrigger data-testid="select-contract-duration-unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="months">Months</SelectItem>
              <SelectItem value="years">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reporting Manager */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="reportingManager">
              Reporting Manager <span className="text-destructive">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the name of the reporting manager (Experion or Client Manager).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="reportingManager"
            placeholder="Enter reporting manager name"
            value={data.reportingManager || ""}
            onChange={(e) => onUpdate({ reportingManager: e.target.value })}
            data-testid="input-reporting-manager"
          />
        </div>

        {/* Interview Process */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="interviewProcess">Interview Process</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Describe the interview process, including the number of rounds and panel members.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea
            id="interviewProcess"
            rows={4}
            placeholder="Describe the interview process (# Rounds, Panel Names, etc.)"
            value={data.interviewProcess || ""}
            onChange={(e) => onUpdate({ interviewProcess: e.target.value })}
            data-testid="textarea-interview-process"
          />
        </div>

        {/* Accept H1 Transfer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="acceptH1Transfer">Accept H1 Transfer</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Is H1B visa transfer acceptable for this role?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="acceptH1Transfer"
              checked={acceptH1Transfer}
              onCheckedChange={setAcceptH1Transfer}
              data-testid="switch-accept-h1-transfer"
            />
            <span className="text-sm text-muted-foreground">
              {acceptH1Transfer ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Travel Required */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="travelRequired">Travel Required</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Will the candidate be required to travel for this role?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="travelRequired"
              checked={travelRequired}
              onCheckedChange={setTravelRequired}
              data-testid="switch-travel-required"
            />
            <span className="text-sm text-muted-foreground">
              {travelRequired ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
