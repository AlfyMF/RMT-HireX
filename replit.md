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