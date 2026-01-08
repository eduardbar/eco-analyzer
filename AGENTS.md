# AI Environmental Analyzer - Agent Guidelines

This document provides guidelines for AI agents working on the AI Environmental Analyzer project.

## 1. Project Structure
- **Root**: Contains project documentation and scripts.
- **backend/**: Express/Node.js API with Prisma and TypeScript.
- **frontend/**: Next.js (App Router) React application with TypeScript and Tailwind CSS.

## 2. Build, Lint, and Test Commands

### Backend (`/backend`)
- **Install**: `npm install`
- **Build**: `npm run build` (Runs `tsc`)
- **Start Dev**: `npm run dev`
- **Lint**: No specific lint command configured, follow standard TypeScript practices.
- **Test**: `npm test` (Currently disabled/placeholder).
  - *Note*: Tests are not fully set up. When adding tests, use Jest.
- **Prisma**: `npx prisma generate` (Generate client), `npx prisma migrate dev` (Database migrations).

### Frontend (`/frontend`)
- **Install**: `npm install`
- **Build**: `npm run build`
- **Start Dev**: `npm run dev`
- **Lint**: `npm run lint` (Runs Next.js ESLint config)
- **Test**: `npm test` (Runs Jest)
  - **Run Single Test**: `npm test -- -t "Test Name"` or `npm test -- path/to/file.test.ts`

### General
- **Docker**: `docker-compose up -d --build` (Builds and runs both services).

## 3. Code Style & Conventions

### General
- **Language**: TypeScript (Strict mode enabled).
- **Formatting**: Adhere to existing spacing (2 spaces indentation usually).
- **Comments**: Use comments to explain *why* complex logic exists, not *what* the code does.

### Backend (`/backend`)
- **Framework**: Express.js.
- **Database**: Prisma ORM with SQLite (dev).
- **Authentication**: JWT-based, stateless.
- **Validation**: Use `zod` schemas (located in `utils/validation.schemas.ts`).
- **Structure**:
  - `src/controllers/`: Request handlers.
  - `src/routes/`: Route definitions.
  - `src/middleware/`: Express middleware.
  - `src/lib/`: Shared utilities/configs (e.g., Prisma client).
- **Error Handling**: Use `try/catch` blocks in controllers. Return standardized JSON errors `{ error: string, details?: any }`.
- **Naming**: camelCase for variables/functions, PascalCase for classes/interfaces.

### Frontend (`/frontend`)
- **Framework**: Next.js 15+ (App Router).
- **Styling**: Tailwind CSS.
- **Components**: Functional components with hooks.
- **State Management**: React `useState`, `useEffect`, custom hooks (e.g., `useAnalysis`).
- **Structure**:
  - `src/app/`: Pages and layouts.
  - `src/components/`: Reusable UI components.
  - `src/hooks/`: Custom React hooks.
  - `src/services/`: API client logic.
- **Naming**: PascalCase for components (`AnalysisForm.tsx`), camelCase for hooks (`useAnalysis.ts`).
- **"use client"**: Add directive at the top of components using state/effects.

## 4. Workflow & Best Practices
- **Safety**: Always verify files exist before reading/writing. Use absolute paths for file operations.
- **Validation**: Validate assumptions about the environment (e.g., check `.env` existence securely).
- **Testing**: When adding features, add corresponding tests if infrastructure permits.
- **Deps**: Do not introduce new heavy dependencies without user approval.
- **Security**: Never hardcode secrets. Use environment variables (`process.env`).

## 5. Specific Rules
- **Prisma**: Always run `npx prisma generate` after changing `schema.prisma`.
- **API URL**: Frontend uses `NEXT_PUBLIC_API_URL`. Ensure it matches the backend port.
