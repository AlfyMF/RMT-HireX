# HireX - Job Requisition Management System

## Overview

HireX is a full-stack job requisition management system built with modern web technologies. The application enables organizations to create, manage, and track job requisitions through a streamlined workflow. It features a React-based frontend with TypeScript and a Node.js/Express backend, utilizing a monorepo structure with separate client and server workspaces.

The system supports comprehensive job requisition workflows including draft creation, multi-step form submissions, approval tracking, and detailed job specifications with skills, qualifications, project details, and location preferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
- **Workspace Architecture**: Uses npm workspaces to manage client and server as separate packages within a single repository
- **Independent Builds**: Client and server can be developed, built, and deployed independently
- **Shared Tooling**: Common scripts at root level for running development servers and production builds

### Frontend Architecture

**Framework Stack**:
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool for fast development and optimized production builds
- **React Router** for client-side routing and navigation

**UI Component System**:
- **shadcn/ui** with Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CVA (Class Variance Authority)** for managing component variants

**State Management**:
- **TanStack Query (React Query)** for server state management, caching, and API interactions
- Component-level state with React hooks for local UI state
- Form state managed through controlled components

**Design System**:
- Custom HSL-based color system defined in CSS variables
- Theme support with light/dark mode via next-themes
- Responsive breakpoint system with mobile-first approach
- Gradient definitions for primary branding elements

**Form Architecture**:
- Multi-step wizard pattern for job requisition creation
- Conditional step rendering based on work arrangement (Offshore/Onsite)
- Form state persistence across steps with central data object
- Real-time validation and user feedback
- Tooltips with Info icons for field guidance across all form sections
- Conditional field rendering based on job type (Contract/Consultant)
- Data-testid attributes on all interactive elements for testing

**Recent Form Specification Updates (October 9, 2025)**:

**Phase 1 - Initial Implementation**:
- **Work Arrangement Selection**: Implemented dedicated selection screen with Offshore/Onsite cards, change confirmation dialog, and progress reset warning
- **Basic Details**: Updated to use "Department" (not Delivery Unit), corrected certification field labels with tooltips
- **Skills & Qualifications**: Added Nice to Have Skills, Qualification fields, Specific Qualification, Total/Relevant Experience ranges with validation notes and proper tooltip alignment
- **Project & Client Info**: Removed non-spec fields (Business Unit, Project Location), added Client Country dropdown, Client Interview toggle (Yes/No), Project Role field (conditional for Contract/Consultant types), updated "Client Name" to "Client"
- **LocationShift**: Completely rebuilt with conditional logic - Offshore shows multi-select work locations and shift times; Onsite shows work mode, location, and timezone fields
- **Job Description**: Updated labels to match spec exactly - "Primary Duties", "Good-to-Have Duties", "Job Specification" with comprehensive tooltips
- **Onsite-Specific**: Rebuilt with contract rate fields (amount, unit, currency), payment cycle, visa status multi-select, contract duration, reporting manager, interview process, H1 transfer toggle, and travel required toggle

**Phase 2 - Refinements**:
- **Basic Details - Conditional Date Fields**: Fixed conditional display logic so Expected Date of Onboarding (Start/End) appears only for Offshore positions, and Ideal Start Date (Start/End) appears only for Onsite positions
- **Basic Details - Complete Tooltips**: Added comprehensive tooltips to all fields including Work Arrangement, Job Type, Job Title, Requested Date, Department, Requested By, Hiring Manager, Number of Positions, Billable, Client Billing Rate, Total Budget, and Expected Salary Range
- **Basic Details - Conditional Field Display**: Client Billing Rate now only shows when Billable = Yes; Total Budget fields only show for Contract/Consultant job types
- **Skills & Qualifications**: Changed certification label from "Certification (Mandatory & good to have)" to simply "Certification" per spec
- **Job Description**: Simplified labels to "Primary Duties", "Good-to-Have Duties", and "Job Specification" (removed slash separators)

