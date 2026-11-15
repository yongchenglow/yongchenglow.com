# Repository guide

This repository powers <https://www.yongchenglow.com>. It uses the Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and MDX. Content lives in files; there is no database.

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

`check:all` runs TypeScript, Biome, and Knip. `bun run check` applies Biome fixes and may rewrite files; `bun run lint` (`biome ci .`) only reports, and is what CI runs. Both `bun run dev` and `bun run build` regenerate the search index before starting Next.js.

Git hooks enforce part of this locally. Do not bypass them with `--no-verify`:

- `pre-commit`: gitleaks on staged changes, then Biome on staged files through lint-staged.
- `commit-msg`: commitlint.
- `pre-push`: `tsc`, `bun run lint`, `knip`, and `bun test`.

## Where to start

| Task                                                                        | Read first                                                         |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Add, rename, or remove a post, or change its frontmatter, tags, or images   | `src/app/blog/AGENTS.md`                                           |
| Write or edit a post's prose                                                | `content/blog/AGENTS.md`                                           |
| Change home, about, or author copy                                          | `content/*.json`, validated by `src/content/schema.ts`             |
| Change a page or feature                                                    | `docs/features.md`, which maps each feature to its source files    |
| Change a blog API route                                                     | `src/app/api/blog/` and `docs/api.md`                              |
| Change site metadata, navigation, categories, or ads                        | `src/config/`                                                      |
| Write or debug a unit or component test                                     | `test/AGENTS.md`: Bun setup, the `vi` shim, module mocking         |
| Write or debug an E2E test, upgrade dependencies, or change a captured page | `e2e/AGENTS.md`: commands, fixtures, snapshots, accessibility gate |
| Change CI, deployment, or the container                                     | `.github/workflows/`, `Dockerfile`, `helm/app/README.md`           |

## Layout

- `src/app/` — routes. `src/app/api/` — route handlers.
- `src/components/shared/{atoms,molecules,organisms,layouts}/` — reusable components organized by composition depth.
- `src/components/shared/ui/` — shadcn/ui primitives. Add these with the shadcn CLI rather than by hand.
- `src/components/<feature>/` — feature components such as `blog`, `home`, `about`, `mdx`, and `search`, outside the atomic tiers.
- `src/lib/` — data access and helpers; `src/lib/blog.ts` is the blog repository. `src/hooks/` — client hooks. `src/config/` — tunable constants. `src/types/` — shared types. `lib/utils.ts` — the shadcn `cn` helper.
- `content/` — site copy as JSON and posts as MDX. `public/search-index.json` is generated; never edit it by hand.
- `scripts/` — search-index and image tooling, run through package scripts.
- `test/` — tests mirroring the `src/` path. Put new tests here, although a few older ones sit beside their source.
- `e2e/` — Playwright specs, fixtures, and visual baselines.
- `.github/workflows/` — CI and deployment. Most jobs call reusable workflows from `yongchenglow/ci-workflows`; change shared behavior there rather than copying it here. Actions are pinned to commit SHAs with the version in a trailing comment; pin new ones the same way.
- `helm/app/` — the Kubernetes chart. `helm/app/templates/` holds Go templates, so Biome skips it.

## Conventions

- Import named bindings from React: `import { useState } from "react"`.
- Use the `@/*` alias for imports across directories; it resolves from the repository root.
- TypeScript targets ES2024. `strict` is off but `strictNullChecks` is on — null and undefined are tracked, while implicit `any` passes. `noUnusedLocals` is on, so a stray import or variable fails the build.
- Biome owns formatting and linting for TypeScript, JavaScript, JSON, CSS, Markdown, and YAML; let `bun run check` apply its authoritative output. Biome does not format `.mdx`.
- Use Conventional Commits with a lowercase subject and a header of at most 72 characters. Commitlint enforces the format. Name branches `feature/<name>` or `hotfix/<name>`.
- Agent instructions live in `AGENTS.md` files. Each `CLAUDE.md` is a symlink to the `AGENTS.md` beside it. Edit `AGENTS.md`, and add a new directory guide as an `AGENTS.md` plus a `CLAUDE.md` symlink.

## Subagents

Spawning a subagent: grade the delegated task's complexity first, then pick the model and reasoning effort from its bucket.

- **Low** — mechanical, bounded work such as locating code, renames, or one-file edits: Haiku at high effort, or Terra at low effort.
- **Medium** — multi-file changes or investigations that follow established patterns: Sonnet at medium effort, or Terra at medium effort.
- **High** — design decisions, cross-cutting refactors, hard debugging, or reviews where a miss is costly: Terra at high effort, or Opus at low effort.

## Content validation

`src/content/schema.ts` is the source of truth for home, about, author, and blog-frontmatter content. Invalid values in those inputs must fail loudly at build time. Fix the content when it violates the contract; change the schema only when the contract itself is changing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
