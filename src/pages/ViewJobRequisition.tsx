import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, CheckCircle2, Clock } from "lucide-react";

// Mock data - replace with actual data fetching
const mockRequisition = {
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
};

const statusColors: Record<string, "default" | "warning" | "success" | "secondary"> = {
  "Draft": "secondary",
  "Submitted": "warning",
  "DU Head Approved": "warning",
  "Approved": "success",
};

export default function ViewJobRequisition() {
  const { id } = useParams();

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
            <h1 className="text-3xl font-bold tracking-tight">{mockRequisition.title}</h1>
            <p className="text-muted-foreground">
              {mockRequisition.id} • {mockRequisition.department}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusColors[mockRequisition.status]} className="text-sm px-3 py-1">
            {mockRequisition.status}
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
            <p className="font-medium">{mockRequisition.jobType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Work Arrangement</p>
            <p className="font-medium">{mockRequisition.workArrangement}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Number of Positions</p>
            <p className="font-medium">{mockRequisition.positions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requested By</p>
            <p className="font-medium">{mockRequisition.requestedBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hiring Manager</p>
            <p className="font-medium">{mockRequisition.hiringManager}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requested Date</p>
            <p className="font-medium">{mockRequisition.requestedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Billable</p>
            <p className="font-medium">{mockRequisition.billable}</p>
          </div>
          {mockRequisition.billable === "Yes" && (
            <div>
              <p className="text-sm text-muted-foreground">Client Billing Rate</p>
              <p className="font-medium">${mockRequisition.clientBillingRate}/hr</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="font-medium">${mockRequisition.totalBudget.min.toLocaleString()} - ${mockRequisition.totalBudget.max.toLocaleString()}</p>
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
              {mockRequisition.primarySkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary Skills</p>
            <div className="flex flex-wrap gap-2">
              {mockRequisition.secondarySkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {mockRequisition.certifications.map((cert) => (
                <Badge key={cert} variant="secondary">{cert}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Experience Required</p>
            <p className="font-medium">{mockRequisition.experience} years</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Education</p>
            <p className="font-medium">{mockRequisition.education}</p>
          </div>
        </div>
      </Card>

      {/* Project & Client Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Project & Client Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Project Name</p>
            <p className="font-medium">{mockRequisition.projectName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Client Name</p>
            <p className="font-medium">{mockRequisition.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Business Unit</p>
            <p className="font-medium">{mockRequisition.businessUnit}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Project Location</p>
            <p className="font-medium">{mockRequisition.projectLocation}</p>
          </div>
        </div>
      </Card>

      {/* Job Description */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Job Purpose</p>
            <p className="font-medium">{mockRequisition.jobPurpose}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Primary Duties</p>
            <p className="font-medium">{mockRequisition.primaryDuties}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Job Specifications</p>
            <p className="font-medium">{mockRequisition.jobSpecifications}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
