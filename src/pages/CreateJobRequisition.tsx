import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send,
  Check
} from "lucide-react";
import BasicDetails from "@/components/jr-form/BasicDetails";
import SkillsQualifications from "@/components/jr-form/SkillsQualifications";
import ProjectClientInfo from "@/components/jr-form/ProjectClientInfo";
import LocationShift from "@/components/jr-form/LocationShift";
import JobDescription from "@/components/jr-form/JobDescription";
import OnsiteSpecific from "@/components/jr-form/OnsiteSpecific";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual data fetching
const mockRequisitionData: Record<string, any> = {
  "JR-001": {
    id: "JR-001",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestedDate: "2025-10-01",
    hiringManager: "Jane Smith",
    positions: 2,
    status: "Submitted",
    workArrangement: "Offshore",
    jobType: "Permanent",
    billable: "Yes",
    clientBillingRate: 150,
    totalBudget: { min: 100000, max: 150000 },
    expectedSalary: { min: 80000, max: 120000 },
    primarySkills: ["React", "TypeScript", "Node.js"],
    secondarySkills: ["Python", "AWS", "Docker"],
    certifications: ["AWS Certified", "React Certified"],
    experience: 5,
    education: "Bachelor's in Computer Science",
    projectName: "E-commerce Platform",
    clientName: "Tech Corp Inc.",
    businessUnit: "Digital Solutions",
    projectLocation: "Remote",
    workMode: "Remote",
    workShift: "Morning (9 AM - 5 PM)",
    jobPurpose: "Lead the development of our next-generation e-commerce platform",
    primaryDuties: "Design and implement scalable solutions, mentor junior developers, collaborate with cross-functional teams",
    jobSpecifications: "Strong problem-solving skills, excellent communication, team player",
    onboardingFrom: "2025-11-01",
    onboardingTo: "2025-11-15",
    location: "Bangalore, India",
    daysInOffice: 3,
  },
};

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
  const [workArrangement, setWorkArrangement] = useState<"Offshore" | "Onsite">("Offshore");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  // Load existing data when in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const existingData = mockRequisitionData[id];
      if (existingData) {
        setFormData(existingData);
        setWorkArrangement(existingData.workArrangement || "Offshore");
      }
    }
  }, [id, isEditMode]);

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

  const CurrentStepComponent = visibleSteps[currentStep - 1].component;

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

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          {visibleSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    currentStep > step.id
                      ? "border-success bg-success text-success-foreground"
                      : currentStep === step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <span className="mt-2 text-xs font-medium text-center hidden sm:block">
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
    </div>
  );
}
