import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
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
  MapPin,
  Briefcase,
  DollarSign,
  Code,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - expanded for demonstration
const mockRequisitions = [
  {
    id: "JR-001",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestedDate: "2025-10-01",
    hiringManager: "Jane Smith",
    positions: 2,
    status: "Submitted",
    workArrangement: "Offshore",
    location: "Bangalore, India",
    experience: "5-8 years",
    salaryRange: "$80,000 - $120,000",
    primarySkills: ["React", "Node.js", "TypeScript"],
    workMode: "Remote",
  },
  {
    id: "JR-002",
    title: "Product Manager",
    department: "Product",
    requestedBy: "Alice Johnson",
    requestedDate: "2025-09-28",
    hiringManager: "Bob Wilson",
    positions: 1,
    status: "DU Head Approved",
    workArrangement: "Onsite",
    location: "New York, USA",
    experience: "7-10 years",
    salaryRange: "$120,000 - $150,000",
    primarySkills: ["Product Strategy", "Agile", "Analytics"],
    workMode: "Hybrid",
  },
  {
    id: "JR-003",
    title: "UX/UI Designer",
    department: "Design",
    requestedBy: "Carol Martinez",
    requestedDate: "2025-09-25",
    hiringManager: "David Lee",
    positions: 1,
    status: "Approved",
    workArrangement: "Offshore",
    location: "Pune, India",
    experience: "3-5 years",
    salaryRange: "$60,000 - $85,000",
    primarySkills: ["Figma", "UI/UX", "Prototyping"],
    workMode: "Remote",
  },
  {
    id: "JR-004",
    title: "DevOps Engineer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestedDate: "2025-09-20",
    hiringManager: "Jane Smith",
    positions: 1,
    status: "Draft",
    workArrangement: "Offshore",
    location: "Hyderabad, India",
    experience: "4-6 years",
    salaryRange: "$70,000 - $95,000",
    primarySkills: ["AWS", "Docker", "Kubernetes"],
    workMode: "Remote",
  },
];

const statusColors: Record<string, "default" | "warning" | "success" | "secondary"> = {
  "Draft": "secondary",
  "Submitted": "warning",
  "DU Head Approved": "warning",
  "CDO Approved": "warning",
  "COO Approved": "warning",
  "Approved": "success",
};

const statusOptions = ["Draft", "Submitted", "DU Head Approved", "CDO Approved", "COO Approved", "Approved"];
const departmentOptions = ["Engineering", "Product", "Design", "Marketing", "Sales", "HR"];
const workArrangementOptions = ["Offshore", "Onsite"];
const locationOptions = ["Bangalore, India", "Pune, India", "Hyderabad, India", "New York, USA", "London, UK", "Singapore"];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [workArrangementFilter, setWorkArrangementFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRequisitions = mockRequisitions.filter((req) => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(req.status);
    const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(req.department);
    const matchesWorkArrangement = workArrangementFilter.length === 0 || workArrangementFilter.includes(req.workArrangement);
    const matchesLocation = locationFilter.length === 0 || locationFilter.includes(req.location);

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

  const stats = [
    {
      label: "Total Requisitions",
      value: mockRequisitions.length,
      icon: Users,
      trend: "+12%",
      color: "bg-primary",
    },
    {
      label: "Open Positions",
      value: mockRequisitions.reduce((sum, req) => sum + req.positions, 0),
      icon: TrendingUp,
      trend: "+8%",
      color: "bg-success",
    },
    {
      label: "Pending Approval",
      value: mockRequisitions.filter(r => r.status.includes("Approved") && r.status !== "Approved").length,
      icon: Clock,
      trend: "-5%",
      color: "bg-warning",
    },
    {
      label: "Approved",
      value: mockRequisitions.filter(r => r.status === "Approved").length,
      icon: CheckCircle2,
      trend: "+15%",
      color: "bg-success",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track job requisitions
          </p>
        </div>
        <Link to="/create-jr">
          <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Plus className="h-5 w-5" />
            Create New Requisition
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.trend.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {stat.trend}
                    </span>
                    {' from last month'}
                  </p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
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
                placeholder="Search by ID, title, department, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
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
          {paginatedRequisitions.map((req) => (
            <Card key={req.id} className="p-6 hover:shadow-xl transition-all hover:border-primary/30 bg-gradient-to-br from-card to-accent/5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{req.title}</h3>
                      <Badge variant={statusColors[req.status]} className="text-xs px-2.5 py-0.5">
                        {req.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{req.id}</span>
                      <span>•</span>
                      <span>{req.department}</span>
                      <span>•</span>
                      <Badge variant="outline" className="font-normal">
                        {req.workArrangement}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/view-jr/${req.id}`}>
                      <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/edit-jr/${req.id}`}>
                      <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Location</span>
                    </div>
                    <p className="font-medium text-sm">{req.location}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>Experience</span>
                    </div>
                    <p className="font-medium text-sm">{req.experience}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>Salary Range</span>
                    </div>
                    <p className="font-medium text-sm">{req.salaryRange}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Users className="h-3.5 w-3.5" />
                      <span>Work Mode</span>
                    </div>
                    <p className="font-medium text-sm">{req.workMode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Positions</p>
                    <p className="font-medium text-sm">{req.positions}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium text-sm">{req.requestedDate}</p>
                  </div>
                </div>

                {/* Skills & People */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Code className="h-3.5 w-3.5" />
                      <span>Primary Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {req.primarySkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs">Hiring Manager</p>
                      <p className="font-medium text-sm">{req.hiringManager}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs">Requested By</p>
                      <p className="font-medium text-sm">{req.requestedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequisitions.length)} of {filteredRequisitions.length} requisitions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
