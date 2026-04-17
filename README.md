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
   4. [Categories and Tags](#categories-and-tags)
   5. [Search Index](#search-index)
   6. [Blog Features](#blog-features)
   7. [Home Page](#home-page)
   8. [About Page](#about-page)
5. [Git Conventions](#git-conventions)
   1. [Branching](#branching)
   2. [Commits](#commits)
   3. [Releases](#releases)
6. [VSCode Setup](#vscode-setup)
7. [Testing](#testing)
8. [Configuration Files](#configuration-files)
9. [License](#license)

## Tech Stack

| Category           | Technology                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Framework          | [Next.js 16](https://nextjs.org/) (App Router, standalone output)  |
| Language           | [TypeScript](https://www.typescriptlang.org/)                      |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com/)                        |
| UI Components      | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Animations         | [Framer Motion](https://www.framer.com/motion/)                    |
| Content            | [MDX](https://mdxjs.com/) via `@next/mdx`                          |
| Search             | [FlexSearch](https://github.com/nextapps-de/flexsearch)            |
| Linting/Formatting | [Biome 2](https://biomejs.dev/)                                    |
| Testing            | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Dead Code          | [Knip](https://knip.dev/)                                          |
| Git Hooks          | [Husky](https://typicode.github.io/husky/) + [commitlint](https://commitlint.js.org/) |
| Analytics          | Google Analytics, Google AdSense                                   |
| Icons              | [Lucide React](https://lucide.dev/)                                |

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
npm run dev                    # Start development server (generates search index first)
npm run build                  # Build for production (generates search index first)
npm start                      # Run production build
npm run generate-search-index  # Generate search index from blog posts
npm run lqip                   # Generate LQIP images for blog post images
npm run lint                   # Run Biome linting with auto-fix
npm run format                 # Run Biome formatting
npm run check                  # Run Biome linting and formatting with auto-fix
npm run check:all              # Run TypeScript, Biome, and Knip checks
npm run check:ci               # Run Biome checks for CI
npm test                       # Run tests with Vitest
npm run typecheck              # Run TypeScript type checking
npm run tsc                    # Alias for typecheck
npm run knip                   # Find unused files, dependencies, and exports
npm run knip:production        # Check production dependencies only
npm run analyze                # Analyze bundles with @next/bundle-analyzer (set ANALYZE=true)
npm run prepare                # Install Husky hooks
npm run release                # Run semantic-release for versioning and publishing
```

## Architecture

### Directory Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout (theme provider, search, analytics)
│   ├── globals.css             # Global styles and CSS variables
│   ├── about/
│   │   └── page.tsx            # About page (timeline from about.json)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing page
│   │   ├── [slug]/page.tsx     # Individual blog post (dynamic route)
│   │   ├── latest/[page]/      # Paginated all posts
│   │   ├── category/[category]/ # Posts filtered by category
│   │   ├── category/[category]/[page]/ # Paginated category posts
│   │   ├── tag/[tag]/          # Posts filtered by tag
│   │   ├── year/[year]/        # Posts filtered by year
│   │   └── year/[year]/[page]/ # Paginated year posts
│   ├── api/
│   │   └── blog/
│   │       ├── category/route.ts    # API endpoint for categories
│   │       ├── latest/route.ts      # API endpoint for latest posts
│   │       └── year/route.ts        # API endpoint for years
│   ├── og/route.tsx            # Open Graph image generation
│   ├── robots.ts               # Robots.txt configuration
│   └── sitemap.ts              # Sitemap configuration
├── components/
│   ├── shared/
│   │   ├── atoms/              # Smallest building blocks (Container, FadeIn, ExternalLink, ImageSkeleton, etc.)
│   │   ├── molecules/          # Combinations of atoms (Section)
│   │   ├── organisms/          # Complex components (NavigationBar, Footer, ContentCard)
│   │   ├── layouts/            # Layout components (StandardLayout)
│   │   └── ui/                 # shadcn/ui components (button, card, dialog, etc.)
│   ├── about/                  # About page components (Timeline, TimelineItem, TimelineItemRenderer)
│   ├── blog/                   # Blog components (Pagination, CategoryNavigation, InfiniteScroll, ReadingProgress, FilterPanel, FeaturedPostCard, etc.)
│   ├── home/                   # Home page sections (IntroSection, ProjectsSection, LatestPostsSection, AboutMeSection)
│   ├── mdx/                    # MDX component mappings (Admonition, MDXComponents, MDXImage)
│   ├── post/                   # Blog post display components (PostCard, PostHeader, PostImage, etc.)
│   ├── project/                # Project components (ProjectCard, ProjectGrid)
│   ├── search/                 # Search components (SearchDialog, SearchTrigger)
│   ├── seo/                    # SEO components (JsonLd)
│   └── theme/                  # Theme provider, toggle, and font configuration
├── hooks/
│   └── useSearch.ts            # Search hook for FlexSearch integration
├── lib/
│   ├── blog.ts                 # Blog utility functions (pagination, categories, years)
│   ├── animation.ts            # Animation helpers (stagger delays)
│   ├── lqip.ts                 # Low-quality image placeholders (LQIP) for blog post images
│   ├── text.tsx                # Text rendering utilities for MDX content
│   └── utils.ts                # General utilities (cn helper, image placeholders)
├── config/
│   ├── blog.ts                 # Blog configuration (categories, posts per page)
│   ├── blog-ui.ts              # Blog UI labels (loaded from blog-ui.json)
│   └── site.ts                 # Site metadata (URL, author, navigation, social links, ad slots)
└── types/
    ├── blog.ts                 # TypeScript types for blog
    └── search.ts               # TypeScript types for search

content/
├── blog/                       # MDX blog post files
├── authors/
│   └── yongchenglow.json       # Author metadata
├── about.json                  # About page content (timeline-based structure)
├── home.json                   # Home page content (intro, projects, about section)
├── blog-ui.json                # Blog UI labels (used by blog components)
└── schema.ts                   # Zod schemas for content validation

public/
├── img/                        # Images
└── search-index.json           # Auto-generated search index (do not edit)

scripts/
├── generate-search-index.mjs   # Search index generator (runs before dev/build)
└── generate-lqip.ts            # LQIP generator for blog post images

test/
├── setup.ts                    # Vitest test setup file
└── *.test.{ts,tsx}             # Test files
```

**Note:** Test files are located both in the `test/` directory and alongside source files (e.g., `src/components/shared/atoms/ImageSkeleton.test.tsx`, `src/lib/utils.test.ts`).

### Component Structure

Components follow the [Atomic Design](https://atomicdesign.bradfrost.com/) pattern:

- **Atoms** — single-purpose building blocks: `Container`, `FadeIn`, `ExternalLink`, `PageTitle`, `PageSubtitle`, `GoogleAds`, `InternalLink`, `ImageSkeleton`
- **Molecules** — combinations of atoms: `Section`
- **Organisms** — complex, self-contained components: `NavigationBar`, `Footer`, `ContentCard`
- **Layouts** — page layout wrappers: `StandardLayout`
- **UI** — shadcn/ui components (Radix UI primitives with Tailwind styling): `Button`, `Card`, `Dialog`, `Command`, `Avatar`, `Badge`, `Skeleton`, `Switch`, `Tooltip`, `Table`, `Sheet`, `NavigationMenu`, `ScrollArea`, `Separator`, `Input`, `Breadcrumb`, `Alert`

### Blog Posts

Blog posts are MDX files in `content/blog/`. Each file becomes a route at `/blog/[filename-without-extension]`.

#### Frontmatter

```yaml
---
title: "Your Post Title"          # Required
description: "Short description"  # Required - shown in post cards
date: "2025-04-04"                # Required - ISO 8601 format (YYYY-MM-DD)
author: "yongchenglow"            # Required - matches author file
lastUpdated: "2025-04-05"         # Optional - ISO 8601 format
tags: ["tag1", "tag2"]            # Optional - used for categorization
image: "/img/your-image.png"      # Optional - featured image
featured: false                   # Optional - highlights post on home page and blog page
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

- Standard HTML elements (`p`, `ul`, `ol`, `img`, `code`, `h1`-`h6`) are mapped to styled components
- `<Admonition>` — callout/notice block for important information
- `<PostDefinition>` — definition block for term explanations
- `<PostImage>` — enhanced image component for blog posts with modal support
- `<PostCodeBlock>` — syntax-highlighted code blocks with line numbers
- `<PostList>` — styled ordered and unordered lists
- Table components (`table`, `thead`, `tbody`, `tr`, `th`, `td`) — styled table elements
- Code blocks use `react-syntax-highlighter` for syntax highlighting with Prism themes
- `rehype-slug` and `rehype-autolink-headings` add anchor links to headings
- `remark-gfm` enables GitHub Flavored Markdown (tables, strikethrough, task lists, etc.)

### Categories and Tags

Blog categories are defined in `src/config/blog.ts`:

### Blog UI Labels

All blog-related UI text labels are centralized in `content/blog-ui.json` (single source of truth):

```json
{
  "blogTitle": "Blog",
  "featured": {
    "sectionHeading": "Featured Post",
    "pageHeading": "Featured Posts",
    "badge": "Featured"
  },
  "previousPosts": {
    "sectionHeading": "Previous Posts",
    "viewAllLink": "View All Posts →"
  },
  "categoryNavigation": {
    "heading": "Browse by Category"
  },
  "yearFilter": {
    "heading": "Browse by Year"
  },
  "pagination": {
    "showingText": "Showing {current} of {total} posts"
  }
}
```

To change any blog UI text, edit this file only. The config is loaded via `src/config/blog-ui.ts` and used across all blog components.

| Category       | Slug        | Tags                                                                 |
|----------------|-------------|----------------------------------------------------------------------|
| Development    | development | web-development, database, sql, postgresql, setup, ide, vscode       |
| Process & Agile| process     | agile, scrum, project-management, sprint-planning, product-management, teamwork |
| Design         | design      | design, ui-ux, prototyping, user-experience, design-thinking         |
| Career & Learning | career   | career, beginners, best-practices, normalization                     |

Posts are automatically categorized based on their tags.

### Search Index

The search functionality uses [FlexSearch](https://github.com/nextapps-de/flexsearch), a fully client-side full-text search library. The search index is generated by `scripts/generate-search-index.mjs` and written to `public/search-index.json`.

- **Algorithm:** FlexSearch Document-based index with multiple field indexing (title, subtitle, description, content, tags)
- **Triggers:** Runs automatically before `npm run dev` and `npm run build`
- **Input:** All non-draft MDX files in `content/blog/`
- **Output:** `public/search-index.json` — indexed by title, subtitle, description, content, and tags
- **Frontend:** The `SearchDialog` component (`Cmd+K`) lazy-loads the JSON and uses FlexSearch for client-side search
- **Do not edit** `public/search-index.json` manually — it is always overwritten on the next build

### Blog Features

- **Pagination:** Posts are paginated with 12 posts per page (`/blog/latest/[page]`)
- **Category Filtering:** Posts filtered by category tags (`/blog/category/[category]`)
- **Year Filtering:** Posts filtered by publication year (`/blog/year/[year]`)
- **Tag Filtering:** Posts filtered by individual tags (`/blog/tag/[tag]`)
- **Infinite Scroll:** Optional infinite scroll for blog listing pages
- **Reading Time:** Automatically calculated using `reading-time` package
- **Table of Contents:** Auto-generated from headings with scroll tracking
- **Reading Progress:** Progress bar at top of blog post pages
- **Previous/Next Navigation:** Auto-generated navigation between posts
- **Featured Post:** Highlighted on home page and top of blog listing
- **Image Modals:** Click-to-expand images in blog posts with modal view

### Home Page

**File:** `src/app/page.tsx`, `content/home.json`

The home page is composed of section components rendered in order within a `StandardLayout`:

1. **IntroSection** — hero with greeting, name, title, photo, and CTA buttons (Blog, About)
2. **LatestPostsSection** — displays the featured post (or most recent post if none featured)
3. **ProjectsSection** — projects showcase with grid layout
4. **GoogleAds** — ad placements for monetization
5. **AboutMeSection** — brief about snippet with link to full about page

Content is stored in `content/home.json` with the following structure:

```json
{
  "intro": {
    "greeting": "Hello, I'm",
    "name": "Your Name",
    "title": "Your title with company links",
    "companyLinks": [
      { "label": "Company", "url": "https://..." }
    ],
    "ctaButtons": [
      { "label": "Read My Blog", "href": "/blog", "variant": "default" },
      { "label": "About Me", "href": "/about", "variant": "outline" }
    ],
    "image": {
      "src": "/img/photo.jpg",
      "alt": "Your Name",
      "width": 400,
      "height": 400
    }
  },
  "projects": {
    "title": "Project Highlights",
    "items": [
      {
        "title": "Project Name",
        "description": "Description",
        "buttons": [
          { "text": "Website", "href": "https://..." },
          { "text": "Code", "href": "https://github.com/..." }
        ]
      }
    ]
  },
  "about": {
    "title": "Who am I?",
    "paragraphs": ["Bio text..."],
    "image": {
      "src": "/img/photo.jpg",
      "alt": "Your Name",
      "width": 400,
      "height": 400
    },
    "externalLinks": [
      { "label": "School/Company", "url": "https://..." }
    ],
    "internalLinks": [
      { "label": "about", "href": "/about" }
    ]
  }
}
```

To feature a blog post on the home page, set `featured: true` in its frontmatter. If no post is marked as featured, the most recent post is shown.

### About Page

**Files:** `src/app/about/page.tsx`, `content/about.json`

The about page renders a timeline of experience and education. All data is sourced from `content/about.json` — update that file to change the content displayed on the about page.

Structure of `about.json`:

```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    "objective": "Your objective/mission statement",
    "links": [
      { "label": "LinkedIn", "url": "https://linkedin.com/in/yourprofile" },
      { "label": "GitHub", "url": "https://github.com/yourusername" }
    ]
  },
  "timeline": [
    {
      "type": "work",
      "title": "Job Title at Company",
      "location": "City, Country",
      "years": "2023-Present",
      "bullets": ["Achievement 1", "Achievement 2"],
      "skills": ["Skill 1", "Skill 2"]
    },
    {
      "type": "education",
      "title": "Degree/Program",
      "location": "City, Country",
      "years": "2015-2019",
      "description": "Description of your studies",
      "link": { "label": "University Name", "url": "https://university.edu" }
    },
    {
      "type": "military",
      "title": "Service Branch",
      "years": "2012-2014",
      "location": "Country",
      "description": "Description of service",
      "link": { "label": "Unit Name", "url": "https://..." }
    }
  ]
}
```

## Git Conventions

### Branching

Feature branches: `feature/<branch_name>`

Hotfix branches: `hotfix/<branch_name>`

### Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) enforced by commitlint.

**Format:** `<type>: <subject>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`, `revert`

**Rules:**

- Subject must not be empty
- Type must not be empty
- Type can be lowercase or uppercase
- Subject can have any casing
- Header maximum 72 characters

**Examples:**

```
feat: add infinite scroll to blog listing
fix: resolve hydration mismatch in theme toggle
docs: update README with new architecture
refactor: extract pagination logic to utility
test: add unit tests for blog functions
chore: update dependencies
```

### Releases

Automated releases via `semantic-release` with GitLab integration. Run `npm run release` to publish.

## VSCode Setup

Install the recommended extensions inside the `.vscode/extensions.json` folder. The workspace settings are pre-configured in `.vscode/settings.json` and will be applied automatically.

Recommended extensions:

- ESLint (for Biome support)
- Tailwind CSS IntelliSense
- TypeScript Hero Import

## Testing

Tests are run using Vitest with JSDOM environment and React Testing Library.

```bash
npm test                 # Run all tests
npm test -- --watch      # Run tests in watch mode
npm test -- --coverage   # Run tests with coverage
```

Test files are located alongside source files with `.test.tsx` or `.test.ts` extension. Test setup is configured in `test/setup.ts`.

## Configuration Files

| File | Purpose |
|------|---------|
| `biome.json` | Biome linting and formatting configuration |
| `knip.json` | Knip dead code detection configuration |
| `commitlint.config.ts` | Commit message linting rules |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `vitest.config.ts` | Vitest test configuration |
| `.vscode/settings.json` | VSCode workspace settings |

## License

[GNU GENERAL PUBLIC LICENSE](./LICENSE)
