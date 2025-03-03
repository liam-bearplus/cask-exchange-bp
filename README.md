# CaskXExchange Front-End

A modern web application for CaskXExchange built with Next.js, TypeScript, and Tailwind CSS.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Authentication System](#authentication-system)
5. [Component Architecture](#component-architecture)
6. [Styling](#styling)
7. [State Management](#state-management)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Git Workflow](#git-workflow)

## Project Overview

CaskXExchange is a web application that provides a platform for users to browse, buy, and manage transactions. The application includes:

- Public-facing pages
- User authentication system
- User profile management
- Admin dashboard with analytics

The front-end is built using modern JavaScript technologies with a focus on performance, accessibility, and user experience.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd caskxexchange/front-end
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

The project follows Next.js App Router pattern with a modular structure:

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Authentication routes (sign-in, sign-up)
│   ├── (root)/           # Main public-facing routes 
│   ├── admin/            # Admin dashboard routes
│   ├── api/              # API routes
│   └── user/             # User account routes
├── assets/               # Static assets (images, styles)
├── components/           # React components
│   ├── shared/           # Domain-specific components
│   └── ui/               # Reusable UI components
├── config/               # Configuration files
├── lib/                  # Utility functions, constants
├── services/             # API services
└── types/                # TypeScript types
```

## Authentication System

The application uses NextAuth.js for authentication:

- Supports credential-based authentication
- JWT-based session management
- Role-based access control
- Protected routes in middleware

Authentication flow:
1. User signs in through `/sign-in` page
2. Credentials are validated
3. JWT token is created and stored
4. Protected routes check authentication status via middleware

## Component Architecture

The component structure follows a clear separation of concerns:

### UI Components (`/components/ui/`)

Generic, reusable components that form the building blocks of the UI. These components are styled with Tailwind CSS and follow the principles of the Shadcn UI component library.

Examples:
- Button
- Card
- Dialog
- Input

### Shared Components (`/components/shared/`)

Domain-specific components that are used across the application. These are organized by feature area:

- `/admin/` - Components used in the admin dashboard
- `/auth/` - Authentication forms and related components
- `/header/` - Navigation and header components
- `/user/` - User profile and settings components

## Styling

The application uses Tailwind CSS for styling:

- Utility-first CSS framework
- Custom theme configuration in `tailwind.config.ts`
- Global styles in `src/assets/styles/globals.css`
- Dark mode support via `next-themes`

## State Management

For state management, the application uses:

- React Query (TanStack Query) for server state management
- React Context for global UI state
- React Hook Form for form state management

## Testing

The project uses Jest for testing:

- Run tests: `npm test` or `yarn test`
- Watch mode: `npm run test:watch` or `yarn test:watch`

Tests are configured in `jest.config.ts` and `jest.setup.ts`.

## Deployment

The application is designed to be deployed on Vercel:

1. Build the application: `npm run build` or `yarn build`
2. Start the production server: `npm start` or `yarn start`

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Git Workflow

When contributing to this project, follow these git practices:

1. Create a feature branch from `main`
2. Make your changes with descriptive commit messages
3. Push your branch and create a pull request
4. Ensure all tests pass before merging

Recent commit history:
- `feat(set up)`: Front-end set up
- `feat(refactor)`: Delete redundant dependencies
- `first commit`: Initial project setup

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)