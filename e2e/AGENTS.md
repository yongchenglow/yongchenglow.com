# End-to-end test guide

End-to-end tests run Playwright against the production build, served from `.next/standalone/server.js` on port 3100 exactly as the Docker image serves it. Setting `BASE_URL` targets a deployed site instead. Unit and component tests stay in `test/`; read `test/AGENTS.md` for those.

## Running

- `bun run e2e` is the fast host loop: it skips `@visual`. Run `bun run e2e:install` once after installing or upgrading Playwright.
- `bun run e2e:docker` runs the full suite in the Playwright Linux image CI uses. Run it before pushing a UI change.
- Outside CI, a server already listening on 3100 is reused. Keep `bun run build && PORT=3100 bun run e2e:serve` running in another terminal to skip the build on each run.
- `BASE_URL=https://… bun run e2e:smoke` runs the `@smoke` tests against a deployed review app or production.

## Writing a spec

- Name files `*.e2e.ts`. `bun test` collects `*.test.*` and `*.spec.*` across the repository, so Playwright specs need their own suffix.
- Import `test` and `expect` from `./fixtures`. The shared fixtures block third-party requests, emulate Cloudflare image transformations on a local server, and fail the test on any first-party console error or uncaught exception.
- Locate elements by role and accessible name. Needing a CSS selector usually means the markup lacks an accessible name, so fix the markup.
- Every spec runs in both `chromium-desktop` and `chromium-mobile`. Branch with the `isMobile` fixture and `test.skip` when a control exists on one viewport only.
- Tag read-only tests that are safe to run against production with `@smoke`.

## Visual snapshots

Chromium antialiases text differently on arm64 and x64, so each architecture keeps its own Linux baselines in `e2e/visual.e2e.ts-snapshots/`, suffixed `-arm64` or `-x64`. `bun run e2e` skips `@visual` because macOS renders fonts differently again. After an intended change to a captured page, including its post content, update both sets and look at every changed PNG before committing:

1. `bun run e2e:update` renders the host architecture's baselines in Docker. `e2e/docker.sh` pins the native platform, because an emulated browser renders nondeterministically.
2. Push the branch. The pull request's E2E job regenerates the x64 baselines and fails while any differ from the commit.
3. `bun run e2e:update:ci` downloads that run's x64 baselines. Commit and push them; the push re-runs the checks.

`e2e/run-in-container.sh` is the single entry point inside the Playwright image for both `e2e/docker.sh` and CI, and both derive the image tag from the installed `@playwright/test`, so upgrading the package upgrades the browsers everywhere. The container's `node_modules` and `.next` live in Docker volumes; `docker volume rm yongchenglow-e2e-node-modules yongchenglow-e2e-next` resets them.

## CI

`.github/workflows/e2e.yml` runs the full suite on every pull request and on `main`, gating the container build. After each review-app and production deploy it runs `@smoke` against the deployed URL. A failing production smoke run does not roll back; use the Production Rollback workflow.

## Accessibility

`accessibility.e2e.ts` runs axe on every sitemap page and fails on serious or critical WCAG 2.1 A/AA violations. `KNOWN_DEBT_RULES` holds rules that fail only because of the current colour tokens; shrink it as the tokens are fixed. Fix a new violation in the markup, keeping that list for colour-token debt alone.
