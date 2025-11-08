# Faith Funnels AI

## Overview

Faith Funnels AI is a SaaS application for creating faith-based sales funnels with integrated Bible verses. Users can build multi-stage funnels (main offers, one-time offers, downsells), customize themes with brand colors, select Bible verses with call-to-action buttons, and export complete HTML pages ready for deployment.

The application follows a modern dashboard design inspired by Linear, Notion, and Stripe, with a collapsible sidebar navigation system and responsive layout that adapts from desktop to mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**UI Component System:** Shadcn/ui (Radix UI primitives) with Tailwind CSS
- Component library located in `client/src/components/ui/`
- Custom components in `client/src/components/`
- New York style variant with neutral color palette
- Responsive design system with breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

**Routing:** Wouter for client-side routing
- Route definitions in `client/src/App.tsx`
- Pages located in `client/src/pages/`

**State Management:** TanStack Query (React Query) for server state
- Query client configuration in `client/src/lib/queryClient.ts`
- Custom fetch wrapper with error handling
- Stale-time set to Infinity (manual invalidation pattern)

**Layout System:**
- Collapsible sidebar (280px expanded, 64px collapsed)
- Sidebar pushes content, never overlaps
- Main workspace uses `calc(100vw - [sidebar-width])`
- Full-height content areas with internal scrolling

**Typography:** Inter font family via Google Fonts CDN
- Hierarchical scale from text-3xl (page titles) to text-sm (labels)
- Consistent font weights (400, 500, 600)

**Spacing:** Tailwind spacing units (2, 4, 6, 8, 12, 16, 24)

### Backend Architecture

**Framework:** Express.js with TypeScript running on Node.js

**API Structure:** RESTful API with resource-based endpoints
- `/api/funnels` - CRUD operations for funnel management
- `/api/verses` - Bible verse management
- `/api/themes` - Theme color customization
- Route handlers in `server/routes.ts`

**Middleware:**
- JSON body parsing with raw body preservation
- Request/response logging for API endpoints
- 80-character log line truncation

**Development Server:** Vite middleware integration
- HMR (Hot Module Replacement) support
- Custom error overlay via Replit plugins
- Dev banner and cartographer in development mode

### Data Storage

**Current Implementation:** In-memory storage (`MemStorage` class)
- Map-based data structures for funnels, verses, and themes
- Seeded with default data on initialization
- Located in `server/storage.ts`

**Database Schema Design:** Drizzle ORM with PostgreSQL dialect
- Schema defined in `shared/schema.ts`
- Three main tables: `funnels`, `verses`, `themes`
- Foreign key relationships with cascade delete
- UUID primary keys via `gen_random_uuid()`

**Data Models:**
- **Funnels:** Name and JSON array of stages (main/oto/ds types)
- **Verses:** Bible text, reference, CTA text/URL, linked to funnel
- **Themes:** Color palette (primary/secondary/accent), default flag, linked to funnel

**Type Safety:** Zod schemas for runtime validation
- Insert schemas generated via `drizzle-zod`
- Shared types between frontend and backend via `@shared` alias

### External Dependencies

**Database Provider:** Neon Serverless PostgreSQL
- Connection via `@neondatabase/serverless` package
- Connection pooling for serverless environments
- Configuration in `drizzle.config.ts`

**UI Libraries:**
- Radix UI primitives (30+ component packages)
- react-colorful for color picker
- embla-carousel-react for carousels
- lucide-react for icons
- cmdk for command palette

**Build Tools:**
- Vite for frontend bundling and dev server
- esbuild for backend production builds
- TypeScript with strict mode enabled

**Utility Libraries:**
- date-fns for date manipulation
- class-variance-authority for component variants
- tailwind-merge and clsx for className composition
- JSZip and file-saver for HTML export functionality

**Development Tools:**
- tsx for TypeScript execution in development
- Replit-specific plugins (cartographer, dev banner, runtime error modal)
- drizzle-kit for database migrations

**Session Management:** connect-pg-simple (PostgreSQL session store)

**Path Aliases:**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`