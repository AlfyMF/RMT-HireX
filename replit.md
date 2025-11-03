# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It provides organizations with an efficient tool for their hiring processes, supporting a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences.

## Recent Changes (November 3, 2025)

### Dashboard Pagination & Hiring Manager Status Fix (Latest)
- **Server-Side Pagination**: Implemented proper server-side pagination for Dashboard
  - Shows 10 Job Requisitions per page with Next/Previous buttons
  - Page navigation with "Page X of Y" indicator
  - Automatically resets to page 1 when filters change
  - All filters (search, status, department, work arrangement) passed to backend
  - Stats calculation uses all JRs, not just current page
  - Added data-testid attributes for pagination controls

- **Fixed Approval Workflow Bug**: Corrected status advancement for Hiring Managers
  - **Root Cause**: Approval workflow was checking `hiringManagerId` field instead of `submittedBy` field to determine submitter role
  - **Fix**: Updated `approvalWorkflow.ts` to check actual submitter's role (via `submittedBy`)
  - **Result**: 
    - Hiring Manager submits Draft → "Pending DU Head Approval" ✓
    - DU Head submits Draft → "Pending CDO Approval" ✓
  - Works correctly with both create and update flows

### Role-Based Access Control for JR Creation (November 3)
- **UI-Level Restriction**: Implemented role-based conditional rendering to restrict JR creation to Hiring Managers and DU Heads only
  - **Dashboard** (`client/src/modules/Dashboard.tsx`):
    - "Create New Requisition" button now only visible to Hiring Manager and DU Head roles
    - Other roles (CDO, COO, Recruiter Lead, Recruiter POC, Admin) cannot see the button
  
  - **Navigation Menu** (`client/src/components/Layout.tsx`):
    - "Create Job Requisition" menu item filtered out for non-authorized roles
    - Applied to both desktop and mobile navigation menus
    - Uses UserContext to check user role from database profile
  
  - **Implementation Details**:
    - Added `canCreateJR` check: `userProfile?.role === 'Hiring Manager' || userProfile?.role === 'DU Head'`
    - Conditional rendering with `{canCreateJR && <CreateButton />}` pattern
    - Mobile menu automatically inherits filtering from shared navigation array

### Critical Bug Fix: submittedBy Field Population (October 31)
- **Root Cause Analysis**: Identified that `submittedBy` field was not being populated during JR creation/update, causing three cascading failures:
  1. Auto-advancement logic unable to detect correct user role
  2. Rejected JRs not visible in Dashboard (role-based filter uses `submittedBy`)
  3. Revise button not appearing (checks `submittedBy === userProfile.id`)

- **Fix Implementation**:
  - **Create Controller** (`server/src/controllers/jobRequisition.ts`):
    - Now extracts `userId` from enrichAuth middleware
    - Sets `submittedBy` field automatically on JR creation if not already provided
    - Ensures every new JR has proper submitter tracking
  
  - **Update Service** (`server/src/services/jobRequisition.ts`):
    - Preserves existing `submittedBy` value during updates (never allows it to be changed)
    - Backfills missing `submittedBy` for legacy JRs (backward compatibility)
    - Added comprehensive debug logging to track auto-advancement decisions
    - Logs: current status, payload status, user role, and auto-advancement outcome
  
  - **Role-Based Filtering**: No changes needed - existing filter logic correctly handles all statuses (including Rejected) via `submittedBy` and `hiringManagerId` fields

### Fixed JR Update & Revise Workflow (Latest - Part 1)
- **Fixed Backend Auto-Advancement Logic**: Backend now correctly respects frontend intent
  - **Save & Continue** (sends `jrStatus="Draft"`) → Status stays as "Draft" (no auto-advancement)
  - **Update/Submit Requisition** (sends `jrStatus="Submitted"`) → Status auto-advances based on role:
    - Hiring Manager → "Pending DU Head Approval"
    - DU Head → "Pending CDO Approval"
  - Backend only auto-advances when payload explicitly contains `jrStatus="Submitted"`
  
- **Revise Button for Rejected JRs**:
  - Added functional "Revise" button on Dashboard for Rejected JRs
  - Visible only to the JR submitter (Hiring Manager or DU Head)
  - Clicking "Revise" calls `/api/job-requisitions/:id/revise` to move JR to Draft, then navigates to Edit form
  - Dashboard location: Next to Approve/Reject buttons in JR card action area

- **Disabled Save & Continue During Revision**:
  - Edit form detects revision mode by checking if JR has a `jrId` but status is "Draft"
  - "Save & Continue" button is disabled during revision with tooltip: "Save & Continue is disabled when revising a rejected JR. Please use Update Requisition to submit."
  - Forces users to use "Update Requisition" button to resubmit after revision
  - Ensures proper workflow: Revise → Edit → Update (no intermediate draft saves)

### Role-Based JR Update Logic & Dashboard Improvements (October 30)
- **Role-Based Auto-Advancement on Update**: When updating a Draft JR by clicking "Update Requisition", the system automatically advances status based on user role
  - Hiring Manager updates Draft → "Pending DU Head Approval"
  - DU Head updates Draft → "Pending CDO Approval"
  - JR ID is auto-generated when Draft transitions to any approval status
  - Approval workflow (email notifications, approval history) automatically triggered on status change
  
- **Dashboard Pending Count Enhancement**: Updated pending count logic to include all statuses starting with "Pending"
  - Previously: Only counted "Submitted", "DU Head Approved", "CDO Approved"
  - Now: Includes "Pending DU Head Approval", "Pending CDO Approval", "Pending COO Approval", plus "Submitted"
  - Uses dynamic `startsWith("Pending")` filter for future-proof status detection

