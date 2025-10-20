import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
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
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  X,
  Loader2,
  MapPin,
  Briefcase,
  DollarSign,
  Code
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/services/api";

const statusColors: Record<string, "default" | "warning" | "success" | "secondary"> = {
  "Draft": "secondary",
  "Submitted": "warning",
  "DU Head Approved": "warning",
  "CDO Approved": "warning",
  "COO Approved": "warning",
  "Approved": "success",
};

const statusOptions = ["Draft", "Submitted", "DU Head Approved", "CDO Approved", "COO Approved", "Approved"];

export default function Dashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [workArrangementFilter, setWorkArrangementFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jrToDelete, setJrToDelete] = useState<any>(null);
  const itemsPerPage = 10;

  // Fetch job requisitions
  const { data: jrsData, isLoading } = useQuery<any>({
    queryKey: ["/job-requisitions", { page: currentPage, limit: itemsPerPage, search: searchQuery }],
  });

  // Fetch departments for filter options
  const { data: departments } = useQuery<any[]>({ queryKey: ["/departments"] });

  const jobRequisitions = jrsData?.data || [];
  const totalJRs = jrsData?.meta?.total || 0;

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/job-requisitions/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/job-requisitions"] });
      toast({
        title: "Job Requisition Deleted",
        description: "The job requisition has been successfully deleted.",
      });
      setDeleteDialogOpen(false);
      setJrToDelete(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job requisition.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteClick = (jr: any) => {
    setJrToDelete(jr);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (jrToDelete) {
      deleteMutation.mutate(jrToDelete.id);
    }
  };

  // Filter requisitions client-side
  const filteredRequisitions = jobRequisitions.filter((req: any) => {
    const matchesSearch = 
      req.jrId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.jobTitle?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.department?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(req.jrStatus);
    const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(req.department?.name);
    const matchesWorkArrangement = workArrangementFilter.length === 0 || workArrangementFilter.includes(req.workArrangement);
    
    const matchesLocation = locationFilter.length === 0 || (
      req.workArrangement === "Offshore"
        ? locationFilter.some(filter => req.workLocations?.some((loc: string) => loc.includes(filter)))
        : locationFilter.some(filter => 
            (req.onsiteLocation && req.onsiteLocation.includes(filter)) ||
            (req.onsiteWorkMode && req.onsiteWorkMode.includes(filter))
          )
    );

    return matchesSearch && matchesStatus && matchesDepartment && matchesWorkArrangement && matchesLocation;
  });

  const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
  const paginatedRequisitions = filteredRequisitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setDepartmentFilter([]);
    setWorkArrangementFilter([]);
    setLocationFilter([]);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter.length > 0 || departmentFilter.length > 0 || 
    workArrangementFilter.length > 0 || locationFilter.length > 0;

  // Calculate status counts
  const totalCount = jobRequisitions.length;
  const pendingCount = jobRequisitions.filter((r: any) => 
    r.jrStatus === "Submitted" || r.jrStatus === "DU Head Approved" || r.jrStatus === "CDO Approved"
  ).length;
  const approvedCount = jobRequisitions.filter((r: any) => r.jrStatus === "Approved" || r.jrStatus === "COO Approved").length;
  const rejectedCount = jobRequisitions.filter((r: any) => r.jrStatus === "Rejected").length;
  const draftCount = jobRequisitions.filter((r: any) => r.jrStatus === "Draft").length;

  const stats = [
    {
      label: "Total",
      value: totalCount,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
    {
      label: "Approved",
      value: approvedCount,
      icon: CheckCircle2,
      color: "bg-success/10 text-success",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: X,
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Draft",
      value: draftCount,
      icon: Clock,
      color: "bg-secondary/10 text-muted-foreground",
    },
  ];

  // Dynamic filter options based on actual JR data
  const statusOptions = Array.from(new Set(jobRequisitions.map((r: any) => r.jrStatus).filter(Boolean))) as string[];
  const departmentOptions = Array.from(new Set(jobRequisitions.map((r: any) => r.department?.name).filter(Boolean))) as string[];
  const workArrangementOptions = Array.from(new Set(jobRequisitions.map((r: any) => r.workArrangement).filter(Boolean))) as string[];
  const locationOptions = Array.from(new Set(
    jobRequisitions.flatMap((r: any) => {
      if (r.workArrangement === "Offshore") {
        return r.workLocations || [];
      } else {
        return [r.onsiteLocation, r.onsiteWorkMode].filter(Boolean);
      }
    }).filter(Boolean)
  )) as string[];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading job requisitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Requisitions</h1>
          <p className="text-muted-foreground">
            Manage and track all job requisitions
          </p>
        </div>
        <Link to="/create-jr">
          <Button className="gap-2" data-testid="button-create-jr">
            <Plus className="h-4 w-4" />
            Create New Requisition
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-primary/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Filters</h3>
            </div>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="gap-2 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID, title, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Status</label>
              <MultiSelect
                options={statusOptions}
                selected={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Status"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Department</label>
              <MultiSelect
                options={departmentOptions}
                selected={departmentFilter}
                onChange={setDepartmentFilter}
                placeholder="All Departments"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Work Arrangement</label>
              <MultiSelect
                options={workArrangementOptions}
                selected={workArrangementFilter}
                onChange={setWorkArrangementFilter}
                placeholder="All Arrangements"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location</label>
              <MultiSelect
                options={locationOptions}
                selected={locationFilter}
                onChange={setLocationFilter}
                placeholder="All Locations"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Requisitions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Job Requisitions 
            <span className="text-muted-foreground text-base ml-2">
              ({filteredRequisitions.length} {filteredRequisitions.length === 1 ? 'result' : 'results'})
            </span>
          </h2>
        </div>

        <div className="grid gap-4">
          {paginatedRequisitions.map((req: any) => (
            <Card key={req.id} className="p-6 hover:shadow-xl transition-all hover:border-primary/30 bg-gradient-to-br from-card to-accent/5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{req.jobTitle?.title}</h3>
                      <Badge variant={statusColors[req.jrStatus]} className="text-xs px-2.5 py-0.5">
                        {req.jrStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{req.jrId}</span>
                      <span>•</span>
                      <span>{req.department?.name}</span>
                      <span>•</span>
                      <Badge variant="outline" className="font-normal">
                        {req.workArrangement}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/view-jr/${req.id}`}>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="hover:bg-primary hover:text-primary-foreground"
                        data-testid={`button-view-${req.jrId}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    {req.jrStatus === "Draft" && (
                      <>
                        <Link to={`/create-requisition/${req.id}`}>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="hover:bg-primary hover:text-primary-foreground"
                            data-testid={`button-edit-${req.jrId}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDeleteClick(req)}
                          data-testid={`button-delete-${req.jrId}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Location</span>
                    </div>
                    <p className="font-medium text-sm">
                      {req.workArrangement === "Offshore" 
                        ? (req.workLocations?.join(", ") || "-")
                        : (req.onsiteLocation || req.onsiteWorkMode || "-")
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>Experience</span>
                    </div>
                    <p className="font-medium text-sm">
                      {req.totalExperienceMin && req.totalExperienceMax 
                        ? `${req.totalExperienceMin}-${req.totalExperienceMax} years`
                        : "-"
                      }
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>Salary Range</span>
                    </div>
                    <p className="font-medium text-sm">
                      {req.expectedSalaryMin && req.expectedSalaryMax
                        ? `$${req.expectedSalaryMin.toLocaleString()} - $${req.expectedSalaryMax.toLocaleString()}`
                        : "-"
                      }
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{req.workArrangement === "Onsite" ? "Job Type" : "Work Mode"}</span>
                    </div>
                    <p className="font-medium text-sm">
                      {req.workArrangement === "Onsite" ? req.jobType : req.workArrangement}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Positions</p>
                    <p className="font-medium text-sm">{req.numberOfPositions}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium text-sm">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      }) : "-"}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {req.primarySkills?.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Code className="h-3.5 w-3.5" />
                        <span>Primary Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {req.primarySkills.slice(0, 5).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {req.primarySkills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{req.primarySkills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* People */}
                <div className="pt-4 border-t grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Hiring Manager</p>
                    <p className="font-medium text-sm">{req.hiringManager?.name || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Requested By</p>
                    <p className="font-medium text-sm">{req.requestedBy?.name || "-"}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRequisitions.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No job requisitions found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Requisition?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {jrToDelete?.jrId}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false);
              setJrToDelete(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
