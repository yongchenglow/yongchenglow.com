# Repository guide

This repository powers <https://www.yongchenglow.com>. It uses the Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and MDX.

Use Bun throughout, `bun` for the runtime and package scripts, and `bunx` for one-off package binaries. Keep `bun.lock` authoritative.

## Completion and pull request gates

Before opening a pull request, pushing updates to it, or calling work complete, run these gates on the final changes using the Bun version pinned in `package.json`:

1. `bun run check:all` exits successfully.
2. `bun test` reports zero failures.
3. For application code, content, dependency, build configuration, or E2E changes, `bun run e2e:docker` reports zero failures. This includes the sitemap accessibility scan, browser flows, and visual snapshots. Documentation-only changes may skip this gate. Read `e2e/AGENTS.md` before running it or updating snapshots.
4. After staging the intended changes, `gitleaks git --pre-commit --staged --redact --no-banner` reports no leaks.
5. `git diff --check` and `git diff --cached --check` exit successfully with no output.
6. The final diff contains only intended changes, including any rewrites from checks.

Dependency upgrades must pass the browser gate even when no application source changed: updated UI libraries, browsers, and axe can expose accessibility regressions that unit tests do not catch. Fix blocking accessibility findings in the markup and review intended snapshot changes using `e2e/AGENTS.md`.

If a required gate cannot run, report the command and blocker and keep the PR in draft until the missing validation passes. In the PR body, distinguish local results from CI results and identify any pending checks.

`check:all` runs TypeScript, Biome, and Knip. Biome may rewrite files. Both `bun run dev` and `bun run build` regenerate the search index before starting Next.js.

## Layout

- `src/app/` — routes. `src/app/api/` — route handlers.
- `src/components/shared/{atoms,molecules,organisms}/` — reusable components organized by composition depth.
- `src/components/shared/ui/` — shadcn/ui primitives. Add these with the shadcn CLI rather than by hand.
- `src/components/blog/` — blog-specific components, outside the atomic tiers.
- `src/lib/` — data access and helpers. `src/config/` — tunable constants. `src/types/` — shared types.
- `content/` — site copy and posts as JSON and MDX.
- `test/` — tests mirroring the `src/` path.

## Conventions

- Import named bindings from React: `import { useState } from "react"`.
- Use the `@/*` alias for imports across directories; it resolves from the repository root.
- TypeScript targets ES2024. `strict` is off but `strictNullChecks` is on — null and undefined are tracked, while implicit `any` passes. `noUnusedLocals` is on, so a stray import or variable fails the build.
- Biome owns formatting and linting; let `bun run check` apply its authoritative output.
- Use Conventional Commits. Commitlint enforces the format. Name branches `feature/<name>` or `hotfix/<name>`.

## Content validation

`src/content/schema.ts` is the source of truth for home, about, author, and blog-frontmatter content. Invalid values in those inputs must fail loudly at build time. Fix the content when it violates the contract; change the schema only when the contract itself is changing.

Adding, editing, renaming, or removing a blog post: read `src/app/blog/AGENTS.md` for the frontmatter contract, slug rules, taxonomy, and search-index workflow.

Writing or debugging a test, read `test/AGENTS.md` for Bun test setup, the Vitest-shaped compatibility shim, module mocking, and cache isolation.

Running, writing, or debugging an end-to-end test, upgrading dependencies, or changing a page that visual snapshots capture: read `e2e/AGENTS.md` for the Playwright commands, fixtures, snapshot workflow, and accessibility gate.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
