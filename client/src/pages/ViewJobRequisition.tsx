import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Loader2,
  Building2,
  Globe2,
  Calendar,
  User,
  Briefcase,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";

export default function ViewJobRequisition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: jr, isLoading, error } = useQuery<any>({
    queryKey: ["/job-requisitions", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading job requisition...</p>
        </div>
      </div>
    );
  }

  if (error || !jr) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Failed to load job requisition</p>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isDraft = jr.jrStatus === "Draft";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{jr.jrId}</h1>
            <Badge
              variant={isDraft ? "secondary" : "default"}
              className="text-sm"
            >
              {jr.jrStatus}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">{jr.jobTitle?.title}</p>
        </div>

        <div className="flex items-center gap-2">
          {isDraft && (
            <Button
              onClick={() => navigate(`/create-requisition/${id}`)}
              className="gap-2"
              data-testid="button-edit-jr"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            data-testid="button-back-dashboard"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem 
            icon={workArrangementIcon(jr.workArrangement)}
            label="Work Arrangement" 
            value={jr.workArrangement} 
          />
          <InfoItem label="Job Type" value={jr.jobType?.name} />
          <InfoItem label="Core Skill" value={jr.coreSkill?.name} />
          <InfoItem label="Department" value={jr.department?.name} />
          <InfoItem icon={<User className="h-4 w-4" />} label="Requested By" value={jr.requestedBy?.name} />
          <InfoItem icon={<User className="h-4 w-4" />} label="Hiring Manager" value={jr.hiringManager?.name} />
          <InfoItem label="Number of Positions" value={jr.numberOfPositions} />
          <InfoItem label="Billable" value={jr.billable ? "Yes" : "No"} />
          {jr.billable && jr.clientBillingRate && (
            <InfoItem icon={<DollarSign className="h-4 w-4" />} label="Client Billing Rate" value={`$${jr.clientBillingRate}`} />
          )}
          {jr.expectedSalaryMin && jr.expectedSalaryMax && (
            <InfoItem 
              icon={<DollarSign className="h-4 w-4" />}
              label="Expected Salary Range" 
              value={`$${jr.expectedSalaryMin} - $${jr.expectedSalaryMax}`} 
            />
          )}
          {jr.requestedDate && (
            <InfoItem 
              icon={<Calendar className="h-4 w-4" />}
              label="Requested Date" 
              value={new Date(jr.requestedDate).toLocaleDateString()} 
            />
          )}
          {(jr.expectedDateOfOnboardingStart || jr.expectedDateOfOnboardingEnd) && (
            <InfoItem 
              icon={<Calendar className="h-4 w-4" />}
              label="Expected Onboarding Date" 
              value={
                jr.expectedDateOfOnboardingStart && jr.expectedDateOfOnboardingEnd
                  ? `${new Date(jr.expectedDateOfOnboardingStart).toLocaleDateString()} - ${new Date(jr.expectedDateOfOnboardingEnd).toLocaleDateString()}`
                  : jr.expectedDateOfOnboardingStart
                  ? new Date(jr.expectedDateOfOnboardingStart).toLocaleDateString()
                  : new Date(jr.expectedDateOfOnboardingEnd).toLocaleDateString()
              } 
            />
          )}
          {(jr.idealStartDateStart || jr.idealStartDateEnd) && (
            <InfoItem 
              icon={<Calendar className="h-4 w-4" />}
              label="Ideal Start Date" 
              value={
                jr.idealStartDateStart && jr.idealStartDateEnd
                  ? `${new Date(jr.idealStartDateStart).toLocaleDateString()} - ${new Date(jr.idealStartDateEnd).toLocaleDateString()}`
                  : jr.idealStartDateStart
                  ? new Date(jr.idealStartDateStart).toLocaleDateString()
                  : new Date(jr.idealStartDateEnd).toLocaleDateString()
              } 
            />
          )}
        </div>
      </Card>

      {/* Skills & Qualifications */}
      {(jr.primarySkills?.length > 0 || jr.secondarySkills?.length > 0 || jr.niceToHaveSkills?.length > 0 || 
        jr.qualifications?.length > 0 || jr.certifications?.length > 0 || jr.specificQualification ||
        jr.totalExperienceMin !== null || jr.totalExperienceMax !== null || 
        jr.relevantExperienceMin !== null || jr.relevantExperienceMax !== null) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Skills & Qualifications</h2>
          <div className="space-y-4">
            {jr.primarySkills?.length > 0 && (
              <SkillSection title="Primary Skills" skills={jr.primarySkills} variant="default" />
            )}
            {jr.secondarySkills?.length > 0 && (
              <SkillSection title="Secondary Skills" skills={jr.secondarySkills} variant="secondary" />
            )}
            {jr.niceToHaveSkills?.length > 0 && (
              <SkillSection title="Nice to Have Skills" skills={jr.niceToHaveSkills} variant="outline" />
            )}
            {jr.qualifications?.length > 0 && (
              <SkillSection title="Qualifications" skills={jr.qualifications} variant="default" />
            )}
            {jr.certifications?.length > 0 && (
              <SkillSection title="Certifications" skills={jr.certifications} variant="default" />
            )}
            {jr.specificQualification && (
              <InfoItem label="Specific Qualification" value={jr.specificQualification} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jr.totalExperienceMin !== null && jr.totalExperienceMax !== null && (
                <InfoItem 
                  label="Total Experience" 
                  value={`${jr.totalExperienceMin} - ${jr.totalExperienceMax} years`} 
                />
              )}
              {jr.relevantExperienceMin !== null && jr.relevantExperienceMax !== null && (
                <InfoItem 
                  label="Relevant Experience" 
                  value={`${jr.relevantExperienceMin} - ${jr.relevantExperienceMax} years`} 
                />
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Project & Client Information */}
      {(jr.projectName || jr.projectRole || jr.clientName || jr.clientCountry || jr.clientInterview !== undefined) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Project & Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jr.projectName && <InfoItem label="Project Name" value={jr.projectName} />}
            {jr.projectRole && <InfoItem label="Project Role" value={jr.projectRole} />}
            {jr.clientName && <InfoItem label="Client" value={jr.clientName} />}
            {jr.clientCountry && <InfoItem label="Client Country" value={jr.clientCountry.name} />}
            {jr.clientInterview !== undefined && (
              <InfoItem label="Client Interview" value={jr.clientInterview ? "Yes" : "No"} />
            )}
          </div>
        </Card>
      )}

      {/* Location & Shift */}
      {(jr.workLocations?.length > 0 || jr.workShift || jr.shiftTime || jr.onsiteWorkMode || 
        jr.onsiteLocation || jr.onsiteDaysPerWeek || jr.preferredTimeZone) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Shift
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jr.workLocations?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Work Locations</p>
                <div className="flex flex-wrap gap-2">
                  {jr.workLocations.map((loc: string, idx: number) => (
                    <Badge key={idx} variant="outline">{loc}</Badge>
                  ))}
                </div>
              </div>
            )}
            {jr.workShift && (
              <InfoItem 
                icon={<Clock className="h-4 w-4" />}
                label="Work Shift" 
                value={jr.workShift.name} 
              />
            )}
            {jr.shiftTime && <InfoItem label="Shift Time" value={jr.shiftTime} />}
            {jr.onsiteWorkMode && <InfoItem label="Onsite Work Mode" value={jr.onsiteWorkMode} />}
            {jr.onsiteLocation && <InfoItem label="Onsite Location" value={jr.onsiteLocation} />}
            {jr.onsiteDaysPerWeek && <InfoItem label="Onsite Days Per Week" value={jr.onsiteDaysPerWeek} />}
            {jr.preferredTimeZone && <InfoItem label="Preferred Time Zone" value={jr.preferredTimeZone.name} />}
          </div>
        </Card>
      )}

      {/* Job Description */}
      {(jr.jobPurpose || jr.primaryDuties || jr.goodToHaveDuties || jr.jobSpecification) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="space-y-4">
            {jr.jobPurpose && (
              <TextSection title="Job Purpose" content={jr.jobPurpose} />
            )}
            {jr.primaryDuties && (
              <TextSection title="Primary Duties" content={jr.primaryDuties} />
            )}
            {jr.goodToHaveDuties && (
              <TextSection title="Good-to-Have Duties" content={jr.goodToHaveDuties} />
            )}
            {jr.jobSpecification && (
              <TextSection title="Job Specification" content={jr.jobSpecification} />
            )}
          </div>
        </Card>
      )}

      {/* Onsite-Specific Details */}
      {jr.workArrangement === "Onsite" && (jr.rate || jr.contractDuration) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Onsite-Specific Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jr.rate && (
              <InfoItem 
                icon={<DollarSign className="h-4 w-4" />}
                label="Rate" 
                value={`${jr.rateCurrency || '$'}${jr.rate} / ${jr.rateUnit || 'hour'}`} 
              />
            )}
            {jr.paymentCycle && <InfoItem label="Payment Cycle" value={jr.paymentCycle} />}
            {jr.contractDuration && (
              <InfoItem 
                label="Contract Duration" 
                value={`${jr.contractDuration} ${jr.durationUnit || ''}`} 
              />
            )}
            {jr.reportingManager && <InfoItem label="Reporting Manager" value={jr.reportingManager} />}
            {jr.visaStatuses?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Visa Statuses</p>
                <div className="flex flex-wrap gap-2">
                  {jr.visaStatuses.map((status: string, idx: number) => (
                    <Badge key={idx} variant="outline">{status}</Badge>
                  ))}
                </div>
              </div>
            )}
            {jr.h1Transfer !== undefined && (
              <InfoItem label="H1 Transfer" value={jr.h1Transfer ? "Yes" : "No"} />
            )}
            {jr.travelRequired !== undefined && (
              <InfoItem label="Travel Required" value={jr.travelRequired ? "Yes" : "No"} />
            )}
          </div>
          {jr.interviewProcess && (
            <div className="mt-4">
              <TextSection title="Interview Process" content={jr.interviewProcess} />
            </div>
          )}
        </Card>
      )}

      {/* Metadata */}
      <Card className="p-6 bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <InfoItem 
            label="Created At" 
            value={new Date(jr.createdAt).toLocaleString()} 
          />
          <InfoItem 
            label="Last Updated" 
            value={new Date(jr.updatedAt).toLocaleString()} 
          />
          {jr.submitter && (
            <InfoItem label="Submitted By" value={jr.submitter.name} />
          )}
        </div>
      </Card>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon?: React.ReactNode; label: string; value?: any }) {
  if (value === null || value === undefined) return null;
  
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="text-base">{value}</p>
    </div>
  );
}

function SkillSection({ title, skills, variant }: { title: string; skills: string[]; variant: any }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge key={idx} variant={variant}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
}

function TextSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <p className="text-base whitespace-pre-wrap">{content}</p>
      <Separator className="mt-4" />
    </div>
  );
}

function workArrangementIcon(arrangement: string) {
  return arrangement === "Offshore" ? <Globe2 className="h-4 w-4" /> : <Building2 className="h-4 w-4" />;
}
