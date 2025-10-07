import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, AlertCircle } from "lucide-react";
import { mockRequisitions } from "@/data/mockRequisitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const statusColors: Record<string, "default" | "warning" | "success" | "secondary"> = {
  "Draft": "secondary",
  "Submitted": "warning",
  "DU Head Approved": "warning",
  "Approved": "success",
};

export default function ViewJobRequisition() {
  const { id } = useParams();
  const requisition = id ? mockRequisitions[id] : null;

  if (!requisition) {
    return (
      <div className="space-y-6">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Job Requisition Not Found</AlertTitle>
          <AlertDescription>
            The job requisition with ID "{id}" could not be found. Please check the ID and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{requisition.title}</h1>
            <p className="text-muted-foreground">
              {requisition.id} • {requisition.department}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusColors[requisition.status]} className="text-sm px-3 py-1">
            {requisition.status}
          </Badge>
          <Link to={`/edit-jr/${id}`}>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Job Type</p>
            <p className="font-medium">{requisition.jobType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Work Arrangement</p>
            <p className="font-medium">{requisition.workArrangement}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Number of Positions</p>
            <p className="font-medium">{requisition.positions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requested By</p>
            <p className="font-medium">{requisition.requestedBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hiring Manager</p>
            <p className="font-medium">{requisition.hiringManager}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requested Date</p>
            <p className="font-medium">{requisition.requestedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Billable</p>
            <p className="font-medium">{requisition.billable}</p>
          </div>
          {requisition.billable === "Yes" && (
            <div>
              <p className="text-sm text-muted-foreground">Client Billing Rate</p>
              <p className="font-medium">${requisition.clientBillingRate}/hr</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="font-medium">${requisition.totalBudget.min.toLocaleString()} - ${requisition.totalBudget.max.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Skills & Qualifications */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Skills & Qualifications</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary Skills</p>
            <div className="flex flex-wrap gap-2">
              {requisition.primarySkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary Skills</p>
            <div className="flex flex-wrap gap-2">
              {requisition.secondarySkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {requisition.certifications.map((cert) => (
                <Badge key={cert} variant="secondary">{cert}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Experience Required</p>
            <p className="font-medium">{requisition.experience} years</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Education</p>
            <p className="font-medium">{requisition.education}</p>
          </div>
        </div>
      </Card>

      {/* Project & Client Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Project & Client Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Project Name</p>
            <p className="font-medium">{requisition.projectName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Client Name</p>
            <p className="font-medium">{requisition.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Business Unit</p>
            <p className="font-medium">{requisition.businessUnit}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Project Location</p>
            <p className="font-medium">{requisition.projectLocation}</p>
          </div>
        </div>
      </Card>

      {/* Job Description */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Job Purpose</p>
            <p className="font-medium">{requisition.jobPurpose}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Primary Duties</p>
            <p className="font-medium">{requisition.primaryDuties}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Job Specifications</p>
            <p className="font-medium">{requisition.jobSpecifications}</p>
          </div>
          {requisition.goodToHave && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Good to Have</p>
                <p className="font-medium">{requisition.goodToHave}</p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
