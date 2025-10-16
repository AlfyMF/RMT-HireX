# HireX - Job Requisition Management System

## Overview
HireX is a full-stack job requisition management system designed to streamline the creation, management, and tracking of job requisitions. It features a React-based frontend with TypeScript and a Node.js/Express backend, structured as a monorepo. The system supports a comprehensive multi-step workflow for job requisition creation, including draft saving, approval tracking, and detailed job specifications encompassing skills, qualifications, project specifics, and location preferences. The core purpose is to provide organizations with an efficient tool for their hiring processes.

## User Preferences
Preferred communication style: Simple, everyday language.

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