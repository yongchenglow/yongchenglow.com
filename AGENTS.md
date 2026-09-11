# Repository guide

This repository powers <https://www.yongchenglow.com>. It uses the Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and MDX.

Use Bun throughout, `bun` for the runtime and package scripts, and `bunx` for one-off package binaries. Keep `bun.lock` authoritative.

## Completion gates

Before calling work complete:

1. Run `bun run check:all`.
2. Run `bun test`.
3. Inspect the final diff and confirm it contains only intended changes.

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

## Content is schema-validated

Everything under `content/` is parsed through a Zod schema in `src/content/schema.ts`. Invalid content must fail loudly at build time. Fix the content when it violates the contract; change the schema only when the contract itself is changing.

Editing or adding a blog post: read `src/app/blog/AGENTS.md` for the frontmatter contract, slug rules, taxonomy, and search-index workflow.

Writing or debugging a test, read `test/AGENTS.md` for Bun test setup, the Vitest-shaped compatibility shim, module mocking, and cache isolation.
