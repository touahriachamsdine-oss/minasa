# Moubadara — مبادرة 🚀

Futuristic Platform for Community Initiatives in Algeria (2035 Smart City Aesthetic).

## Technical Stack
- **Frontend**: Vanilla HTML5/CSS3 (Glassmorphism), Modular JavaScript.
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Edge Functions).
- **PWA**: Full offline support, push readiness, and install prompt.
- **Deployment**: Optimized for Vercel (static routing included).

## Initial Setup
1.  **Supabase**:
    - Create a new project at [supabase.com](https://supabase.com).
    - Paste and run the contents of `sql/schema.sql` in the SQL Editor.
2.  **Configuration**:
    - Update `src/js/config.js` with your Project URL and Anon Key.
3.  **Local Development**:
    - Serve the root directory using any static server (e.g., `npx serve .`).
4.  **Deployment**:
    - Push to GitHub and connect to Vercel.
    - Routing is pre-configured in `vercel.json`.

## Directory Structure
- `pages/`: Application views (index, dashboard, etc).
- `src/css/`: Modular design system tokens and components.
- `src/js/`: Logic modules (auth, db, i18n, realtime).
- `sql/`: Database source code.
- `public/`: Icons, fonts, and patterns.

**Designed for Algiers Smart City 2035.** 🇩🇿
