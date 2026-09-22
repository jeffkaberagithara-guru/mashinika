# Mashinika — Automotive Platform

Kenya's roadside assistance & vehicle care platform. Request a rescue, get
dispatched to a vetted technician, and track the whole job live — from a
breakdown to a scheduled service.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**,
**shadcn/base-ui** components, **Zustand** for client state and
**Drizzle ORM** + **Supabase** for the data layer.

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
```

## Quality checks

Every check runs automatically in CI (see [CI/CD](#ci--cd)) and locally:

```bash
npm run lint          # ESLint
npm run format:check  # Prettier (run `npm run format` to fix)
npm run typecheck     # TypeScript, no emit
npm run test          # Vitest (add tests under src/**/*.test.ts(x))
npm run build         # Production build
```

## Publishing

Stage, commit and push everything in one safe command:

```bash
npm run publish -- "feat: add mobile navigation menu"
```

It runs `git add -A`, skips the commit if there is nothing to commit, then
commits with your message and pushes to the current branch's upstream.

## CI / CD

GitHub Actions workflows live in `.github/workflows/`:

- `ci.yml` — runs on every push and pull request: lint, format check,
  typecheck, tests and a production build.
- `deploy.yml` — runs on pushes to `main` and on version tags (`v*`). It
  builds the app and uploads the `.next` bundle as an artifact. Tagging a
  release also drafts a GitHub Release with the build attached:

  ```bash
  git tag v0.2.0 && git push origin v0.2.0
  ```

## Routes

| Route                            | Purpose                                       |
| -------------------------------- | --------------------------------------------- |
| `/`                              | Marketing home                                |
| `/services`                      | All services                                  |
| `/services/[slug]`               | Individual service detail                      |
| `/about`                         | Company / mission page                        |
| `/academy`                       | Training & certification                       |
| `/buy`                           | Buy-a-car marketplace                          |
| `/buy/[id]`                      | Individual car listing detail                  |
| `/care`                          | Routine care bookings                          |
| `/contact`                       | Contact / demo-labelled phone                  |
| `/customer`                      | "My dashboard" overview                        |
| `/customer/emergency`            | Emergency request form                         |
| `/customer/garage`               | Customer garage                              |
| `/fleet`                         | Fleet overview                                 |
| `/inspect`                       | Order an inspection                            |
| `/login`                         | Sign in                                        |
| `/request`                       | 3-step rescue request wizard                   |
| `/request/[id]`                  | Live tracking for a rescue request             |
| `/rescue`                        | Live rescue map                                |
| `/technician`                    | Become-a-technician landing                    |
| `/technician/console`            | Technician sign-in / dashboard                 |
| `/trade`                         | Sell / trade-in your car                       |
| `/admin`                         | Admin console                                  |
