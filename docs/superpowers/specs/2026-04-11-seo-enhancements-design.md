# SEO Enhancements Design

**Date:** 2026-04-11
**Project:** yongchenglow.com (Next.js personal site)
**Approach:** Incremental — sitemap/robots → canonical URLs → JSON-LD → dynamic OG images

---

## 1. Sitemap + Robots.txt

### Sitemap (`src/app/sitemap.ts`)

Next.js App Router native `MetadataRoute.Sitemap` export. No additional packages.

**Included URLs and priorities:**

| URL pattern | Priority | Change frequency |
|---|---|---|
| `/` | 1.0 | weekly |
| `/about` | 0.8 | monthly |
| `/blog` | 0.9 | daily |
| `/blog/[slug]` (all posts) | 0.7 | monthly (lastModified = `lastUpdated` ?? `date`) |
| `/blog/latest/[page]` | 0.5 | weekly |
| `/blog/category/[category]/[page]` | 0.5 | weekly |
| `/blog/tag/[tag]` | 0.5 | weekly |
| `/blog/year/[year]/[page]` | 0.5 | weekly |

Blog slugs are sourced from `getAllBlogSlugs()`. Category/tag/year/page params are sourced from the same `generateStaticParams` helpers already used in those pages.

### Robots.txt (`src/app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.yongchenglow.com/sitemap.xml
```

---

## 2. Canonical URLs

Added via `alternates.canonical` in each page's `metadata` or `generateMetadata` return value. Each page is canonical to itself (no consolidation to page 1 for paginated series).

**Pages and their canonical values:**

| Page | Canonical |
|---|---|
| `/` | `https://www.yongchenglow.com` |
| `/about` | `https://www.yongchenglow.com/about` |
| `/blog` | `https://www.yongchenglow.com/blog` |
| `/blog/[slug]` | `https://www.yongchenglow.com/blog/${slug}` |
| `/blog/latest/[page]` | `https://www.yongchenglow.com/blog/latest/${page}` |
| `/blog/category/[category]/[page]` | `https://www.yongchenglow.com/blog/category/${category}/${page}` |
| `/blog/tag/[tag]` | `https://www.yongchenglow.com/blog/tag/${tag}` |
| `/blog/year/[year]/[page]` | `https://www.yongchenglow.com/blog/year/${year}/${page}` |

The `metadataBase` in `layout.tsx` (`https://www.yongchenglow.com`) means relative paths are sufficient for canonical values — no need to hardcode the full domain in every file.

---

## 3. JSON-LD Structured Data

### Shared Component

**`src/components/seo/JsonLd.tsx`** — a thin wrapper that renders a `<script type="application/ld+json">` tag. Accepts a `data` prop of type `Record<string, unknown>` and uses `JSON.stringify` with sanitization to prevent XSS.

```tsx
// Usage
<JsonLd data={{ "@context": "https://schema.org", ... }} />
```

### Article Schema (Blog Post Pages)

Added directly in `src/app/blog/[slug]/page.tsx` JSX (not in metadata — JSON-LD must be in the page body).

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<post title>",
  "description": "<post description>",
  "datePublished": "<frontmatter.date>",
  "dateModified": "<frontmatter.lastUpdated ?? frontmatter.date>",
  "url": "https://www.yongchenglow.com/blog/<slug>",
  "image": "<post image ?? /img/yong-cheng-metasprint.jpeg>",
  "author": {
    "@type": "Person",
    "name": "Yong Cheng Low",
    "url": "https://www.yongchenglow.com/about"
  },
  "publisher": {
    "@type": "Person",
    "name": "Yong Cheng Low",
    "url": "https://www.yongchenglow.com"
  }
}
```

### Person Schema (About Page)

Added in `src/app/about/page.tsx` JSX. Data sourced from `about.json` hero section.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yong Cheng Low",
  "url": "https://www.yongchenglow.com",
  "jobTitle": "<about.hero.title>",
  "image": "https://www.yongchenglow.com/img/yong-cheng-metasprint.jpeg",
  "sameAs": ["<about.hero.links[].url>", ...]
}
```

### BreadcrumbList Schema

Added to blog post, category, tag, year, and latest pages. Rendered as JSON-LD only — no visible UI change.

**Blog post example:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.yongchenglow.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.yongchenglow.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "<post title>", "item": "https://www.yongchenglow.com/blog/<slug>" }
  ]
}
```

**Category page example** (3rd item = category label, optional 4th = "Page N" if page > 1).

---

## 4. Dynamic OG Images

### Route Handler (`src/app/og/route.tsx`)

Uses `next/og` (`ImageResponse`) — bundled with Next.js, no new packages.

**Query parameters:**
- `title` — post title (required)
- `tags` — comma-separated tag list (optional)

**Image spec:**
- Size: 1200×630px
- Background: dark gradient (`#0f172a` → `#1e293b`, matching site dark theme)
- Left side: avatar image (`/img/yong-cheng-metasprint.jpeg`), 120×120px, circular
- Right side (stacked vertically):
  - Post title — large white text, max 2 lines, truncated
  - Tags — small muted text (slate-400), comma-separated, single line
  - `yongchenglow.com` — bottom right, small slate-500 text

### Integration with Blog Post Metadata

In `src/app/blog/[slug]/page.tsx` `generateMetadata`:

- If post has `frontmatter.image`: use that image for OG (existing behaviour, no change)
- If post has **no** `frontmatter.image`: use `/og?title=<encoded title>&tags=<encoded tags>` as the OG image

```ts
const ogImage = post.frontmatter.image
  ?? `/og?title=${encodeURIComponent(post.frontmatter.title)}&tags=${encodeURIComponent((post.frontmatter.tags ?? []).join(','))}`;
```

Both `openGraph.images` and `twitter.images` are updated.

### Twitter Card Upgrade

Blog posts with a generated OG image will use `twitter.card: "summary_large_image"` instead of the root default `"summary"`, to make the image display prominently on Twitter/X.

---

## Files to Create

| File | Purpose |
|---|---|
| `src/app/sitemap.ts` | Sitemap generation |
| `src/app/robots.ts` | Robots.txt |
| `src/components/seo/JsonLd.tsx` | Reusable JSON-LD script component |
| `src/app/og/route.tsx` | Dynamic OG image route handler |

## Files to Modify

| File | Change |
|---|---|
| `src/app/layout.tsx` | Add canonical for home page |
| `src/app/about/page.tsx` | Add canonical + Person JSON-LD |
| `src/app/blog/page.tsx` | Add canonical |
| `src/app/blog/[slug]/page.tsx` | Add canonical, Article JSON-LD, BreadcrumbList JSON-LD, dynamic OG image |
| `src/app/blog/tag/[tag]/page.tsx` | Add canonical, BreadcrumbList JSON-LD |
| `src/app/blog/category/[category]/[page]/page.tsx` | Add canonical, BreadcrumbList JSON-LD |
| `src/app/blog/year/[year]/[page]/page.tsx` | Add canonical, BreadcrumbList JSON-LD |
| `src/app/blog/latest/[page]/page.tsx` | Add canonical, BreadcrumbList JSON-LD |

---

## Out of Scope

- Visible breadcrumb UI component (JSON-LD only)
- Sitemap index files (single sitemap is sufficient for this site's size)
- hreflang tags (site is English-only)
- AMP pages
