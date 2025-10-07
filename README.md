# HireX - Job Requisition Management System

A full-stack application for managing job requisitions with a modern tech stack.

## 📁 Project Structure

```
hirex/
├── client/                         # Frontend (React + TypeScript + Vite)
│   ├── public/                     # Static assets (favicon, logos, etc.)
│   ├── src/                        # Application source
│   │   ├── assets/                 # Images, icons, etc.
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   └── jr-form/            # Job requisition form components
│   │   ├── config/                 # App configuration & environment setup
│   │   ├── constants/              # App-wide constants/enums
│   │   ├── data/                   # Mock data
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility functions
│   │   ├── modules/                # Feature-based modules (pages/views)
│   │   ├── routes/                 # Client-side routing configuration
│   │   ├── services/               # API service layer
│   │   ├── types/                  # TypeScript type definitions
│   │   ├── App.tsx                 # Root component
│   │   └── main.tsx                # ReactDOM entry point
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig*.json              # TypeScript configs
│   └── package.json                # Client dependencies
│
├── server/                         # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/                 # Environment, database setup
│   │   ├── middleware/             # Express middleware
│   │   ├── routes/                 # API route definitions
│   │   ├── types/                  # TypeScript type definitions
│   │   ├── utils/                  # Helpers, response formatters
│   │   ├── app.ts                  # Express app configuration
│   │   └── index.ts                # Server bootstrap (entry point)
│   ├── tsconfig.json               # TypeScript config
│   ├── nodemon.json                # Dev server auto-restart config
│   └── package.json                # Server dependencies
│
├── .gitignore
├── README.md                       # Project documentation
└── package.json                    # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

This will install dependencies for both client and server workspaces.

### Development

Run the frontend development server:
```bash
npm run dev
```

Run the backend development server (when ready):
```bash
npm run dev:server
```

Run frontend or backend separately:
```bash
npm run dev:client    # Frontend only
npm run dev:server    # Backend only
```

### Building for Production

Build the client:
```bash
npm run build:client
```

Build the server:
```bash
npm run build:server
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📝 Features

- Dashboard with job requisition overview
- Create and manage job requisitions
- Filter and search functionality
- Responsive design
- User profile management

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
NODE_ENV=development
PORT=3000
```

## 📦 Workspace Structure

This project uses npm workspaces to manage the monorepo:

- `client/` - Frontend workspace
- `server/` - Backend workspace

Each workspace has its own `package.json` and can be managed independently.

## 🤝 Development

### Lovable Integration

This project was created with Lovable. Visit [Lovable Project](https://lovable.dev/projects/70a6d733-9ba2-4688-ace2-800604b8b536) to make changes via prompting.

Changes made via Lovable will be committed automatically to this repo.

### Local Development

You can also work locally using your preferred IDE. Clone this repo and push changes - they will be reflected in Lovable.

## 📄 License

This project is private and proprietary.
