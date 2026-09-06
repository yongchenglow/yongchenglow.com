# CLAUDE.md

Personal website at <https://www.yongchenglow.com>. Next.js App Router, React 19, TypeScript, Tailwind v4 with shadcn/ui, MDX blog. Bun is both the package manager and the runtime — use `bun` and `bunx` for every install, script, and one-off command.

## Gates

Before calling work done, run `bun run check:all` (tsc, then Biome check, then Knip) and `bun test`. Both must pass.

Scripts live in `package.json`; `bun run dev` and `bun run build` both regenerate the search index first.

## Layout

- `src/app/` — routes. `src/app/api/` — route handlers.
- `src/components/shared/{atoms,molecules,organisms}/` — atomic design; place a new shared component by how many other components it composes.
- `src/components/shared/ui/` — shadcn/ui primitives. Add these with the shadcn CLI rather than by hand.
- `src/components/blog/` — blog-specific components, outside the atomic tiers.
- `src/lib/` — data access and helpers. `src/config/` — tunable constants. `src/types/` — shared types.
- `content/` — all copy and posts as JSON and MDX. `test/` — tests, mirroring the `src/` path.

## Conventions

- Import named bindings from React: `import { useState } from "react"`.
- Import across directories with the `@/*` alias, which resolves from the repo root.
- TypeScript targets es2024. `strict` is off but `strictNullChecks` is on — null and undefined are tracked, while implicit `any` passes. `noUnusedLocals` is on, so a stray import or variable fails the build.
- Biome owns formatting and lint rules; run `bun run check` and take its output as authoritative rather than hand-formatting.
- Conventional commits, enforced by commitlint on every commit. Branches: `feature/<name>` or `hotfix/<name>`.

## Content is schema-validated

Everything under `content/` is parsed through a Zod schema in `src/content/schema.ts`. A missing or misshapen field is a loud build-time failure, by design — so when a build breaks on content, fix the content or the schema, never the component that consumed it.

Editing or adding a blog post: read `src/app/blog/CLAUDE.md` for the frontmatter contract, the slug rule, and how tags reach category pages.

Writing a test, or diagnosing one that fails or leaks state between cases: read `test/CLAUDE.md` — the runner is `bun:test` behind a Vitest-shaped shim, and the mocking API differs from what its call sites look like.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
