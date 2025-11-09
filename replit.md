# Faith Funnels AI

## Overview

Faith Funnels AI is a complete SaaS dashboard tool for creating faith-based sales funnels with **Extended License for Agency/Service Provider Use**. The application enables users to build multi-stage funnels with main offers, one-time offers (OTOs), and downsells (DSs), integrate Bible verses with customizable CTAs, apply custom theme colors, and export standalone HTML/ZIP packages ready for deployment.

**LICENSING MODEL:**
- ✅ Buyers CAN create funnels for clients as an agency or service provider
- ✅ Buyers CAN use this as part of client projects and charge for funnel creation services
- ✅ White label customization with complete rebranding rights
- ❌ Buyers CANNOT resell the software dashboard access itself

**Domain:** faithfunnelsai.com  
**Support:** support@faithfunnelsai.com

The application follows a modern dashboard design inspired by Linear, Notion, and Stripe, with a collapsible sidebar navigation system and responsive layout that adapts from desktop to mobile devices.

## Project Status

**Completed Features:**
- ✅ Full CRUD operations for funnels, verses, and themes
- ✅ Dashboard with live statistics and Bible verse inspiration
- ✅ Funnel builder with stage management (Main/OTO/DS)
- ✅ Bible verse builder with funnel association
- ✅ Theme customization with preset themes
- ✅ HTML/ZIP export with legal pages (Terms, Privacy, 14-day Refund)
- ✅ All API integrations using shared error handling
- ✅ End-to-end testing validated all core workflows
- ✅ **Multi-tenant white-label system with PostgreSQL database**
- ✅ **Tenant-specific branding (business name, logo, colors, support email)**
- ✅ **Custom domain support with DNS setup instructions**
- ✅ **OTOs and DSs match tenant white-label branding in exports**
- ✅ **Lead magnet chatbot with email capture (OpenAI-powered)**
- ✅ **AI assistant for instant customer support and pre-sales questions**

**Implementation Notes:**
- Using PostgreSQL database with Neon WebSocket support for production-ready multi-tenancy
- All mutations use centralized apiRequest helper for consistent error handling
- Export generates standalone HTML files with embedded CSS (no external dependencies)
- Legal pages included in every export: Terms of Service, Privacy Policy, 14-Day Refund Policy
- **All exported funnels (Main/OTO/DS) use tenant branding: colors, business name, support email, and custom domain**
- **Chatbot captures leads before granting chat access - stores in PostgreSQL for follow-up**
- **AI assistant trained on Faith Funnels AI features, pricing, and agency/service provider licensing model**

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

## Deployment Guide

### Important: Development vs Production Security

**Current Status (Development Mode):**
- The development preview runs over HTTP and shows as "not secure" in the browser
- This is normal Replit behavior for development mode

**After Publishing:**
- Replit automatically provides TLS/HTTPS with a secure padlock icon
- Your site will be fully secure at `https://faithfunnelsai.replit.app`

### Publishing to Production

Faith Funnels AI is ready for deployment on Replit. Follow these steps to publish:

1. **Verify Application is Running**
   - Ensure the "Start application" workflow is running without errors
   - Test all features: Dashboard, Funnels, Verse Builder, Themes, Export
   - Verify the Warrior Plus demo funnel exports correctly with images

2. **Publish on Replit**
   - Click the "Publish" button in the Replit interface
   - The application will be deployed with automatic HTTPS and TLS security
   - Your site will be accessible at: `https://faithfunnelsai.replit.app`
   - The browser will display a secure padlock icon

3. **Custom Domain Setup**

**For White-Label Customers:**

Each tenant can configure their own custom domain to replace the default `.replit.app` URL:

*White-Label Admin Setup:*
1. Tenant visits their `/t/:slug/admin` page
2. Enters their custom domain in the "Custom Domain" field (e.g., `yourbusiness.com`)
3. Saves the settings - this domain will appear in exported funnels

*DNS Configuration (Customer's DNS Provider):*
1. After publishing your Replit app, go to Deployments → Settings
2. Click "Link a domain" or "Manually connect from another registrar"
3. Enter the custom domain (e.g., `yourbusiness.com`)
4. Add the provided `A` record to your DNS settings:
   - Type: A
   - Name: @ (or leave blank for root domain)
   - Value: [IP address provided by Replit]
5. Add the provided `TXT` record for verification
6. Wait for DNS propagation (up to 48 hours)
7. SSL certificates are automatically provisioned by Replit

*For Subdomains:*
- Create an additional `A` record with the subdomain as hostname
- Point to the same IP address as your primary domain

**Master Domain Setup (Main Platform):**
   - Configure `faithfunnelsai.com` to point to your Replit deployment
   - Update domain DNS settings as per Replit's instructions
   - SSL certificates are managed automatically by Replit

4. **Post-Deployment Verification**
   - Visit the landing page and verify it loads correctly
   - Test the complete user flow from landing → dashboard → export
   - Verify HTTPS padlock icon shows site as secure
   - Test export functionality downloads ZIP with images

### Environment Configuration

**Production Checklist:**
- ✅ SESSION_SECRET is set (handled automatically by Replit)
- ✅ HTTPS enabled (automatic on Replit)
- ✅ All assets properly served from `/assets/` path
- ✅ Legal pages (Terms, Privacy, Refund) accessible
- ✅ Export includes images, legal pages, and README

### Monitoring

**Key Metrics to Monitor:**
- Application uptime and response times
- Export download success rate
- Browser console for any errors
- User feedback on support@faithfunnelsai.com

### Scaling Considerations

**Current Setup:**
- In-memory storage (MemStorage) for development/demo
- Suitable for PLR sales and demonstrations

**Future Upgrades:**
- Migrate to PostgreSQL for production data persistence
- Add user authentication for multi-tenant support
- Implement analytics tracking for funnel performance
- Add payment integration for direct sales

### Support & Maintenance

**Contact Information:**
- Support Email: support@faithfunnelsai.com
- Domain: faithfunnelsai.com

**Maintenance Notes:**
- Regular testing of export functionality
- Monitoring for security updates
- Backup of funnel templates and themes
- Testing across major browsers (Chrome, Firefox, Safari, Edge)