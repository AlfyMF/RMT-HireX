import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send,
  Check,
  Building2,
  Globe2,
  Pencil,
  Loader2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BasicDetails from "@/components/jr-form/BasicDetails";
import SkillsQualifications from "@/components/jr-form/SkillsQualifications";
import ProjectClientInfo from "@/components/jr-form/ProjectClientInfo";
import LocationShift from "@/components/jr-form/LocationShift";
import JobDescription from "@/components/jr-form/JobDescription";
import OnsiteSpecific from "@/components/jr-form/OnsiteSpecific";
import WorkArrangementSelection from "@/components/WorkArrangementSelection";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/services/api";
import { transformFormDataToAPIPayload, transformAPIResponseToFormData } from "@/utils/jobRequisitionTransformer";

const steps = [
  { id: 1, name: "Basic Details", component: BasicDetails },
  { id: 2, name: "Skills & Qualifications", component: SkillsQualifications },
  { id: 3, name: "Project & Client Info", component: ProjectClientInfo },
  { id: 4, name: "Location & Shift", component: LocationShift },
  { id: 5, name: "Job Description", component: JobDescription },
  { id: 6, name: "Onsite Specific", component: OnsiteSpecific, conditional: true },
];

export default function CreateJobRequisition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [currentStep, setCurrentStep] = useState(1);
  const [workArrangement, setWorkArrangement] = useState<"Offshore" | "Onsite" | null>(null);
  const [jobType, setJobType] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showChangeDialog, setShowChangeDialog] = useState(false);
  const [pendingWorkArrangement, setPendingWorkArrangement] = useState<"Offshore" | "Onsite" | null>(null);
  const { toast } = useToast();

  // Fetch master data for transformer
  const { data: jobTypes } = useQuery<any[]>({ queryKey: ["/job-types"] });
  const { data: skills } = useQuery<any[]>({ queryKey: ["/skills"] });
  const { data: jobTitles } = useQuery<any[]>({ queryKey: ["/job-titles"] });
  const { data: departments } = useQuery<any[]>({ queryKey: ["/departments"] });
  const { data: users } = useQuery<any[]>({ queryKey: ["/users"] });
  const { data: countries } = useQuery<any[]>({ queryKey: ["/countries"] });
  const { data: workShifts } = useQuery<any[]>({ queryKey: ["/work-shifts"] });
  const { data: officeLocations } = useQuery<any[]>({ queryKey: ["/office-locations"] });
  const { data: workTimeZones } = useQuery<any[]>({ queryKey: ["/work-timezones"] });

  // Fetch existing JR data if in edit mode
  const { data: existingJR, isLoading: isLoadingJR } = useQuery<any>({
    queryKey: ["/job-requisitions", id],
    enabled: isEditMode && !!id,
  });

  // Load existing data when fetched
  useEffect(() => {
    if (existingJR && isEditMode) {
      const transformed = transformAPIResponseToFormData(existingJR);
      setFormData(transformed);
      setWorkArrangement(transformed.workArrangement || "Offshore");
      if (transformed.jobType) {
        setJobType(transformed.jobType.toLowerCase());
      }
    }
  }, [existingJR, isEditMode]);

  // Create/Update mutation
  const createOrUpdateMutation = useMutation({
    mutationFn: async ({ payload, isDraft }: { payload: any; isDraft: boolean }) => {
      if (isEditMode && id) {
        return await apiRequest(`/job-requisitions/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return await apiRequest("/api/job-requisitions", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/job-requisitions"] });
      
      const { isDraft } = variables;
      
      toast({
        title: isDraft 
          ? "Draft Saved" 
          : (isEditMode ? "Requisition Updated" : "Requisition Submitted"),
        description: isDraft
          ? "Your progress has been saved as a draft."
          : isEditMode
            ? "Your job requisition has been updated successfully."
            : "Your job requisition has been submitted for approval.",
      });

      // Navigate to dashboard after submission (not draft saves)
      if (!isDraft) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else if (currentStep < maxStep) {
        setCurrentStep(currentStep + 1);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save job requisition. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleWorkArrangementSelect = (arrangement: "Offshore" | "Onsite") => {
    setWorkArrangement(arrangement);
    setCurrentStep(1);
  };

  const handleWorkArrangementChange = (newArrangement: "Offshore" | "Onsite") => {
    setPendingWorkArrangement(newArrangement);
    setShowChangeDialog(true);
  };

  const confirmWorkArrangementChange = () => {
    if (pendingWorkArrangement) {
      setWorkArrangement(pendingWorkArrangement);
      setFormData({});
      setCurrentStep(1);
      toast({
        title: "Work Arrangement Changed",
        description: `Changed to ${pendingWorkArrangement}. Your progress has been reset.`,
      });
    }
    setShowChangeDialog(false);
    setPendingWorkArrangement(null);
  };

  const visibleSteps = workArrangement === "Offshore" 
    ? steps.filter(s => !s.conditional)
    : steps;

  const maxStep = visibleSteps.length;

  const handleNext = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndContinue = () => {
    if (!workArrangement) return;

    const payload = transformFormDataToAPIPayload(formData, workArrangement, {
      jobTypes,
      skills,
      jobTitles,
      departments,
      users,
      countries,
      workShifts,
      officeLocations,
      workTimeZones,
    });

    payload.jrStatus = "Draft";

    createOrUpdateMutation.mutate({ payload, isDraft: true });
  };

  const handleSubmit = () => {
    if (!workArrangement) return;

    const payload = transformFormDataToAPIPayload(formData, workArrangement, {
      jobTypes,
      skills,
      jobTitles,
      departments,
      users,
      countries,
      workShifts,
      officeLocations,
      workTimeZones,
    });

    // If editing, keep existing status; if new, set to Submitted
    if (!isEditMode) {
      payload.jrStatus = "Submitted";
    }

    createOrUpdateMutation.mutate({ payload, isDraft: false });
  };

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData({ ...formData, ...stepData });
  };

  const CurrentStepComponent = workArrangement ? visibleSteps[currentStep - 1]?.component : null;

  // Show loading state when fetching existing JR
  if (isEditMode && isLoadingJR) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading job requisition...</p>
        </div>
      </div>
    );
  }

  // Show work arrangement selection if not in edit mode and no arrangement selected
  if (!isEditMode && !workArrangement) {
    return <WorkArrangementSelection onSelect={handleWorkArrangementSelect} />;
  }

  // Don't render if work arrangement is not set (safety check)
  if (!workArrangement) {
    return null;
  }

  const isSaving = createOrUpdateMutation.isPending;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode ? `Edit Job Requisition - ${existingJR?.jrId || id}` : "Create Job Requisition"}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode 
            ? "Update the details of the job requisition" 
            : "Fill in the details to create a new job requisition"}
        </p>
      </div>

      {/* Progress Steps with Work Arrangement Display */}
      <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-primary/10">
        {/* Work Arrangement Display */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="px-3 py-1.5 text-sm font-medium flex items-center gap-2"
              data-testid="badge-work-arrangement"
            >
              {workArrangement === "Offshore" ? (
                <>
                  <Globe2 className="h-4 w-4" />
                  Offshore
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4" />
                  Onsite
                </>
              )}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleWorkArrangementChange(workArrangement === "Offshore" ? "Onsite" : "Offshore")}
              className="gap-2"
              data-testid="button-change-work-arrangement"
            >
              <Pencil className="h-4 w-4" />
              Change
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {visibleSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all shadow-sm ${
                    currentStep > step.id
                      ? "border-success bg-success text-success-foreground shadow-success/20"
                      : currentStep === step.id
                      ? "border-primary bg-primary text-primary-foreground shadow-primary/30"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium text-center hidden sm:block transition-colors ${
                  currentStep === step.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {step.name}
                </span>
              </div>
              {index < visibleSteps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    currentStep > step.id ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Form Content */}
      <Card className="p-8">
        <CurrentStepComponent
          data={formData}
          onUpdate={updateFormData}
          workArrangement={workArrangement}
          setWorkArrangement={setWorkArrangement}
          jobType={jobType}
          setJobType={setJobType}
        />
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSaving}
          className="gap-2"
          data-testid="button-previous"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSaveAndContinue}
            disabled={isSaving}
            className="gap-2"
            data-testid="button-save-continue"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save & Continue
          </Button>

          {currentStep === maxStep ? (
            <Button 
              onClick={handleSubmit} 
              disabled={isSaving}
              className="gap-2"
              data-testid="button-submit"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isEditMode ? "Update Requisition" : "Submit Requisition"}
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              disabled={isSaving}
              className="gap-2"
              data-testid="button-next"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Work Arrangement Change Confirmation Dialog */}
      <AlertDialog open={showChangeDialog} onOpenChange={setShowChangeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Work Arrangement?</AlertDialogTitle>
            <AlertDialogDescription>
              Changing the work arrangement will reset your progress and clear all entered data. 
              Are you sure you want to change from {workArrangement} to {pendingWorkArrangement}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowChangeDialog(false);
              setPendingWorkArrangement(null);
            }}>
              No, Keep Current
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmWorkArrangementChange}>
              Yes, Change It
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
