# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It provides organizations with an efficient tool for their hiring processes, supporting a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes

### October 22, 2025 - Dynamic Location Filter Enhancement
**Implemented smart location filter logic on Dashboard:**

1. **Filter Options Generation**: Location filter dynamically populates based on work arrangement:
   - **Offshore Requisitions**: Shows actual work location names (Mumbai, Bangalore, Pune, etc.) from `workLocations` array
   - **Onsite Requisitions**: Shows single "Onsite" option for all onsite positions (simplified from showing specific locations and work modes)
   - All values automatically deduplicated using Set

2. **Filter Matching Logic**: Updated filtering to correctly match:
   - **Offshore**: Searches within `workLocations` array for selected filter values
   - **Onsite**: Matches when "Onsite" is selected in filter

3. **Benefits**: 
   - Cleaner, more intuitive location filter
   - Users can easily filter all onsite positions with one option
   - Offshore positions retain granular location filtering by city/region

### October 21, 2025 - Conditional Field Clearing Logic
**Implemented automatic field clearing when key attributes change in Job Requisition forms:**

1. **Work Arrangement Change (Offshore ↔ Onsite)**:
   - Switching to Offshore: Clears all Onsite-specific fields (idealStartDate, onsiteWorkMode, onsiteLocation, onsiteDaysPerWeek, preferredTimeZone, rate, rateUnit, rateCurrency, paymentCycle, visaStatuses, contractDuration, durationUnit, reportingManager, interviewProcess, acceptH1Transfer, travelRequired)
   - Switching to Onsite: Clears all Offshore-specific fields (expectedDateOfOnboarding Start/End, expectedSalary Min/Max, workLocations, workShift, shiftTime)
   - Validation errors for cleared fields are automatically removed

2. **Job Type Change (Contract/Consultant ↔ Permanent)**:
   - Detects category change between contractual (Contract/Consultant) and Permanent types
   - Automatically clears totalBudgetMin, totalBudgetMax, and projectRole when category switches

3. **Onsite Work Mode Change (Hybrid/WFO ↔ Remote)**:
   - When onsiteWorkMode changes between modes
   - Automatically clears onsiteLocation and onsiteDaysPerWeek

4. **Billable Change (Yes ↔ No)**:
   - When billable field value changes
   - Automatically clears clientBillingRate

**Implementation Details**:
- Logic implemented in `updateFormData()` (for Job Type, Onsite Work Mode, Billable) and `confirmWorkArrangementChange()` (for Work Arrangement)
- Works during both job requisition creation and editing workflows
- Cleared fields are completely removed from formData state
- Associated validation errors are cleaned up automatically
- Prevents stale data from being saved to database
- User receives toast notification for work arrangement changes

### October 21, 2025 - Additional Validation Enhancements
**Implemented missing validation rules and fixed validation persistence:**

1. **Billable Field Conditional Validation**: When Billable = "Yes", Client Billing Rate is now required with custom error message "Client Billing Rate is required"

2. **Submit-Only Validation with Smart Error Clearing**: Validation triggers ONLY on Submit button (not on Next, Save & Continue, or field updates). Once errors appear after Submit, they clear immediately when user corrects that specific field with a valid value. For comparison fields (min/max, start/end dates), fixing either side clears errors on both fields when the comparison becomes valid

3. **Multi-Select Dropdown Validations**: Confirmed all multi-select fields display exact error messages:
   - Primary Skills: "Primary Skills is required"
   - Secondary Skills: "Secondary Skills is required"
   - Skills – Nice to have: "Skills – Nice to have is required"
   - Qualification: "Qualification is required"

4. **Work Arrangement Conditional Validations**: Verified all arrangement-specific fields have proper validations:
   - **Onsite**: Onsite Work Mode, Onsite Location, Onsite Days Per Week, Preferred Visa Status
   - **Offshore**: Work Location, Work Shift (fixed from "Work Shifts" to singular)

