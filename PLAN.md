# Blog Migration Plan: TSX to MDX with Docusaurus-Inspired Features

## Executive Summary

This plan outlines the migration of the current blog from hand-coded TSX components to a standardized MDX-based system inspired by Docusaurus, while maintaining the shadcn/ui design system and Next.js App Router architecture.

**Current State:**

- 6 blog posts as individual TSX files (`/src/app/blog/[1-6]/page.tsx`)
- Hard-coded content within React components
- Manual metadata management in separate listing components
- No markdown support or content separation from presentation

**Target State:**

- MDX-based blog posts in `/content/blog/` directory
- Frontmatter-based metadata (YAML)
- Dynamic rendering with standardized templates
- Docusaurus-inspired features (TOC, reading time, tags, search)
- shadcn/ui components available in MDX
- Automated blog index generation

---

## Phase 1: Foundation & Tooling Setup

### 1.1 Install Required Dependencies

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter reading-time remark remark-gfm rehype-slug rehype-autolink-headings
npm install -D @types/mdx
```

**Packages Explained:**

- `@next/mdx` - Next.js MDX integration
- `gray-matter` - Parse frontmatter from markdown files
- `reading-time` - Calculate reading time from content
- `remark-gfm` - GitHub Flavored Markdown support (tables, task lists, etc.)
- `rehype-slug` - Add IDs to headings for anchor links
- `rehype-autolink-headings` - Auto-generate heading anchor links

### 1.2 Create Content Directory Structure

```
/content/
  /blog/
    journey-to-the-web.mdx
    join-the-scrum.mdx
    its-story-time.mdx
    single-source-of-truth.mdx
    blog-post-5.mdx
    setting-up-your-project.mdx
  /authors/
    yongchenglow.json
```

### 1.3 Configure MDX in Next.js

**File:** `next.config.mjs`

```javascript
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // ... existing config
})
```

### 1.4 Create TypeScript Types

**File:** `src/types/blog.ts`

```typescript
export interface BlogFrontmatter {
  title: string;
  subtitle?: string;
  description: string;
  date: string; // ISO 8601 format
  lastUpdated?: string;
  author: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
  featured?: boolean;
  adsSlotId?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
  excerpt?: string;
}
```

---

## Phase 2: Content Migration

### 2.1 Frontmatter Schema (Docusaurus-Inspired)

**Standard Frontmatter Template:**

```yaml
---
title: "Journey to the Web"
subtitle: "The beginnings of a Software Engineer"
description: "A comprehensive introduction to my journey as a software engineer"
date: "2022-01-15"
lastUpdated: "2022-01-15"
author: "yongchenglow"
tags: ["career", "web-development", "beginners"]
image: "/blog/journey-web-cover.jpg"
draft: false
featured: false
adsSlotId: "9667543473"
---
```

**Frontmatter Fields Explained:**

- `title` - Main heading (required)
- `subtitle` - Subheading displayed below title
- `description` - Meta description for SEO and listing cards
- `date` - Original publication date (ISO 8601)
- `lastUpdated` - Last modification date
- `author` - Author identifier (links to `/content/authors/`)
- `tags` - Categorization and filtering
- `image` - Cover image for social sharing and cards
- `draft` - Hide from production if true
- `featured` - Display in "New Articles" section
- `adsSlotId` - Google Ads slot ID for this post

### 2.2 Convert TSX Posts to MDX

**Migration Mapping:**

| Current TSX | New MDX Filename | Slug |
|-------------|------------------|------|
| `/src/app/blog/1/page.tsx` | `journey-to-the-web.mdx` | `journey-to-the-web` |
| `/src/app/blog/2/page.tsx` | `join-the-scrum.mdx` | `join-the-scrum` |
| `/src/app/blog/3/page.tsx` | `its-story-time.mdx` | `its-story-time` |
| `/src/app/blog/4/page.tsx` | `single-source-of-truth.mdx` | `single-source-of-truth` |
| `/src/app/blog/5/page.tsx` | `blog-post-5.mdx` | `blog-post-5` |
| `/src/app/blog/6/page.tsx` | `setting-up-your-project.mdx` | `setting-up-your-project` |

**Example Migration - Blog Post 1:**

**Before (TSX):**

```tsx
<ArticleParagraph>
  Hello there! My name is Yong Cheng Low...
