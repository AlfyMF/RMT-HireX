export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  requestedBy: string;
  requestedDate: string;
  hiringManager: string;
  positions: number;
  status: string;
  workArrangement: "Offshore" | "Onsite";
  location: string;
  experience: string;
  salaryRange: string;
  primarySkills: string[];
  workMode: string;
  [key: string]: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