**Phase 3 - Master Data Integration (October 13, 2025)**:
- **Database Setup**: Configured Neon PostgreSQL database using App Secrets for DATABASE_URL; pushed Prisma schema to create 14 tables; seeded database with comprehensive master data (12 departments, 20 skills, 15 job titles, 5 users, 15 certifications, 94 countries, office locations, work shifts, timezones, visa statuses)
- **React Query Configuration**: Configured default queryFn in api.ts for centralized API fetching with automatic API_BASE_URL prefix
- **API Response Handling**: Fixed apiRequest to unwrap backend response envelope and extract data property from {success, message, data} format
- **BasicDetails.tsx**: All dropdowns now fetch from master data APIs (Job Types, Skills, Job Titles, Departments, Users); implemented department-based filtering for Hiring Manager and Requested By fields (filters by "Hiring Manager" or "DU Head" role); added jobType casing normalization (lowercase for storage, title case for display with capitalize helper)
- **SkillsQualifications.tsx**: Integrated with Skills, Qualifications, and Certifications master data APIs; added useEffect to propagate selections to parent state
- **ProjectClientInfo.tsx**: Integrated with Countries master data API for Client Country dropdown
- **LocationShift.tsx**: Integrated with Office Locations, Work Shifts, and Work Timezones master data APIs
- **OnsiteSpecific.tsx**: Integrated with Visa Statuses master data API
- **Data Persistence**: All form components now properly call onUpdate handlers to persist selections to parent state, ensuring data consistency across form steps
- **Form Submission Flow**: Added automatic navigation to Dashboard after successful JR submission with 1.5s delay to display success toast

**Phase 4 - PascalCase Database Migration (October 14, 2025)**:
- **Schema Migration**: Migrated all 14 database tables from snake_case to PascalCase naming convention (job_types → JobType, users → User, departments → Department, etc.) using Prisma @@map() directives
- **Foreign Key Constraints**: Added Department table foreign key relationships to User table for DUHead, CDO, and RecruiterLead fields with ON DELETE CASCADE and ON UPDATE CASCADE rules
- **Comprehensive Seed Data**: Replaced initial seed data with production-ready comprehensive dataset including 194 countries, 73 skills, 15 certifications, 12 departments, 15 job titles, 11 roles, 10 qualifications, 6 users, 3 office locations, 4 work shifts, 5 timezones, and 15 visa statuses
- **API Verification**: Confirmed all master data APIs work correctly with renamed PascalCase tables, returning proper 200 responses
- **UI Integration**: Verified Job Requisition form successfully loads and displays data from new PascalCase database structure without regressions
- **Production Readiness**: Architect review confirmed migration is production-ready with proper schema structure, foreign key constraints, and comprehensive seeded data

**Phase 5 - Complete JobRequisition Schema Redesign (October 15, 2025)**:
- **Comprehensive Field Coverage**: Redesigned JobRequisition table with 70+ fields covering all 6 form steps from specification:
  - Core Identification: id, jrId, jrStatus, submittedBy, isActive, createdAt, updatedAt
  - Basic Details (Step 1): workArrangement, jobTypeId, coreSkillId, jobTitleId, requestedDate, departmentId, requestedById, hiringManagerId, numberOfPositions, date ranges, billable, budget/salary ranges
  - Skills & Qualifications (Step 2): primarySkills/secondarySkills/niceToHaveSkills arrays, qualifications/certifications arrays, specificQualification, experience ranges
  - Project & Client (Step 3): projectName, projectRole, clientName, clientCountryId, clientInterview
  - Location & Shift (Step 4): workLocations array, workShiftId, shiftTime, onsiteWorkMode, onsiteLocationId, onsiteDaysPerWeek, preferredTimeZoneId
  - Job Description (Step 5): jobPurpose, primaryDuties, goodToHaveDuties, jobSpecification
  - Onsite-Specific (Step 6): rate, rateUnit, rateCurrency, paymentCycle, visaStatuses array, contractDuration, durationUnit, reportingManager, interviewProcess, h1Transfer, travelRequired