</ArticleParagraph>
```

**After (MDX):**

```mdx
---
title: "Journey to the Web"
subtitle: "The beginnings of a Software Engineer"
description: "My journey into software engineering and web development"
date: "2022-01-15"
author: "yongchenglow"
tags: ["career", "beginners"]
featured: true
---

Hello there! My name is Yong Cheng Low...

## Early Beginnings

I started my journey...

<ArticleDefinition>
**Key Takeaway:** Software engineering is a continuous learning journey.
</ArticleDefinition>
```

### 2.3 Component Usage in MDX

MDX allows importing and using React components directly:

```mdx
import { Alert, AlertDescription } from "@/src/components/shared/ui/alert"

## Important Note

<Alert>
  <AlertDescription>
    This is an important callout using shadcn/ui Alert component!
  </AlertDescription>
</Alert>

Regular markdown content continues here...
```

**Available Components in MDX:**

- All existing `Article*` components (ArticleDefinition, ArticleCodeBlock, etc.)
- All shadcn/ui components (Alert, Card, Table, etc.)
- Custom components created specifically for MDX content

---

## Phase 3: Utility Functions & Data Layer

### 3.1 Create Blog Utilities

**File:** `src/lib/blog.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogFrontmatter } from '@/src/types/blog';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content/blog');

export function getAllBlogSlugs(): string[] {
  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.mdx?$/, ''));
}

export function getBlogPost(slug: string): BlogPost {
  const fullPath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;

  // Calculate reading time
  const { text: readingTimeText } = readingTime(content);

  // Extract excerpt (first paragraph)
  const excerpt = content.split('\n\n')[0].substring(0, 200);

  return {
    slug,
    frontmatter,
    content,
    readingTime: readingTimeText,
    excerpt,
  };
}

export function getAllBlogPosts(includesDrafts = false): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map(slug => getBlogPost(slug))
    .filter(post => includesDrafts || !post.frontmatter.draft)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.frontmatter.date).getTime() -
             new Date(a.frontmatter.date).getTime();
    });

  return posts;
}

export function getFeaturedPost(): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.frontmatter.featured) || posts[0] || null;
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post =>
    post.frontmatter.tags?.includes(tag)
  );
}
```

### 3.2 Create MDX Components Provider

**File:** `src/components/mdx/MDXComponents.tsx`

```typescript
import type { MDXComponents } from 'mdx/types';
import ArticleParagraph from '@/src/components/article/ArticleParagraph';
import ArticleCodeBlock from '@/src/components/article/ArticleCodeBlock';
import ArticleList from '@/src/components/article/ArticleList';
import ArticleImage from '@/src/components/article/ArticleImage';
import ArticleDefinition from '@/src/components/article/ArticleDefinition';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/src/components/shared/ui/table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map HTML elements to custom components
    p: ArticleParagraph,
    ul: (props) => <ArticleList type="unordered" {...props} />,
    ol: (props) => <ArticleList type="ordered" {...props} />,
    img: ArticleImage,
    code: ArticleCodeBlock,

    // Table components
    table: Table,
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,

    // Custom components
    ArticleDefinition,
    ArticleCodeBlock,

    // Allow overrides
    ...components,
  };
}
```

**File:** `mdx-components.tsx` (root level - required by Next.js)

```typescript
import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getComponents } from '@/src/components/mdx/MDXComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getComponents(components);
}
```

---

## Phase 4: Dynamic Blog Routes

### 4.1 Update Blog Index Page

**File:** `src/app/blog/page.tsx`

```tsx
"use client";

import { getAllBlogPosts, getFeaturedPost } from '@/src/lib/blog';
import ArticleCard from '@/src/components/article/ArticleCard';
import ArticleGrid from '@/src/components/article/ArticleGrid';
import GoogleAds from '@/src/components/shared/atoms/GoogleAds';
import PageSubtitle from '@/src/components/shared/atoms/PageSubtitle';
import PageTitle from '@/src/components/shared/atoms/PageTitle';
import StandardLayout from '@/src/components/shared/layouts/StandardLayout';

