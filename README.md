# Yong Cheng Low's Website

Visit the website at [https://www.yongchenglow.com](https://www.yongchenglow.com)

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Running the Application](#running-the-application)
3. [Application Commands](#application-commands)
4. [Architecture](#architecture)
   1. [Directory Structure](#directory-structure)
   2. [Component Structure](#component-structure)
   3. [Blog Posts](#blog-posts)
   4. [Search Index](#search-index)
   5. [Home Page](#home-page)
   6. [About Page](#about-page)
5. [Git Conventions](#git-conventions)
   1. [Branching](#branching)
   2. [Commits](#commits)
6. [VSCode Setup](#vscode-setup)
7. [License](#license)

## Tech Stack

| Category       | Technology                                                         |
| -------------- | ------------------------------------------------------------------ |
| Framework      | [Next.js](https://nextjs.org/) (App Router, standalone output)     |
| Language       | [TypeScript](https://www.typescriptlang.org/)                      |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)                        |
| UI Components  | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Animations     | [Framer Motion](https://www.framer.com/motion/)                    |
| Content        | [MDX](https://mdxjs.com/) via `@next/mdx`                          |
| Search         | [FlexSearch](https://github.com/nextapps-de/flexsearch)            |
| Linting        | [Biome](https://biomejs.dev/)                                      |
| Testing        | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Dead Code      | [Knip](https://knip.dev/)                                          |
| Git Hooks      | [Husky](https://typicode.github.io/husky/) + [commitlint](https://commitlint.js.org/) |

## Running the Application

In order to run the application please clone or download the repository

### For Development

1. npm install
2. npm run prepare (Only for development setup)
3. npm run dev

### For Production

1. npm install
2. npm run build
3. npm start

## Application Commands

```bash
npm run dev              # For development
npm run build            # To build the application
npm start                # To run the built application
npm run lint             # To check Biome linting
npm run format           # To format code with Biome
npm run check            # To run Biome linting and formatting with auto-fix
npm run check:all        # To run TypeScript, Biome, and Knip checks
npm test                 # To run tests
npm run typecheck        # To run TypeScript type checking
npm run knip             # To find unused files, dependencies, and exports
npm run knip:production  # To check production dependencies only
npm run analyze          # To analyze the packages
npm run prepare          # To prepare the application (husky setup)
```

## Architecture

### Directory Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout (navbar, search, analytics)
│   ├── globals.css             # Global styles and CSS variables
│   ├── about/
│   │   └── page.tsx            # About page
│   └── blog/
│       ├── page.tsx            # Blog listing page
│       ├── [slug]/page.tsx     # Individual blog post (dynamic route)
│       ├── latest/[page]/      # Paginated all posts
│       ├── category/[category] # Posts filtered by category
│       ├── tag/[tag]/          # Posts filtered by tag
│       ├── year/[year]/        # Posts filtered by year
│       └── api/                # API routes for categories, latest, years
├── components/
│   ├── shared/
│   │   ├── atoms/              # Smallest building blocks
│   │   ├── molecules/          # Combinations of atoms
│   │   ├── organisms/          # Complex components (navbar, footer)
│   │   └── ui/                 # shadcn/ui components
│   ├── blog/                   # Blog-specific components
│   ├── home/                   # Home page sections
│   ├── about/                  # About page components
│   ├── mdx/                    # MDX element mappings
│   ├── post/                   # Post display components
│   ├── search/                 # Search dialog and trigger
│   └── theme/                  # Theme provider and toggle
├── lib/
│   └── blog.ts                 # Blog utility functions
├── data/
│   └── about.json              # About page data (experience, education)
├── config/
│   └── blog.ts                 # Blog categories configuration
└── types/
    └── blog.ts                 # TypeScript types for blog

content/
└── blog/                       # MDX blog post files

public/
├── img/                        # Images
└── search-index.json           # Auto-generated search index (do not edit)

scripts/
└── generate-search-index.mjs   # Search index generator
```

### Component Structure

Components follow the [Atomic Design](https://atomicdesign.bradfrost.com/) pattern:

- **Atoms** — single-purpose building blocks: `Container`, `FadeIn`, `ExternalLink`, `PageTitle`, etc.
- **Molecules** — combinations of atoms: `Section`
- **Organisms** — complex, self-contained components: `NavigationBar`, `Footer`, `ContentCard`
- **UI** — shadcn/ui components (Radix UI primitives with Tailwind styling)

### Blog Posts

Blog posts are MDX files in `content/blog/`. Each file becomes a route at `/blog/[filename-without-extension]`.

#### Frontmatter

```yaml
---
title: "Your Post Title"          # Required
description: "Short description"  # Required - shown in post cards
date: "2025-04-04"                # Required - ISO 8601 format
author: "yongchenglow"            # Required
subtitle: "Optional subtitle"     # Optional
lastUpdated: "2025-04-05"         # Optional - ISO 8601 format
tags: ["tag1", "tag2"]            # Optional
image: "/img/your-image.png"      # Optional - featured image
featured: false                   # Optional - highlights post on home page
draft: false                      # Optional - skips post in builds if true
---
```

#### Adding a New Blog Post

1. Create `content/blog/your-slug.mdx`
2. Add frontmatter (see above)
3. Write content using Markdown or MDX
4. Run `npm run dev` — the search index regenerates automatically
5. The post is accessible at `/blog/your-slug`

The post is automatically added to:

- Blog listing and pagination
- Search index
- Category, tag, and year filter pages
- Previous/next post navigation

#### MDX Components

Custom components available in MDX content (defined in `src/components/mdx/MDXComponents.tsx`):

- Standard HTML elements (`p`, `ul`, `ol`, `img`, `code`) are mapped to styled components
- `<Admonition>` — callout/notice block
- `<PostDefinition>` — definition block
- Code blocks use `react-syntax-highlighter` for syntax highlighting
- `rehype-slug` and `rehype-autolink-headings` add anchor links to headings
- `remark-gfm` enables GitHub Flavored Markdown (tables, strikethrough, etc.)

### Search Index

The search index is generated by `scripts/generate-search-index.mjs` and written to `public/search-index.json`.

- **Triggers:** Runs automatically before `npm run dev` and `npm run build`
- **Input:** All non-draft MDX files in `content/blog/`
- **Output:** `public/search-index.json` — indexed by title, subtitle, description, content, and tags
- **Frontend:** The `SearchDialog` component lazy-loads the JSON and uses FlexSearch when the search dialog opens (`Cmd+K`)
- **Do not edit** `public/search-index.json` manually — it is always overwritten on the next build

### Home Page

**File:** `src/app/page.tsx`

The home page is composed of section components rendered in order:

1. `IntroSection` — hero with name, description, photo, and CTA buttons
2. `LatestPostsSection` — displays the post marked `featured: true` (or the most recent post)
3. `ProjectsSection` — projects showcase
4. `AboutMeSection` — brief about snippet

To feature a blog post on the home page, set `featured: true` in its frontmatter.

### About Page

**Files:** `src/app/about/page.tsx`, `src/data/about.json`

The about page renders a timeline of experience and education. All data is sourced from `src/data/about.json` — update that file to change the content displayed on the about page.

Structure of `about.json`:

```json
{
  "hero": { "name", "title", "objective", "socialLinks" },
  "work_experience": [{ "title", "location", "years", "bullets", "skills" }],
  "education": [{ "title", "location", "years", "description", "links" }],
  "military_service": [{ ... }]
}
```

## Git Conventions

### Branching

feature/<branch_name>

hotfix/<branch_name>

### Commits

Refer to [commitlint.config.ts](./commitlint.config.ts) for prefixes. We will be using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## VSCode Setup

Install the recommended extensions inside the .vscode folder. The workspace settings are pre-configured in `.vscode/settings.json` and will be applied automatically.

## License

[GNU GENERAL PUBLIC LICENSE](./LICENSE)
