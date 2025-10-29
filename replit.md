# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It provides organizations with an efficient tool for their hiring processes, supporting a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences.

## Recent Changes (October 29, 2025)

### Approval Workflow System (Latest)
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