export default function BlogPage() {
  // These would be fetched server-side in production
  const featuredPost = getFeaturedPost();
  const allPosts = getAllBlogPosts();
  const previousPosts = allPosts.slice(1); // All except featured

  return (
    <StandardLayout>
      <div className="py-3 text-center">
        <PageTitle>Blog</PageTitle>
        <PageSubtitle>
          Welcome to my blog! Hope you will enjoy my tech articles and learn something!
        </PageSubtitle>

        {/* Featured Article Section */}
        {featuredPost && (
          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Latest Article</h2>
            <ArticleCard
              title={featuredPost.frontmatter.title}
              description={featuredPost.frontmatter.description}
              href={`/blog/${featuredPost.slug}`}
              readingTime={featuredPost.readingTime}
              date={featuredPost.frontmatter.date}
            />
          </section>
        )}

        {/* Previous Articles Grid */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Previous Articles</h2>
          <ArticleGrid>
            {previousPosts.map(post => (
              <ArticleCard
                key={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                href={`/blog/${post.slug}`}
                readingTime={post.readingTime}
                date={post.frontmatter.date}
              />
            ))}
          </ArticleGrid>
        </section>

        <GoogleAds slotId="9667543473" />
      </div>
    </StandardLayout>
  );
}
```

### 4.2 Create Dynamic Blog Post Route

**File:** `src/app/blog/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogPost } from '@/src/lib/blog';
import BlogPostLayout from '@/src/components/blog/BlogPostLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.lastUpdated,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  let post;

  try {
    post = getBlogPost(params.slug);
  } catch {
    notFound();
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    },
  };

  return (
    <BlogPostLayout post={post}>
      <MDXRemote
        source={post.content}
        options={mdxOptions}
      />
    </BlogPostLayout>
  );
}
```

### 4.3 Create Blog Post Layout Component

**File:** `src/components/blog/BlogPostLayout.tsx`

```tsx
"use client";

import { BlogPost } from '@/src/types/blog';
import StandardLayout from '@/src/components/shared/layouts/StandardLayout';
import ArticleContainer from '@/src/components/article/ArticleContainer';
import ArticleHeader from '@/src/components/article/ArticleHeader';
import ArticleMetadata from '@/src/components/article/ArticleMetadata';
import GoogleAds from '@/src/components/shared/atoms/GoogleAds';
import TableOfContents from '@/src/components/blog/TableOfContents';
import { Badge } from '@/src/components/shared/ui/badge';

