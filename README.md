# YC Directory

This repository is a Next.js 16 + TypeScript application built as a startups directory. It uses Sanity as a headless CMS, Auth Js for authentication, and Sentry for optional error tracking. The app includes a set of reusable UI components and utilities to demonstrate a real-world integration of these technologies.

## Tech stack

- Next.js 16 (app router)
- React 19 (overridden in `package.json`)
- TypeScript
- Sanity (headless CMS) with generated TypeScript types
- Auth Js for authentication
- Sentry for error/error-trace reporting
- Tailwind CSS + styled-components for styling

## Prerequisites

- Node.js (recommend Node 20.x or the latest LTS that matches Next 16 requirements). 
- npm (package.json expects npm; the project uses npm@10+ in metadata)
- (Optional) Sanity CLI for working locally with Sanity datasets: `npm i -g @sanity/cli`

## Clone and install

```bash
git clone https://github.com/NebiyouBelaineh/yc_directory_next_16
cd yc_directory
npm install
```

## Local environment variables

Create a `.env.local` file in the project root. Example variables required to run the app locally are shown below in `.env.example` format. Some entries are required for full functionality; others are optional.

## .env.example

```text
# Auth Js
AUTH_TRUST_HOST=http://localhost:3000
AUTH_SECRET=change_me_to_a_secure_value
AUTH_GITHUB_ID=respective_oAuth_providerID/Secret
AUTH_GITHUB_SECRET=respective_oAuth_providerID/Secret
AUTH_GOOGLE_ID=respective_oAuth_providerID/Secret
AUTH_GOOGLE_SECRET=respective_oAuth_providerID/Secret

# Sanity (adjust names if your code uses different env keys)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

SANITY_WRITE_TOKEN=your_sanity_token_for_writes_or_previewing

# Sentry (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token

```


## Sanity setup and type generation

1. If using a remote Sanity project, ensure `NEXT_PUBLIC_SANITY_PROJECT_ID`, and `NEXT_PUBLIC_SANITY_DATASET` are set and the token is valid for any write/preview actions the app performs.
2. If working with a local Sanity dataset or starting a new studio, use the Sanity CLI to login and deploy/seed data as needed.
3. Run the type generation step to produce TypeScript definitions used by the app:

```bash
npm run typegen
```

This populates `sanity/extract.json` and runs Sanity's type generation to keep types in sync with the schema.

Run the app (development)

```bash
npm run dev
# then open http://localhost:3000
```

Build and run (production)

```bash
npm run build
npm start
```

### Available npm scripts (from `package.json`)

- `dev` — starts Next.js in development mode (uses turbopack in this project)
- `build` — builds the Next.js app for production (`--no-mangling` flag present)
- `start` — starts the production server
- `typegen` — extracts Sanity schema and generates TypeScript types
- `lint` — run ESLint

### Folder layout and what to inspect

- `app/` — main Next.js app router. Pages, route handlers, and API endpoints live here. Check `app/api/auth/[...nextauth]/route.ts` for Auth Js configuration.
- `components/` — reusable UI components. `components/ui` contains small primitives (avatar, button, input, textarea, skeleton).
- `lib/` — shared utility functions, actions, and validation helpers.
- `sanity/` — Sanity configuration and schema definitions. `sanity/schemaTypes` contains content models (startup, author, playlist, etc.). `sanity/lib` contains the Sanity client and helpers.
- `public/` — static assets served by Next.js.
- `types/` — TypeScript declaration augmentations (for example, Auth Js types).

### Authentication (Auth Js)

Auth Js is integrated via the route under `app/api/auth/[...nextauth]/route.ts`. To enable provider-based login, configure provider client IDs and secrets via environment variables (for example `GITHUB_ID` and `GITHUB_SECRET`) and set `NEXTAUTH_URL` and `NEXTAUTH_SECRET`.

## Sentry

Sentry can be installed and configured using the `sentry-cli`.  Sentry is optional for local development. Please refer to the following link [Sentry Docs.](https://docs.sentry.io/cli/)

## Troubleshooting and common issues

- Sanity type errors: run `npm run typegen` to regenerate types after changing schema files.
- Authentication issues: verify `AUTH_TRUST_URL` and `AUTH_SECRET`. Ensure provider client IDs/secrets and callback URLs are configured correctly in the provider dashboard.
- Build or dependency mismatches: note `package.json` contains overrides pinning React and Next versions (React 19, Next 16). When adding dependencies, verify compatibility.
- If ports conflict or the app doesn't start, ensure nothing else is using port 3000 or set `PORT` environment variable.

## Quick file pointers

- `package.json` — scripts and dependencies (Next 16, React 19 override, Sanity, Auth Js, Sentry)
- `next.config.ts` — Next.js configuration
- `app/api/auth/[...nextauth]/route.ts` — Auth Js route handler and provider config
- `sanity/schemaTypes/*` — Sanity content types


## License and acknowledgements

This project is covered under MIT License. Check `LICENSE.md`.
