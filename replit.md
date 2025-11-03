# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It provides organizations with an efficient tool for their hiring processes, supporting a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences.

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
- **UI/UX Decisions**: Role-based access control is implemented for UI elements, such as the "Create New Requisition" button and navigation menu items, ensuring only authorized roles can view and interact with specific features. Dashboard pagination is server-side with 10 job requisitions per page, including navigation controls and filter integration.

### Backend Architecture
- **Server Framework**: Express.js with TypeScript and ESNext modules.
- **Middleware**: Includes Helmet for security, CORS for cross-origin resource sharing, and Morgan for logging. Integrated secure Microsoft Azure AD authentication using MSAL for JWT validation.
- **API Structure**: Follows RESTful design principles with centralized routing and consistent response formatting.
- **Configuration**: Environment-based configuration using dotenv.
- **Data Layer**: Designed for PostgreSQL database integration (currently Neon DB) with Prisma ORM, utilizing PascalCase naming conventions and comprehensive foreign key relationships across 70+ fields in the JobRequisition schema. Includes strategic indexing for performance.
- **Workflow**: Manages draft creation, persistent saving, validation before submission, and a confirmation/success modal flow. The system generates unique JR numbers upon submission, transitioning a requisition from 'DRAFT-PENDING' to 'Submitted'. Includes dynamic field clearing based on key attribute changes (e.g., work arrangement, job type).
- **Approval Workflow System**:
    - **Database Schema**: Four new tables: `ApprovalHistory`, `EmailNotification`, `JobDescription`, and `AppConfiguration`.
    - **Approval Logic**: Automatic routing based on submitter role (HM → DU Head → CDO → COO). Dynamic status updates and approval history tracking. Auto-creation of `JobDescription` post-COO approval and auto-assignment to Recruiter Lead. Rejection handling with a revision workflow.
    - **Role-Based Access Control**: Granular JR filtering based on user roles (Hiring Manager, DU Head, CDO, COO, Recruiter Lead/POC, Admin).
    - **Authentication**: Enhanced `enrichAuth` middleware enriches JWT token data with full user profile for authorization.
    - **API Endpoints**: New endpoints for approving/rejecting JRs, viewing approval history, revising JRs, and checking approval permissions.

### Type Safety
TypeScript is configured for both client and server, with centralized type definitions and interface-based API contracts.

### Development Tooling
ESLint ensures code quality, while Vite and SWC handle efficient client-side bundling and TypeScript compilation.

## External Dependencies

### Authentication
- **Azure AD**: For secure user authentication using MSAL with popup-based flow (iframe-compatible).
- **Authentication Flow**: Uses `loginPopup()` and `logoutPopup()` to work within Replit's iframe environment.
- **Redirect URI Configuration**: Dynamically detects the application port to construct the correct redirect URI for MSAL.
- **Protected Routes**: All job requisition CRUD endpoints require valid JWT tokens.
- **Token Validation**: Backend validates Azure AD tokens using JWKS with RSA public keys.

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
- **Resend**: Integrated for transactional email sending via Replit connector, supporting 6 email templates and logging.

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