interface BlogPostLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export default function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const { frontmatter, readingTime } = post;

  return (
    <StandardLayout>
      <ArticleContainer>
        {/* Header Section */}
        <ArticleHeader
          title={frontmatter.title}
          subtitle={frontmatter.subtitle}
        />

        {/* Metadata Bar */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-6">
          <ArticleMetadata>
            Published: {new Date(frontmatter.date).toLocaleDateString()}
          </ArticleMetadata>
          {frontmatter.lastUpdated && (
            <ArticleMetadata>
              Updated: {new Date(frontmatter.lastUpdated).toLocaleDateString()}
            </ArticleMetadata>
          )}
          <ArticleMetadata>{readingTime}</ArticleMetadata>
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {frontmatter.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents />

        {/* Main Content */}
        <article className="prose dark:prose-invert max-w-4xl mx-auto">
          {children}
        </article>

        {/* Google Ads */}
        {frontmatter.adsSlotId && (
          <GoogleAds slotId={frontmatter.adsSlotId} />
        )}
      </ArticleContainer>
    </StandardLayout>
  );
}
```

---

## Phase 5: Docusaurus-Inspired Features

### 5.1 Table of Contents (TOC)

**File:** `src/components/blog/TableOfContents.tsx`

```tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/shared/ui/card';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract all h2 and h3 headings from the page
    const elements = document.querySelectorAll('article h2, article h3');
    const items: TocItem[] = Array.from(elements).map((elem) => ({
      id: elem.id,
      text: elem.textContent || '',
      level: parseInt(elem.tagName.substring(1)),
    }));
    setHeadings(items);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <Card className="mb-8 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="text-left">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`hover:text-primary transition-colors ${
                    activeId === heading.id ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
```

### 5.2 Reading Progress Bar

**File:** `src/components/blog/ReadingProgress.tsx`

```tsx
"use client";

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div
        className="h-full bg-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

### 5.3 Blog Post Navigation (Previous/Next)

**File:** `src/components/blog/BlogNavigation.tsx`

```tsx
import { BlogPost } from '@/src/types/blog';
import { Button } from '@/src/components/shared/ui/button';
import InternalLink from '@/src/components/shared/atoms/InternalLink';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogNavigationProps {
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export default function BlogNavigation({ previousPost, nextPost }: BlogNavigationProps) {
  return (
    <nav className="flex justify-between items-center my-8 gap-4">
      <div className="flex-1">
        {previousPost && (
          <InternalLink href={`/blog/${previousPost.slug}`}>
            <Button variant="outline" className="w-full justify-start">
              <ChevronLeft className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-semibold truncate">{previousPost.frontmatter.title}</div>
              </div>
            </Button>
          </InternalLink>
        )}
      </div>

      <div className="flex-1 text-right">
        {nextPost && (
          <InternalLink href={`/blog/${nextPost.slug}`}>
            <Button variant="outline" className="w-full justify-end">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-semibold truncate">{nextPost.frontmatter.title}</div>
              </div>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </InternalLink>
        )}
      </div>
    </nav>
  );
}
```

**Update:** `src/lib/blog.ts` - Add navigation helper:

```typescript
export function getBlogPostNavigation(currentSlug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}
```

### 5.4 Tag-Based Filtering

**File:** `src/app/blog/tag/[tag]/page.tsx`

```tsx
import { getAllBlogPosts, getBlogPostsByTag } from '@/src/lib/blog';
import ArticleCard from '@/src/components/article/ArticleCard';
import ArticleGrid from '@/src/components/article/ArticleGrid';
import StandardLayout from '@/src/components/shared/layouts/StandardLayout';
import PageTitle from '@/src/components/shared/atoms/PageTitle';
import PageSubtitle from '@/src/components/shared/atoms/PageSubtitle';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();

  posts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).map(tag => ({ tag }));
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getBlogPostsByTag(params.tag);

  return (
    <StandardLayout>
      <div className="py-3 text-center">
        <PageTitle>Tag: {params.tag}</PageTitle>
        <PageSubtitle>
          {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with "{params.tag}"
        </PageSubtitle>

        <ArticleGrid>
          {posts.map(post => (
            <ArticleCard
              key={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              href={`/blog/${post.slug}`}
              readingTime={post.readingTime}
              date={post.frontmatter.date}
            />
          ))}
        </ArticleGrid>
      </div>
    </StandardLayout>
  );
}
```

---

## Phase 6: Enhanced Components

### 6.1 Update ArticleCard Component

**File:** `src/components/article/ArticleCard.tsx`

Add support for reading time, date, and tags:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/shared/ui/card';
import { Badge } from '@/src/components/shared/ui/badge';
import InternalLink from '@/src/components/shared/atoms/InternalLink';
import { Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  description: string;
  href: string;
  readingTime?: string;
  date?: string;
  tags?: string[];
}

export default function ArticleCard({
  title,
  description,
  href,
  readingTime,
  date,
  tags,
}: ArticleCardProps) {
  return (
    <InternalLink href={href} className="no-underline">
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Metadata */}
          <div className="flex gap-4 text-sm text-muted-foreground mb-3">
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(date).toLocaleDateString()}
              </div>
            )}
            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime}
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </InternalLink>
  );
}
```

### 6.2 Create Admonition Component (Docusaurus-style)

**File:** `src/components/mdx/Admonition.tsx`

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/src/components/shared/ui/alert';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AdmonitionProps {
  type?: 'note' | 'tip' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const admonitionConfig = {
  note: {
    icon: Info,
    className: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
  },
  tip: {
    icon: CheckCircle,
    className: 'border-green-500 bg-green-50 dark:bg-green-950',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  },
  danger: {
    icon: XCircle,
    className: 'border-red-500 bg-red-50 dark:bg-red-950',
  },
};

export default function Admonition({ type = 'note', title, children }: AdmonitionProps) {
  const config = admonitionConfig[type];
  const Icon = config.icon;

  return (
    <Alert className={`my-4 ${config.className}`}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
```

