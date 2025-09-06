# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Yong Cheng Low's personal website (https://www.yongchenglow.com), built with Next.js, React, TypeScript, and Material-UI. The site features a blog with individual page-based routing and follows atomic design patterns for components.

## Essential Commands

**Development:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm start` - Run production build
- `pnpm prepare` - Setup development environment (run once after clone)

**Code Quality (always run after changes):**
- `pnpm check` - Run Biome linting and formatting with auto-fix
- `pnpm test` - Run Jest tests
- `pnpm lint` - Run Biome linter only
- `pnpm format` - Format code only

**Tools:**
- `pnpm storybook` - Run Storybook dev server (port 6006)
- `pnpm analyze` - Bundle analysis with webpack-bundle-analyzer

## Architecture

- **Pages:** `src/pages/` - Next.js file-based routing, individual blog posts as separate files
- **Components:** `src/components/atoms/` and `src/components/organisms/` - Atomic design pattern
- **Styling:** Material-UI with Emotion, custom theme in `src/theme.ts`
- **Fonts:** Custom font configuration in `src/font.ts`

## Code Standards

- **Linting/Formatting:** Biome (replaced ESLint/Prettier) - config in `biome.json`
- **Style:** Tab indentation, double quotes, organized imports
- **TypeScript:** ES2020 target, path mapping `@/*` to project root
- **Git:** Conventional commits, branch naming: `feature/<name>` or `hotfix/<name>`
- **Commit types:** feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert

## Package Manager

Uses `pnpm` exclusively - do not use npm or yarn commands.