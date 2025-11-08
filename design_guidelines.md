# Faith Funnels AI - Design Guidelines

## Design Approach

**Selected Framework:** Modern SaaS Dashboard Design System (inspired by Linear, Notion, and Stripe)
- Clean, professional productivity interface
- Information density balanced with clarity
- Faith-based visual elements integrated subtly

## Core Layout Structure

### Dashboard Architecture
**Left Sidebar Navigation (280px expanded, 64px collapsed)**
- Sidebar slides content, never overlaps workspace
- Icons always visible in collapsed state
- Smooth transition animation (200ms ease)
- Workspace adjusts width responsively: `calc(100vw - [sidebar-width])`

**Main Workspace**
- Full-height content area with internal scrolling
- Top bar (64px height) with page title, breadcrumbs, and action buttons
- Content grid using 24px base spacing unit

### Responsive Breakpoints
- Desktop: Sidebar expanded by default
- Tablet (768px-1024px): Sidebar collapsed by default, expands as overlay
- Mobile (<768px): Full-screen overlay menu

## Typography System

**Font Stack:** Inter (via Google Fonts CDN)
- Headings: 600 weight
- Body: 400 weight
- UI Labels: 500 weight

**Scale:**
- Page Title: text-3xl (30px)
- Section Headers: text-xl (20px)
- Card Titles: text-lg (18px)
- Body/Forms: text-base (16px)
- Labels/Captions: text-sm (14px)
- Sidebar Items: text-sm (14px)

## Spacing System

**Tailwind Units:** Consistently use 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4, p-6
- Section spacing: py-8, py-12
- Card spacing: p-6
- Form elements: gap-4, gap-6
- Page margins: px-6, px-8

## Component Library

### Navigation
**Sidebar Menu Items**
- Height: h-10
- Padding: px-3
- Icon: 20px, mr-3
- Hover state with subtle background shift
- Active state with border-l-3 accent indicator

**Top Bar**
- Breadcrumb navigation with chevron separators
- Right-aligned action buttons (Export, Save, Settings)
- User profile dropdown in top-right corner

### Dashboard Cards
**Statistics Cards**
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Rounded corners: rounded-lg
- Padding: p-6
- Border: border with subtle shadow
- Icon (32px) + Label + Large number display

**Content Cards**
- Full-width sections with rounded-lg borders
- Header with title + action button
- Body content with appropriate padding
- Footer with metadata or actions

### Funnel Builder Interface
**Canvas Area**
- Centered workspace with max-w-6xl
- Drag-and-drop zones with dashed borders when empty
- Connected flow visualization with vertical arrows/lines
- Funnel stages: Main Offer → OTO1 → OTO2 → DS1

**Stage Cards**
- Compact card design (rounded-md, p-4)
- Thumbnail preview + Title + Edit/Delete actions
- Connection lines: 2px vertical lines between stages
- Add button (+) between stages

### Daily Verse Builder
**Form Layout**
- Two-column grid: lg:grid-cols-2
- Left: Verse input textarea (h-32)
- Right: CTA customization panel
- Preview card showing live rendering
- Color picker integration for highlighting

### Forms & Inputs
**Input Fields**
- Height: h-10 for text inputs
- Padding: px-3
- Border: rounded-md with 1px border
- Label above: text-sm, mb-2
- Focus state with enhanced border

**Buttons**
- Primary: h-10, px-6, rounded-md, font-medium
- Secondary: same size with border variant
- Icon buttons: w-10 h-10, rounded-md
- Button groups with gap-2

**Color Picker Component**
- Swatch display (w-10 h-10, rounded)
- Hex input field next to swatch
- Dropdown palette with common faith colors
- Real-time preview in connected components

### Data Tables
**Funnel List View**
- Alternating row backgrounds
- Columns: Name | Created | Modified | Actions
- Row height: h-14
- Action icons (Edit, Export, Delete) in right column

### Modals & Overlays
**Modal Structure**
- Centered overlay: max-w-2xl
- Header: px-6 py-4 with close button
- Body: px-6 py-4 with scrollable content
- Footer: px-6 py-4 with action buttons

### Export Interface
**ZIP Export Panel**
- Checklist of included files
- Progress indicator during generation
- Download button (prominent, primary style)
- File size preview

## Icons
**Library:** Heroicons (via CDN)
- Outline style for most UI elements
- Solid style for active/selected states
- Size: 20px standard, 24px for emphasis

**Key Icons:**
- Menu: Bars3Icon
- Dashboard: HomeIcon
- Funnel: FunnelIcon
- Verse: BookOpenIcon
- Colors: SwatchIcon
- Export: ArrowDownTrayIcon
- Settings: Cog6ToothIcon

## Legal Pages
**Layout:**
- Single column, max-w-4xl centered
- Generous line-height (leading-relaxed)
- Section headers with mb-6
- Padding: px-6 py-12
- Numbered sections with indented subsections

## Visual Hierarchy
**Emphasis Levels:**
1. Primary CTAs and active states: Bold, larger, prominent placement
2. Secondary actions: Medium weight, standard size
3. Tertiary info: Lighter weight, smaller text
4. Disabled/inactive: Reduced opacity (opacity-50)

## Professional Polish
- Consistent border-radius: rounded-md (6px) standard, rounded-lg (8px) for cards
- Subtle shadows on elevated elements
- Smooth transitions (transition-all duration-200)
- Loading states with skeleton screens
- Empty states with centered icon + message + CTA
- Toast notifications: top-right position, slide-in animation

## Faith-Based Visual Elements
- Bible verse cards with elegant typography
- Cross icon integration in branding areas
- Verse of the day widget in dashboard header
- Inspirational quotes in empty states
- Reverent, professional tone throughout UI