**Usage in MDX:**

```mdx
<Admonition type="warning" title="Important">
  Make sure to backup your data before proceeding.
</Admonition>

<Admonition type="tip">
  Pro tip: Use keyboard shortcuts to speed up your workflow!
</Admonition>
```

---

## Phase 7: Testing & Validation

### 7.1 Migration Checklist

For each blog post:

- [ ] Convert TSX content to MDX format
- [ ] Add complete frontmatter metadata
- [ ] Test all embedded components render correctly
- [ ] Verify code blocks with syntax highlighting
- [ ] Check image paths and optimize images
- [ ] Test links (internal and external)
- [ ] Verify reading time calculation
- [ ] Test table of contents generation
- [ ] Check mobile responsiveness
- [ ] Validate SEO metadata generation
- [ ] Test tag filtering
- [ ] Verify Google Ads integration

### 7.2 Quality Assurance

```bash
# Build production site
npm run build

# Check for build errors
npm run lint

# Find unused components
npm run knip

# Test in production mode
npm start
```

### 7.3 A/B Testing Plan

Before full migration:

1. Migrate 1-2 blog posts as pilot
2. Test side-by-side with existing TSX version
3. Validate SEO impact (meta tags, Open Graph)
4. Test performance (bundle size, load times)
5. Verify analytics tracking still works
6. Get user feedback on new layout

---

## Phase 8: Cleanup & Optimization

### 8.1 Remove Legacy Code

After successful migration:

```bash
# Remove old blog post TSX files
rm -rf src/app/blog/1
rm -rf src/app/blog/2
rm -rf src/app/blog/3
rm -rf src/app/blog/4
rm -rf src/app/blog/5
rm -rf src/app/blog/6

# Remove hard-coded listing components
rm src/components/blog/NewArticlesSection.tsx
rm src/components/blog/PreviousArticlesSection.tsx
```

### 8.2 Optimize Bundle Size

```bash
# Analyze bundle
npm run analyze

# Check for unused dependencies
npm run knip:production
```

### 8.3 Update Documentation

- [ ] Update README with new blog structure
- [ ] Document frontmatter schema
- [ ] Create content authoring guide
- [ ] Add MDX component examples
- [ ] Document deployment process

---

## Phase 9: Future Enhancements

### 9.1 Search Functionality

Integrate search with options:

- **Algolia DocSearch** (Docusaurus default)
- **FlexSearch** (client-side)
- **Pagefind** (static site search)

### 9.2 RSS Feed Generation

**File:** `src/app/blog/feed.xml/route.ts`

```typescript
import { getAllBlogPosts } from '@/src/lib/blog';
import RSS from 'rss';

export async function GET() {
  const posts = getAllBlogPosts();

  const feed = new RSS({
    title: 'Yong Cheng Low Blog',
    description: 'Tech articles and tutorials',
    site_url: 'https://www.yongchenglow.com',
    feed_url: 'https://www.yongchenglow.com/blog/feed.xml',
  });

  posts.forEach(post => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `https://www.yongchenglow.com/blog/${post.slug}`,
      date: post.frontmatter.date,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

### 9.3 Comment System Integration

Options:

- **Giscus** (GitHub Discussions)
- **Utterances** (GitHub Issues)
- **Disqus**

### 9.4 Series/Collections

Group related posts into series:

```yaml
---
title: "Setting up your Project - Part 1"
series:
  name: "Complete Guide to Project Setup"
  order: 1
---
```

### 9.5 Code Playground Integration

Embed interactive code examples:

- **CodeSandbox**
- **StackBlitz**
- **CodePen**

---

## Migration Timeline

### Week 1: Foundation

- [ ] Install dependencies
- [ ] Configure MDX and Next.js
- [ ] Create utility functions
- [ ] Set up TypeScript types

### Week 2: Content Migration

- [ ] Convert 2 pilot blog posts to MDX
- [ ] Test rendering and components
- [ ] Iterate on frontmatter schema
- [ ] Build dynamic routes

