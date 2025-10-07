export const APP_NAME = "HireX";

export const ROUTES = {
  DASHBOARD: "/dashboard",
  CREATE_JR: "/create-jr",
  VIEW_JR: "/view-jr",
  EDIT_JR: "/edit-jr",
  PROFILE: "/profile",
} as const;

export const STATUS_OPTIONS = [
  "Draft",
  "Submitted",
  "DU Head Approved",
  "Approved",
  "Rejected",
] as const;

export const WORK_ARRANGEMENT = {
  OFFSHORE: "Offshore",
  ONSITE: "Onsite",
} as const;
