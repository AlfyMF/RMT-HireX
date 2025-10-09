import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Pencil
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
import { mockRequisitions } from "@/data/mockRequisitions";

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
  const isEditMode = !!id;
  const [currentStep, setCurrentStep] = useState(1);
  const [workArrangement, setWorkArrangement] = useState<"Offshore" | "Onsite" | null>(null);
  const [jobType, setJobType] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showChangeDialog, setShowChangeDialog] = useState(false);
  const [pendingWorkArrangement, setPendingWorkArrangement] = useState<"Offshore" | "Onsite" | null>(null);
  const { toast } = useToast();

  // Load existing data when in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const existingData = mockRequisitions[id];
      if (existingData) {
        setFormData(existingData);
        setWorkArrangement(existingData.workArrangement || "Offshore");
        toast({
          title: "Data Loaded",
          description: `Editing ${existingData.title} (${id})`,
        });
      } else {
        toast({
          title: "Error",
          description: `Job Requisition ${id} not found`,
          variant: "destructive",
        });
      }
    }
  }, [id, isEditMode, toast]);

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
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved as a draft.",
    });
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: isEditMode ? "Requisition Updated" : "Requisition Submitted",
      description: isEditMode 
        ? "Your job requisition has been updated successfully."
        : "Your job requisition has been submitted for approval.",
    });
  };

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData({ ...formData, ...stepData });
  };

  const CurrentStepComponent = workArrangement ? visibleSteps[currentStep - 1]?.component : null;

  // Show work arrangement selection if not in edit mode and no arrangement selected
  if (!isEditMode && !workArrangement) {
    return <WorkArrangementSelection onSelect={handleWorkArrangementSelect} />;
  }

  // Don't render if work arrangement is not set (safety check)
  if (!workArrangement) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode ? `Edit Job Requisition - ${id}` : "Create Job Requisition"}
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
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSaveAndContinue}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save & Continue
          </Button>

          {currentStep === maxStep ? (
            <Button onClick={handleSubmit} className="gap-2">
              <Send className="h-4 w-4" />
              {isEditMode ? "Update Requisition" : "Submit Requisition"}
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
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
