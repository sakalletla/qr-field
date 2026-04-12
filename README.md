# QRField (web MVP)

Next.js app for **QRField** — freemium QR utility (static + dynamic, Pro analytics). Product docs live one level up in **`qr-something/`**.

## Docs (parent folder)

| Doc | Purpose |
|-----|---------|
| [QRField-Product-Spec-MVP.md](../QRField-Product-Spec-MVP.md) | Scope, pricing, architecture |
| [QRField-Wireframes-MVP.md](../QRField-Wireframes-MVP.md) | UX / IA |
| [QRField-Figma-Prompts-MVP.md](../QRField-Figma-Prompts-MVP.md) | Figma AI prompts |
| [QRField-Screen-Flow-Authenticated-Free.md](../QRField-Screen-Flow-Authenticated-Free.md) | Logged-in Free flows (prototype target) |
| [QRField-Stitch-Export-Validation.md](../QRField-Stitch-Export-Validation.md) | Stitch HTML vs spec + app parity notes |
| [QRField-Technical-Stack.md](../QRField-Technical-Stack.md) | Stack, env vars |
| [QRField-Data-Model-MVP.md](../QRField-Data-Model-MVP.md) | DB / Redis / Stripe model + mappings |
| [QRField-MVP-Functional-Tasks.md](../QRField-MVP-Functional-Tasks.md) | Production task checklist |
| [QRField-Production-Setup.md](../QRField-Production-Setup.md) | Supabase SQL, env, deploy steps, Cloudflare |
| [QRField-Deployment-Guide.md](../QRField-Deployment-Guide.md) | Docker image, Compose, health, Postgres / slug verification |
| [QRField-No-Redis-Slug-Postgres.md](../QRField-No-Redis-Slug-Postgres.md) | Postgres-only slugs (spec; apply in Agent mode) |

## Implementation status

- **UI:** Marketing and app shell follow the **Stitch** export palette and layout (see validation doc); Inter + Material Symbols; components under `src/components/stitch/` and `src/components/app/`.
- **Behavior (browser demo):** **Not** production auth. **`middleware.ts`** protects app routes using a **demo session cookie** (`qrfield_session`). **Login / sign-up** set the cookie and store **profile + QR list + plan** in **`localStorage`** (`src/lib/demo-*.ts`). Use this to walk **IA**, **Free quota**, **create wizard**, and **QR detail** flows before Postgres / Stripe exist. **Target auth:** **Auth.js** with **Google** first, then **email**, then **Facebook** — see [QRField-Technical-Stack.md](../QRField-Technical-Stack.md) § Authentication.
- **Figma:** Wireframes can still evolve; code is the current interactive reference for routing and copy guardrails.

## Routes

- **Marketing:** `/`, `/pricing`, `/login`, `/signup`, `/privacy`, `/terms`
- **App (cookie required):** `/dashboard`, `/create`, `/codes/[id]`, `/billing`, `/settings`
- **Redirect (API):** `GET /r/[slug]` — **302** when **Redis** (legacy) or **Postgres `slug_redirects`** is wired — see [QRField-No-Redis-Slug-Postgres.md](../QRField-No-Redis-Slug-Postgres.md). Browser registers via **`POST /api/slugs/register`** after create / on storage sync.

## Key source paths

| Path | Role |
|------|------|
| `src/middleware.ts` | Demo session gate + redirect logged-in users away from `/login` `/signup` |
| `src/lib/demo-session.ts` | Set/clear session cookie (client) |
| `src/lib/demo-storage.ts` | Codes, plan, profile in `localStorage`; seed sample rows on first login |
| `src/lib/qrfield-sync.ts` | `useSyncExternalStore` subscriptions for client views |
| `src/components/auth/` | Login / sign-up forms |
| `src/app/(app)/*` | Dashboard, create wizard, detail, billing, settings |

## Deployment (Docker / private cloud / K8s)

Production-oriented **Dockerfile** (Next **standalone**), **`GET /api/health`**, and optional **`docker compose --profile app`** are documented in **[QRField-Deployment-Guide.md](../QRField-Deployment-Guide.md)**.  
**First production deploy (Supabase, env vars, SQL script, Cloudflare):** **[QRField-Production-Setup.md](../QRField-Production-Setup.md)**.  
*Note:* “Cloudera” (CDP) is not a typical Next.js host; run the container on **Kubernetes/OpenShift** or similar, or use **Cloudflare** with their Next.js adapter if that was the intent.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Local Postgres (+ optional Redis)

```bash
docker compose up -d
```

Use connection strings from [`.env.example`](./.env.example). Not required for the **demo UI** alone. For **Postgres-backed slugs**, set **`DATABASE_URL`** and follow [QRField-No-Redis-Slug-Postgres.md](../QRField-No-Redis-Slug-Postgres.md).

**Inspect data in running containers:** [QRField-Deployment-Guide.md § Verify Postgres (CLI) and slug rows](../QRField-Deployment-Guide.md#verify-postgres-cli-and-slug-rows).

### Run the full app in Docker (smoke test)

Use this to mirror a production-like Node server on your machine (same image as deploy). **Postgres** starts (and **Redis** if still in your compose file); the MVP UI still uses **browser `localStorage`** for codes unless you wire the API.

```bash
npm run docker:up
```

Open [http://localhost:3000](http://localhost:3000). Check [http://localhost:3000/api/health](http://localhost:3000/api/health) for `{ "ok": true }`.

- **Optional:** create a `.env` next to `docker-compose.yml` with `AUTH_SECRET`, `AUTH_URL`, and Google OAuth vars if you want real “Continue with Google” (redirect URI must include `http://localhost:3000/api/auth/callback/google`).
- **Default:** Compose supplies a **local-only** `AUTH_SECRET` if you skip `.env`, so Auth.js and demo login work without extra setup.
- **Stop:** `npm run docker:down` (or Ctrl+C if you ran compose in the foreground).
- **Port 3000 already in use** (e.g. `npm run dev` running): set `APP_PORT=3001` in `.env` or run  
  `set APP_PORT=3001` (PowerShell: `$env:APP_PORT=3001`) before `npm run docker:up`, then open that port and set `AUTH_URL` to match (e.g. `http://localhost:3001`) if you use Google OAuth.

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run lint` — ESLint  

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS v4 — see [QRField-Technical-Stack.md](../QRField-Technical-Stack.md) for the full MVP target stack, **economy** hosting bias, and the **Python + React + REST** alternate (if you pivot).