### Week 3: Features

- [ ] Implement Table of Contents
- [ ] Add reading progress bar
- [ ] Create blog navigation
- [ ] Build tag filtering
- [ ] Update ArticleCard component

### Week 4: Complete Migration

- [ ] Convert remaining blog posts
- [ ] Full testing suite
- [ ] SEO validation
- [ ] Performance optimization
- [ ] Deploy to production

### Week 5: Cleanup & Enhancement

- [ ] Remove legacy code
- [ ] Documentation updates
- [ ] RSS feed generation
- [ ] Search integration (future)

---

## Key Benefits of MDX Migration

### For Content Authors

✅ Write in familiar Markdown syntax
✅ Embed React components inline
✅ Separate content from presentation logic
✅ Version control-friendly text format
✅ Easy metadata management with frontmatter

### For Developers

✅ Standardized blog post structure
✅ Type-safe frontmatter with TypeScript
✅ Automatic route generation
✅ Reusable components across posts
✅ Better code organization

### For Users

✅ Faster page loads (static generation)
✅ Consistent reading experience
✅ Better SEO with proper metadata
✅ Table of contents for long posts
✅ Reading progress indicator
✅ Tag-based content discovery

### For Maintenance

✅ Easier to add new posts (just add .mdx file)
✅ No code changes for new content
✅ Automated blog index generation
✅ Centralized styling via MDX components
✅ Simplified testing and validation

---

## Resources & References

### Documentation

- [Next.js MDX Documentation](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Docusaurus Markdown Features](https://docusaurus.io/docs/markdown-features)
- [MDX Official Documentation](https://mdxjs.com/)
- [Gray Matter](https://github.com/jonschlinkert/gray-matter)

### Example Implementations

- [Next.js MDX Blog - All Shadcn](https://allshadcn.com/templates/nextjs-mdx/)
- [Taxonomy - shadcn Blog Guide](https://tx.shadcn.com/guides/build-blog-using-contentlayer-mdx)
- [Next.js Velite Blog Template](https://github.com/jolbol1/nextjs-velite-blog-template)

### Tools & Libraries

- **MDX Compilation:** `@next/mdx`, `@mdx-js/react`
- **Frontmatter Parsing:** `gray-matter`
- **Reading Time:** `reading-time`
- **Markdown Plugins:** `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- **Component Library:** shadcn/ui with Tailwind CSS

---

## Risk Mitigation

### SEO Impact

- **Risk:** URL structure changes breaking existing links
- **Mitigation:** Implement 301 redirects from old URLs (`/blog/1` → `/blog/journey-to-the-web`)

### Content Loss

- **Risk:** Migration errors losing content
- **Mitigation:**
  - Keep original TSX files until full validation
  - Git version control for all changes
  - Side-by-side comparison testing

### Performance Regression

- **Risk:** Slower page loads with MDX processing
- **Mitigation:**
  - Static generation at build time
  - Bundle analysis before/after
  - Lighthouse performance testing

### Component Breaking Changes

- **Risk:** Existing components not working in MDX
- **Mitigation:**
  - Pilot migration with 2 posts first
  - Component compatibility testing
  - Fallback to HTML if needed

---

## Success Metrics

- [ ] All 6 blog posts successfully migrated to MDX
- [ ] Zero SEO ranking drops (monitor for 2 weeks)
- [ ] Page load time < 2 seconds (Lighthouse)
- [ ] No console errors or warnings
- [ ] Bundle size increase < 50KB
- [ ] 100% mobile responsive
- [ ] All existing features preserved (ads, navigation, images)
- [ ] New features working (TOC, reading time, tags)

---

## Conclusion

This migration plan transforms the blog from manually-coded TSX components to a Docusaurus-inspired MDX system that:

1. **Separates content from code** - Authors write markdown, not React components
2. **Automates blog management** - Dynamic routes, automated indexes, reading times
3. **Enhances user experience** - TOC, progress bars, better navigation, tag filtering
4. **Improves maintainability** - Standardized structure, type safety, easier testing
5. **Preserves existing design** - All shadcn/ui components and styling maintained

The phased approach ensures a safe, tested migration with minimal risk to the existing production site.