- **Complete Foreign Key Relationships**: All specified FKs implemented with proper Prisma relations:
  - jobTypeId → JobType, coreSkillId → Skill, jobTitleId → JobTitle, departmentId → Department
  - requestedById/hiringManagerId/recruiterLeadId/recruiterPocId/submittedBy → User (with named relations to prevent conflicts)
  - clientCountryId → Country, workShiftId → WorkShift, onsiteLocationId → OfficeLocation, preferredTimeZoneId → WorkTimeZone
- **WorkShift Foreign Key Fix**: Changed workShift from free-text String to workShiftId foreign key for referential integrity and master data consistency
- **Performance Indexes**: Added strategic indexes on jrStatus, departmentId, requestedById, hiringManagerId, workArrangement, createdAt, updatedAt, jrId for query optimization
- **Data Types**: Proper types used - Decimal for currency/experience ranges, DateTime for dates, String[] for multi-select fields, Boolean for flags, UUID foreign keys
- **Database Migration**: Successfully migrated with force reset, re-seeded all master data tables
- **Architect Verification**: Confirmed production-ready with complete referential integrity supporting full JR workflow including draft saving, step navigation, and submission with status tracking

### Backend Architecture

**Server Framework**:
- **Express.js** with TypeScript for type-safe API development
- **ESNext modules** (ES2022) for modern JavaScript features
- Nodemon for development hot-reloading

**Middleware Stack**:
- **Helmet** for security headers
- **CORS** for cross-origin resource sharing
- **Morgan** for HTTP request logging
- Custom error handling middleware for consistent error responses

**API Structure**:
- RESTful API design patterns
- Centralized route configuration in `/routes` directory
- Response formatters for consistent API responses (success/error)
- Health check endpoint for monitoring

**Configuration Management**:
- Environment-based configuration using dotenv
- Separate development and production settings
- Centralized config object for application-wide settings

### Data Layer (Prepared for Future Integration)

The application currently uses mock data but is architected to support:
- Database integration (structure prepared for Drizzle ORM or similar)
- Type-safe data transfer objects (DTOs)
- Service layer pattern for business logic separation
- Future authentication/authorization with JWT support built into config

### Type Safety

**TypeScript Configuration**:
- Strict mode disabled for rapid development flexibility
- Path aliases configured (@/ for src directory)
- Separate configs for app code and build tools
- Shared types between client and server through defined interfaces

**Type Definitions**:
- Centralized type definitions in `/types` directories
- Interface-based API contracts (JobRequisition, User, ApiResponse)
- Generic response types for pagination and error handling

### Development Tooling

**Code Quality**:
- ESLint with TypeScript support for both client and server
- React-specific linting with hooks and refresh rules
- Unused variable warnings suppressed for development speed

**Build Process**:
- Vite for client bundling with SWC for fast TypeScript compilation
- Development mode with component tagging for debugging
- Separate build scripts for development and production modes

## External Dependencies

### UI Component Libraries
- **Radix UI**: Comprehensive suite of unstyled, accessible components (accordions, dialogs, dropdowns, selects, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-enabled carousel component
- **CMDK**: Command menu component for keyboard navigation
- **Vaul**: Drawer component for mobile-optimized modals
- **Input OTP**: One-time password input component

### Utility Libraries
- **clsx & tailwind-merge**: Class name manipulation and merging
- **date-fns**: Date formatting and manipulation
- **class-variance-authority**: Component variant management
- **React Hook Form** with **Zod resolvers**: Form validation and management (prepared for future use)

### Development Tools
- **Lovable Tagger**: Component tagging for development mode debugging
- **PostCSS with Autoprefixer**: CSS processing and vendor prefixing

### Backend Dependencies
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing middleware
- **Helmet**: Security middleware for HTTP headers
- **Morgan**: HTTP request logger
- **Dotenv**: Environment variable management

### Data Visualization (Prepared)
- **Recharts**: Charting library for future analytics dashboards

### Build & Deployment
- **Vite**: Next-generation frontend build tool
- **TypeScript**: Static type checking for both client and server
- **ts-node**: TypeScript execution for development server
- **SWC**: Fast TypeScript/JavaScript compiler for Vite