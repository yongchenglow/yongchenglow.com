# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Yong Cheng Low's personal website (<https://www.yongchenglow.com>), built with Next.js, React, TypeScript, and shadcn/ui with Tailwind CSS. The site features a blog with individual page-based routing and follows atomic design patterns for components.

## Essential Commands

**Development:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run prepare` - Setup development environment (run once after clone)

**Code Quality (always run after changes):**

- `npm run check` - Run Biome linting and formatting with auto-fix
- `npm test` - Run Vitest tests
- `npm run lint` - Run Biome linter only
- `npm run format` - Format code only
- `npm run knip` - Find unused files, dependencies, and exports
- `npm run knip:production` - Check production dependencies only

**Tools:**

- `npm run analyze` - Bundle analysis with webpack-bundle-analyzer

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

Uses `npm` - do not use pnpm or yarn commands.