- **Improved Update Controller** (`server/src/controllers/jobRequisition.ts`):
  - Passes user role, userId, and departmentId to service layer for role-based logic
  - Leverages enrichAuth middleware data for seamless role detection

- **Enhanced Update Service** (`server/src/services/jobRequisition.ts`):
  - Implements role-based status auto-advancement logic only when `jrStatus="Submitted"` in payload
  - Generates JR ID when transitioning from Draft to any approval status
  - Automatically triggers approval workflow with email notifications
  - Error handling ensures update succeeds even if email service fails

### Approval Workflow System
- **Database Schema**: Added 4 new tables to support approval workflow
  - `ApprovalHistory`: Tracks complete approval chain with approver details, actions, comments, and timestamps
  - `EmailNotification`: Logs all email notifications sent (approval requests, rejections, reminders, status updates)
  - `JobDescription`: Auto-created subset of JobRequisition after final COO approval
  - `AppConfiguration`: Stores system config (COO email, approval waiting period = 2 days, reminder email toggle)

- **Email Integration**: Integrated Resend for transactional emails via Replit connector
  - 6 email templates: approval request, approval notification, rejection, reminder, status change, recruiter assignment
  - Email service with HTML templates and automatic logging to EmailNotification table
  - Dynamic email content based on JR details and approval workflow stage

- **Approval Workflow Service** (`server/src/services/approvalWorkflow.ts`):
  - Automatic routing based on submitter role: HM → DU Head → CDO → COO or DU Head → CDO → COO
  - Dynamic status updates: "Pending DU Head Approval" → "Pending CDO Approval" → "Pending COO Approval" → "Approved"
  - Approval history tracking for audit trail
  - Auto-creation of JobDescription after COO approval
  - Auto-assignment to Recruiter Lead from department master data
  - Rejection handling with revision workflow (status changes to "Rejected", allows submitter to revise and resubmit)
  - Reminder email system for pending approvals exceeding 2-day threshold

- **Role-Based Access Control**: Implemented granular JR filtering based on user role
  - Hiring Manager: Only their submitted JRs
  - DU Head: JRs from their department
  - CDO: JRs from their departments + JRs in CDO/COO approval pipeline
  - COO: All JRs in COO approval stage or approved
  - Recruiter Lead/POC: Only JRs assigned to them
  - Admin: All JRs (no filtering)

- **Enhanced Authentication Middleware** (`server/src/middleware/enrichAuth.ts`):
  - Enriches JWT token data with full user profile from database
  - Adds userId, role, departmentId to request context for authorization
  - Seamlessly integrates with existing Azure AD authentication

- **New API Endpoints**:
  - `POST /api/job-requisitions/:id/approve-reject`: Approve or reject JR with comments
  - `GET /api/job-requisitions/:id/approval-history`: View complete approval chain
  - `POST /api/job-requisitions/:id/revise`: Move rejected JR back to draft for editing
  - `GET /api/job-requisitions/:id/can-approve`: Check if current user can approve specific JR

- **Workflow Integration**:
  - JR submission automatically triggers approval workflow
  - Email notifications sent at each approval stage
  - Frontend dashboard will display role-based action buttons (Approve/Reject/Revise)
  
### User Profile Management
- **Backend endpoint** `/api/user/profile` fetches user details from database based on email from Azure AD JWT token
- Created `UserContext` for frontend state management with automatic profile fetching after login
- Updated Profile page to display real user data including name, email, department, role, and account status
- Added comprehensive error handling for missing tokens, user not found scenarios, and server errors
- Uses Prisma `findFirst` to query users by email and active status

## User Preferences
Preferred communication style: Simple, everyday language.

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
- **Middleware**: Includes Helmet for security, CORS for cross-origin resource sharing, and Morgan for logging. Integrated secure Microsoft Azure AD authentication using MSAL for JWT validation.
- **API Structure**: Follows RESTful design principles with centralized routing and consistent response formatting.
- **Configuration**: Environment-based configuration using dotenv.
- **Data Layer**: Designed for PostgreSQL database integration (currently Neon DB) with Prisma ORM, utilizing PascalCase naming conventions and comprehensive foreign key relationships across 70+ fields in the JobRequisition schema. Includes strategic indexing for performance.
- **Workflow**: Manages draft creation, persistent saving, validation before submission, and a confirmation/success modal flow. The system generates unique JR numbers upon submission, transitioning a requisition from 'DRAFT-PENDING' to 'Submitted'. Includes dynamic field clearing based on key attribute changes (e.g., work arrangement, job type).

### Type Safety
TypeScript is configured for both client and server, with centralized type definitions and interface-based API contracts.

### Development Tooling
ESLint ensures code quality, while Vite and SWC handle efficient client-side bundling and TypeScript compilation.

## External Dependencies

### Authentication
- **Azure AD**: For secure user authentication using MSAL with popup-based flow (iframe-compatible).
- **Authentication Flow**: Uses `loginPopup()` and `logoutPopup()` to work within Replit's iframe environment.
- **Redirect URI Configuration**: Dynamically detects the application port (e.g., :5000 in development) to construct the correct redirect URI for MSAL, ensuring compatibility across different deployment environments.
- **Protected Routes**: All job requisition CRUD endpoints require valid JWT tokens.
- **Token Validation**: Backend validates Azure AD tokens using JWKS with RSA public keys.
- **Environment Configuration**: Backend server uses `server/start.sh` script to validate and export Azure AD credentials (AZURE_AD_CLIENT_ID and AZURE_AD_TENANT_ID) from Replit Secrets. The script fails fast if credentials are missing, preventing misconfigured deployment.

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
- **jsonwebtoken**: For JWT validation.
- **jwks-rsa**: For retrieving RSA public keys from a JWKS endpoint.

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