5. **Validation Behavior**: All validation errors trigger only on form submission and persist until corrected

### October 21, 2025 - Form Validation Fixes
**Fixed all validation error message issues:**

1. **Custom Error Messages**: All 47 required fields now display field-specific error messages (no more generic "Required" or "Invalid input")
   - Every `z.string()`, `z.number()`, `z.union()`, and `z.array()` has custom error parameters
   - Every `.min()` and `.refine()` call includes the custom message

2. **Empty Dropdown Arrays**: Array fields (primarySkills, secondarySkills, niceToHaveSkills, qualifications, workLocations, visaStatuses) now properly validate with `.min(1, "custom message")`

3. **Validation Trigger**: Confirmed min/max comparison validations only trigger on Submit button (not on Next or Save & Continue)

## System Architecture

### Monorepo Structure
The project uses npm workspaces to manage client and server as independent packages within a single repository, allowing for independent development and deployment while sharing common tooling.

### Frontend Architecture
- **Framework Stack**: React 18 with TypeScript, Vite, and React Router.
- **UI Component System**: Leverages shadcn/ui with Radix UI primitives, styled with Tailwind CSS and CVA. Features a custom HSL-based color system, light/dark mode support, and a responsive mobile-first breakpoint system.
- **State Management**: TanStack Query (React Query) handles server state, caching, and API interactions.
- **Form Architecture**: Implements a multi-step wizard for job requisition creation with conditional rendering, cross-step state persistence, real-time validation (via Zod and React Hook Form), and tooltips. It supports comprehensive field coverage across six steps, dynamic field rendering, and master data integration for dropdowns.

### Backend Architecture
- **Server Framework**: Express.js with TypeScript and ESNext modules.
- **Middleware**: Includes Helmet for security, CORS for cross-origin resource sharing, and Morgan for logging.
- **API Structure**: Follows RESTful design principles with centralized routing and consistent response formatting.
- **Configuration**: Environment-based configuration using dotenv.
- **Data Layer**: Designed for PostgreSQL database integration (currently Neon DB) with Prisma ORM, utilizing PascalCase naming conventions and comprehensive foreign key relationships across 70+ fields in the JobRequisition schema. Includes strategic indexing for performance.
- **Workflow**: Manages draft creation, persistent saving, validation before submission, and a confirmation/success modal flow. The system generates unique JR numbers upon submission, transitioning a requisition from 'DRAFT-PENDING' to 'Submitted'.

### Type Safety
TypeScript is configured for both client and server, with centralized type definitions and interface-based API contracts.

### Development Tooling
ESLint ensures code quality, while Vite and SWC handle efficient client-side bundling and TypeScript compilation.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Accessible, unstyled components.
- **Lucide React**: Icon library.
- **shadcn/ui**: Re-usable UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Embla Carousel**: Touch-enabled carousel.
- **CMDK**: Command menu component.
- **Vaul**: Drawer component.
- **Input OTP**: One-time password input.

### Utility Libraries
- **clsx & tailwind-merge**: Class name manipulation.
- **date-fns**: Date formatting and manipulation.
- **class-variance-authority**: Component variant management.
- **TanStack Query (React Query)**: Server state management.
- **Zod**: Schema declaration and validation.
- **React Hook Form**: Form management.

### Backend Dependencies
- **Express.js**: Web application framework.
- **CORS**: Cross-origin resource sharing middleware.
- **Helmet**: Security middleware.
- **Morgan**: HTTP request logger.
- **Dotenv**: Environment variable management.
- **Prisma**: ORM for database interaction (PostgreSQL).

### Build & Development Tools
- **Vite**: Frontend build tool.
- **TypeScript**: Static type checking.
- **ts-node**: TypeScript execution.
- **SWC**: Fast TypeScript/JavaScript compiler.
- **Nodemon**: For development server hot-reloading.
- **ESLint**: Code quality.