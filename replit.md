# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It features a React-based frontend with TypeScript and a Node.js/Express backend, structured as a monorepo. The system supports a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences. The core purpose is to provide organizations with an efficient tool for their hiring processes.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes

### October 17, 2025 - Onsite Location Backend Service Fix
**Fixed Prisma Service Error:**
- Removed `onsiteLocation: true` from all Prisma `include` statements in `server/src/services/jobRequisition.ts`
- The onsite location field is now a scalar text field (not a relation), so it's automatically returned by Prisma without needing to be explicitly included
- Verified save draft and submit operations work correctly (backend logs show successful POST 201 responses)
- API responses now properly include the `onsiteLocation` field as a string value

### October 17, 2025 - Dashboard Enhancements & Onsite Location Fix
**Dashboard Improvements:**
- Added comprehensive summary statistics cards: Total JRs, Pending, Approved, Rejected, and Draft counts
- Enhanced JR cards with detailed information display:
  - Location (handles both offshore work locations array and onsite location string)
  - Experience range (min-max years)
  - Salary range (formatted with currency)
  - Work mode (offshore/onsite specific)
  - Number of positions
  - Creation date
  - Hiring manager and requested by information
  - Primary skills with badge display (shows up to 5 skills with overflow indicator)
- Implemented dynamic filter system:
  - All filter dropdowns (Status, Department, Work Arrangement, Location) now populate only with values from actual JR data
  - Added new location filter supporting both offshore and onsite locations
  - Filter state management with clear filters functionality

**Onsite Location Field Fix:**
- Database: Renamed column from `onsite_location_id` to `onsite_location` (text field)
- UI: Reverted onsite location from dropdown to text input per user preference
- Dashboard: Fixed onsite location handling to treat as string value (not object.name pattern) across card display, filter options extraction, and filtering logic

### October 17, 2025 - Field Mapping Fix
Fixed 21 field name mismatches across all JR form components to ensure proper data flow from UI to transformer to backend:
- **BasicDetails** (8 fields): Date ranges (onboarding, ideal start) and budget/salary min/max values now map correctly to transformer-expected field names
- **SkillsQualifications** (4 fields): Total/relevant experience min/max values now map correctly
- **LocationShift** (3 fields): Onsite days per week and preferred timezone now map correctly
- **JobDescription** (2 fields): Primary duties and job specification now map correctly
- **OnsiteSpecific** (4 fields): Visa statuses, duration unit, H1 transfer now map correctly via useEffect

Implementation uses dual-field-name strategy: onChange handlers save data with both original UI field names (for state persistence) and transformer-expected field names (for backend processing). This ensures all form data is properly captured and sent to the backend regardless of which field name the transformer expects.

## System Architecture

### Monorepo Structure
The project utilizes npm workspaces to manage client and server as independent packages within a single repository, allowing for independent development and deployment while sharing common tooling.

### Frontend Architecture
- **Framework Stack**: React 18 with TypeScript, Vite for fast development and optimized builds, and React Router for client-side navigation.
- **UI Component System**: Leverages shadcn/ui with Radix UI primitives for accessible and customizable components, styled with Tailwind CSS for utility-first styling and CVA for component variants.
- **State Management**: TanStack Query (React Query) handles server state, caching, and API interactions, complemented by React hooks for local UI state.
- **Design System**: Features a custom HSL-based color system, light/dark mode support via next-themes, and a responsive mobile-first breakpoint system.
- **Form Architecture**: Implements a multi-step wizard for job requisition creation, featuring conditional rendering, cross-step state persistence, real-time validation, and tooltips for guidance. Interactive elements include `data-testid` attributes for testing.
- **Job Requisition Form Workflow**: Supports comprehensive field coverage across six steps, dynamic field rendering based on job type and work arrangement, and master data integration for dropdowns.

### Backend Architecture
- **Server Framework**: Express.js with TypeScript and ESNext modules.
- **Middleware**: Includes Helmet for security, CORS for cross-origin resource sharing, and Morgan for logging.
- **API Structure**: Follows RESTful design principles with centralized routing and consistent response formatting.
- **Configuration**: Environment-based configuration using dotenv.
- **Data Layer**: Designed for PostgreSQL database integration (currently Neon DB) with Prisma ORM, utilizing PascalCase naming conventions for tables and comprehensive foreign key relationships across 70+ fields in the JobRequisition schema. Includes strategic indexing for performance.
- **Workflow**: Manages draft creation, persistent saving, validation before submission, and a confirmation/success modal flow. The system generates unique JR numbers (e.g., EXP-YYYY-CODE-###) upon submission, transitioning a requisition from 'DRAFT-PENDING' to 'Submitted'.

### Type Safety
TypeScript is configured for both client and server, with centralized type definitions and interface-based API contracts.

### Development Tooling
ESLint ensures code quality, while Vite and SWC handle efficient client-side bundling and TypeScript compilation.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Accessible, unstyled components (accordions, dialogs, dropdowns, selects).
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
- **Zod**: Schema declaration and validation (via Zod resolvers with React Hook Form).
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