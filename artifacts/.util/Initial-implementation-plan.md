# Weighted Initial Implementation Plan

## Summary
- Build a portfolio-first web app using the file plan as the primary blueprint, with 70% weight on the Next.js portfolio structure and 30% weight on the current repo reality.
- Preserve the existing bundled API as a separate runtime for health and future backend expansion, but do not let it drive the initial frontend architecture.
- Deliver a deployable v1 with a modern homepage, about section, projects fed by GitHub, contact section, responsive navigation, and production deployment setup.

## Implementation Changes
- Foundation
  - Create a root app workspace with a frontend-first structure based on Next.js App Router.
  - Add a root `package.json`, environment files, local/dev/prod scripts, and deployment documentation.
  - Keep the existing API bundle under `artifacts/api-server/dist` as an independent runtime and document how the frontend and API are served together.
  - Add deployment targets for Vercel-first frontend hosting and a Node-hosted API fallback.

- Frontend structure and components
  - Implement `app/layout` and `app/page` plus global styling and metadata.
  - Create shared sections/components: `Navbar`, `Hero`, `About`, `Projects`, `Github`, and `Contact`.
  - Add responsive navigation, mobile menu behavior, loading/error UI for GitHub data, and a clear visual system that is stronger than the placeholder styles in the base plan.
  - Add a 404 route and basic SEO assets: title/description, Open Graph defaults, favicon, sitemap, and robots.

- Behavioral and data flow
  - Fetch GitHub profile and repositories on the frontend using the configured username env var.
  - Filter repos to featured non-fork projects, cap the initial list, and expose GitHub and live-demo links when available.
  - Keep contact as a non-persistent v1 interaction unless a backend endpoint is explicitly added; default to client-side validation plus a safe fallback submission path.
  - Add a non-blocking API status check using the existing `/api/healthz` endpoint so the frontend can surface backend availability without depending on it for initial render.

- Current-repo scoped adaptation
  - Treat the existing API as optional infrastructure for v1, not as the source of portfolio content.
  - Add a simple integration layer so the frontend can call `/api/healthz` and future API routes cleanly.
  - Reserve backend expansion for phase 2 only if needed for contact submission, content, or analytics.
  - Recover or ignore missing source artifacts deliberately; do not attempt to rebuild the site around generated declaration files.

## Public Interfaces
- Frontend env
  - `NEXT_PUBLIC_GITHUB_USERNAME`
  - Optional API base URL if frontend and API are deployed separately
- Backend env
  - `PORT`
  - `NODE_ENV`
  - `LOG_LEVEL`
- Initial API usage
  - `GET /api/healthz` remains unchanged
- Optional later API additions
  - Contact submission endpoint only if client-only contact flow is insufficient

## Test Plan
- Local run
  - Frontend dev server starts from a clean checkout.
  - Existing API bundle starts and returns `{"status":"ok"}` from `/api/healthz`.
- UI behavior
  - Navbar works on desktop and mobile.
  - Hero, About, Projects, GitHub, and Contact sections render correctly.
  - GitHub fetch success, empty state, and failure state are handled cleanly.
  - Contact form validates inputs and follows the chosen fallback behavior.
- Production
  - Frontend production build succeeds.
  - Metadata and static assets are present in build output.
  - Deployment instructions work for frontend hosting and API runtime.
- Quality
  - Core pages are responsive.
  - Basic accessibility is present: landmarks, heading order, keyboard navigation, alt text, contrast.
  - API health indicator does not break the page when the API is unavailable.

## Main TODOs
- Scaffold the Next.js frontend and root project tooling.
- Build the six core portfolio components and responsive layout.
- Wire GitHub profile and repo fetching with resilient UI states.
- Integrate the existing `/api/healthz` endpoint as a lightweight backend-status feature.
- Add deployment config, env docs, and verification steps.
- Leave backend feature growth for a second pass unless contact handling requires it.

## Assumptions
- The target is a portfolio-first site, not a blog-first product.
- The file plan in `artifacts/.util/basic-web-page-plan.md` is the primary reference despite its rough placeholder content.
- The current repo’s bundled API is valid but minimal and should be preserved rather than expanded immediately.
- `artifacts/.util/Initial-implementation-plan.md` should contain this merged plan once mutation is allowed.
