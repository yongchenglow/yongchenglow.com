# Features

This document lists all features available on the website, with their current implementation status.

## Feature Inventory

| Feature | Status | Description |
|---------|--------|-------------|
| Blog Posts | Stable | MDX-based blog posts with frontmatter (title, subtitle, description, date, lastUpdated, author, tags, image, draft, featured, adsSlotId) |
| Pagination | Stable | Numbered pages with ellipsis, previous/next buttons. Configurable posts per page (default: 12) |
| Infinite Scroll | Stable | Toggleable alternative to pagination for loading more posts dynamically |
| Search | Stable | Full-text search using FlexSearch, triggered via Cmd/Ctrl+K keyboard shortcut, searches title/subtitle/description/content/tags |
| Category Filtering | Stable | Filter posts by categories: Development, Process & Agile, Design, Career & Learning |
| Year Filtering | Stable | Filter posts by publication year (descending order) |
| Tag Pages | Stable | Dedicated pages for each tag showing all posts with that tag |
| Theme Toggle | Stable | Dark/light mode switch with next-themes, persisted to localStorage |
| Reading Progress | Stable | Progress bar on blog posts with emoji status updates that change as user reads |
| Table of Contents | Stable | Auto-generated from h2/h3 headings, shown inline on mobile, sidebar on desktop with active heading tracking |
| Blog Post Navigation | Stable | Previous/next post links at bottom of blog posts |
| Featured Post | Stable | Highlighted featured post on blog homepage, auto-selected from frontmatter or newest |
| OG Image Generation | Stable | Dynamic OG images (1200x630) for blog posts with title, tags, and author avatar |
| SEO Metadata | Stable | Per-page metadata, OpenGraph, Twitter cards support |
| JSON-LD Structured Data | Stable | Article and BreadcrumbList schemas for blog posts, Person schema for about page |
| Sitemap | Stable | Auto-generated XML sitemap including all posts, paginated pages, categories, years, and tags |
| Robots.txt | Stable | SEO robots file allowing all except /api/ |
| About Page | Stable | Timeline-based about page with career history, education, skills, and social links |
| Home Page | Stable | Landing page with intro, latest posts section, projects section, and about section |
| Projects Section | Stable | Project highlights with title, description, and external links |
| Image Modal | Stable | Click-to-zoom image viewer with blur placeholder and image credit support |
| MDX Components | Stable | Custom MDX rendering: Admonitions (note/tip/warning/danger), Code blocks with syntax highlighting, Definitions, custom Paragraph/Image/List components |
| Google Ads | Stable | Ad integration via Radix UI Dialog with configurable slot IDs per page |
| Responsive Design | Stable | Mobile-first responsive layouts using Tailwind CSS |
| Fade-in Animations | Stable | Staggered fade-in animations using Framer Motion for content sections |
| Breadcrumbs | Stable | Navigation breadcrumbs on blog, category, year, and tag pages |
| Reading Time | Stable | Estimated reading time calculated from post content |
| Syntax Highlighting | Stable | Code blocks with syntax highlighting using react-syntax-highlighter |
| Back Navigation | Stable | Back button on blog posts to return to previous page |
| Post Grid Layout | Stable | Responsive grid layout for blog post cards (1/2/4 columns on mobile/tablet/desktop) |
| LQIP (Low Quality Image Placeholder) | Stable | Blur placeholder images while loading using blurhash-style technique |
| Static Generation | Stable | Static site generation for all blog posts and paginated pages |

## Configuration

- **Posts per page**: 12 (configurable in `src/config/blog.ts`)
- **Categories**: Development, Process & Agile, Design, Career & Learning
- **Ad slots**: homeTop, homeBottom, about, blog

## Dependencies Used

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **MDX**: @next/mdx, next-mdx-remote, remark-gfm, rehype-slug, rehype-autolink-headings
- **Search**: FlexSearch for full-text search
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Icons**: lucide-react
- **Content**: gray-matter for frontmatter, reading-time for reading estimation
