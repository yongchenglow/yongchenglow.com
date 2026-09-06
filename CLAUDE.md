# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Yong Cheng Low's personal website (<https://www.yongchenglow.com>), built with Next.js, React, TypeScript, and shadcn/ui with Tailwind CSS. The site features a blog with individual page-based routing and follows atomic design patterns for components.

## Essential Commands

**Development:**

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun start` - Run production build
- `bun run prepare` - Setup development environment (run once after clone)

**Code Quality (always run after changes):**

- `bun run check` - Run Biome linting and formatting with auto-fix
- `bun test` - Run tests with the Bun test runner
- `bun run lint` - Run Biome linter only
- `bun run format` - Format code only
- `bun run knip` - Find unused files, dependencies, and exports
- `bun run knip:production` - Check production dependencies only

**Tools:**

- `bun run analyze` - Bundle analysis with webpack-bundle-analyzer

## Architecture

- **Pages:** `src/app/` - Next.js App Router with file-based routing, individual blog posts as separate files
- **Components:** `src/components/shared/atoms/`, `src/components/shared/molecules/`, and `src/components/shared/organisms/` - Atomic design pattern
- **UI Components:** `src/components/shared/ui/` - shadcn/ui components
- **Styling:** Tailwind CSS with shadcn/ui, custom theme via CSS variables in `globals.css`
- **Fonts:** Custom font configuration in `src/components/theme/font.ts`

## Code Standards

- **Linting/Formatting:** Biome (replaced ESLint/Prettier) - config in `biome.json`
- **Dead Code Detection:** Knip - config in `knip.json` - finds unused files, dependencies, and exports
- **Style:** Tab indentation, double quotes, organized imports
- **TypeScript:** ES2020 target, path mapping `@/*` to project root
- **Git:** Conventional commits, branch naming: `feature/<name>` or `hotfix/<name>`
- **Commit types:** feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert
- **Imports:** do not use import * as React from react instead import the variables separately.

## Package Manager

Uses `bun` (v1.4.2) as both package manager and runtime - do not use npm, pnpm, or yarn commands.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
