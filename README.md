# About-Me---Personal-Blog

Portfolio-first Next.js web app with an existing bundled Node API preserved under `artifacts/api-server/dist`.

## What is in this repo

- A Next.js frontend built with the App Router
- Portfolio sections for hero, about, projects, GitHub profile, and contact
- A lightweight API health indicator wired to the existing backend endpoint
- The original bundled API runtime at `artifacts/api-server/dist/index.mjs`

## Environment

Copy `.env.example` to `.env.local` and update values.

```bash
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3000
```

`NEXT_PUBLIC_API_BASE_URL` is optional if the frontend and API are served from the same origin.

## Local development

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Run the API in a second terminal:

```powershell
$env:PORT="3000"
$env:NODE_ENV="development"
$env:LOG_LEVEL="info"
npm run api
```

Suggested frontend dev URL:

```text
http://localhost:3000
```

If the API also runs on port `3000`, start Next.js on another port:

```bash
npx next dev -p 3001
```

API health check:

```text
http://localhost:3000/api/healthz
```

## Production build

```bash
npm run build
npm run start
```

For the API:

```bash
PORT=3000 NODE_ENV=production LOG_LEVEL=info npm run api
```

## Deployment

### Vercel frontend plus separate API host

- Deploy the Next.js app to Vercel.
- Set `NEXT_PUBLIC_GITHUB_USERNAME`.
- Set `NEXT_PUBLIC_API_BASE_URL` to the public API URL if the API is hosted separately.
- Deploy the API bundle on a VPS, VM, or container platform with:
  - `PORT`
  - `NODE_ENV=production`
  - `LOG_LEVEL=info`

### Single host with reverse proxy

- Run the Next.js app with `npm run start`.
- Run the API bundle with `npm run api`.
- Use Nginx or Caddy to route `/api/*` to the API process and everything else to Next.js.

## Notes

- GitHub project and profile data are fetched live from the GitHub API.
- The contact form is intentionally non-persistent in v1 and opens a prefilled mail draft.
- Backend feature growth is intentionally deferred until the portfolio frontend is stable.
