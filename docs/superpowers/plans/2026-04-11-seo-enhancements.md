# SEO Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add sitemap, robots.txt, canonical URLs, JSON-LD structured data, and dynamic branded OG images to yongchenglow.com.

**Architecture:** Four independent layers implemented in order: (1) sitemap + robots for crawlability, (2) canonical URLs via Next.js metadata API, (3) JSON-LD via a shared `<JsonLd>` component injected into page JSX, (4) dynamic OG image generation via a Next.js route handler at `/og`.

**Tech Stack:** Next.js App Router (native sitemap/robots/metadata APIs), `next/og` (`ImageResponse`) for OG images, schema.org JSON-LD, Vitest for tests.

---

## File Map

**Create:**

- `src/app/sitemap.ts` — generates full sitemap
- `src/app/robots.ts` — robots.txt rules
- `src/components/seo/JsonLd.tsx` — shared `<script type="application/ld+json">` component
- `src/app/og/route.tsx` — dynamic OG image route handler

**Modify:**

- `src/app/layout.tsx` — add canonical for home
- `src/app/about/page.tsx` — add canonical + Person JSON-LD
- `src/app/blog/page.tsx` — add canonical
- `src/app/blog/[slug]/page.tsx` — add canonical, dynamic OG image, Article + BreadcrumbList JSON-LD
- `src/app/blog/tag/[tag]/page.tsx` — add canonical + BreadcrumbList JSON-LD
- `src/app/blog/category/[category]/[page]/page.tsx` — add canonical + BreadcrumbList JSON-LD
- `src/app/blog/year/[year]/[page]/page.tsx` — add canonical + BreadcrumbList JSON-LD
- `src/app/blog/latest/[page]/page.tsx` — add canonical + BreadcrumbList JSON-LD

---

## Task 1: Sitemap + Robots.txt

**Files:**

- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Write the sitemap test**

Create `src/__tests__/sitemap.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import sitemap from "@/src/app/sitemap";

describe("sitemap", () => {
  it("includes the home page with priority 1.0", async () => {
    const entries = await sitemap();
    const home = entries.find((e) => e.url === "https://www.yongchenglow.com");
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);
    expect(home?.changeFrequency).toBe("weekly");
  });

  it("includes /about with priority 0.8", async () => {
    const entries = await sitemap();
    const about = entries.find(
      (e) => e.url === "https://www.yongchenglow.com/about"
    );
    expect(about).toBeDefined();
    expect(about?.priority).toBe(0.8);
    expect(about?.changeFrequency).toBe("monthly");
  });

  it("includes /blog with priority 0.9", async () => {
    const entries = await sitemap();
    const blog = entries.find(
      (e) => e.url === "https://www.yongchenglow.com/blog"
    );
    expect(blog).toBeDefined();
    expect(blog?.priority).toBe(0.9);
    expect(blog?.changeFrequency).toBe("daily");
  });

  it("includes blog post URLs with priority 0.7", async () => {
    const entries = await sitemap();
    const posts = entries.filter((e) =>
      e.url.startsWith("https://www.yongchenglow.com/blog/") &&
      !e.url.includes("/latest/") &&
      !e.url.includes("/category/") &&
      !e.url.includes("/tag/") &&
      !e.url.includes("/year/")
    );
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.priority).toBe(0.7);
      expect(post.changeFrequency).toBe("monthly");
      expect(post.lastModified).toBeDefined();
    }
  });

  it("includes paginated listing pages with priority 0.5", async () => {
    const entries = await sitemap();
    const listingPages = entries.filter(
      (e) =>
        e.url.includes("/latest/") ||
        e.url.includes("/category/") ||
        e.url.includes("/tag/") ||
        e.url.includes("/year/")
    );
    expect(listingPages.length).toBeGreaterThan(0);
    for (const page of listingPages) {
      expect(page.priority).toBe(0.5);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/__tests__/sitemap.test.ts
```

Expected: FAIL — `src/app/sitemap.ts` does not exist.

- [ ] **Step 3: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getAllCategories,
  getAllPostYears,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  getBlogPostsByYear,
  getPaginatedPosts,
  getPaginatedPostsByCategory,
  getPaginatedPostsByYear,
} from "@/src/lib/blog";
import { BLOG_CONFIG } from "@/src/config/blog";

const BASE_URL = "https://www.yongchenglow.com";

const sitemap = (): MetadataRoute.Sitemap => {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  entries.push(
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 }
  );

  // Blog posts
  const posts = getAllBlogPosts();
  for (const post of posts) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.lastUpdated ?? post.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Latest paginated pages
  const totalLatestPages = Math.ceil(posts.length / BLOG_CONFIG.postsPerPage);
  for (let i = 1; i <= totalLatestPages; i++) {
    entries.push({
      url: `${BASE_URL}/blog/latest/${i}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  // Category paginated pages
  const categories = getAllCategories();
  for (const category of categories) {
    const categoryPosts = getBlogPostsByCategory(category.slug);
    const totalCategoryPages = Math.ceil(categoryPosts.length / BLOG_CONFIG.postsPerPage);
    for (let i = 1; i <= totalCategoryPages; i++) {
      entries.push({
        url: `${BASE_URL}/blog/category/${category.slug}/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  // Tag pages
  const allTagsSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      allTagsSet.add(tag);
    }
  }
  for (const tag of allTagsSet) {
    entries.push({
      url: `${BASE_URL}/blog/tag/${tag}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  // Year paginated pages
  const years = getAllPostYears();
  for (const year of years) {
    const yearPosts = getBlogPostsByYear(year);
    const totalYearPages = Math.ceil(yearPosts.length / BLOG_CONFIG.postsPerPage);
    for (let i = 1; i <= totalYearPages; i++) {
      entries.push({
        url: `${BASE_URL}/blog/year/${year}/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  return entries;
};

export default sitemap;
```

- [ ] **Step 4: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: "/api/",
  },
  sitemap: "https://www.yongchenglow.com/sitemap.xml",
});

export default robots;
```

- [ ] **Step 5: Run the tests**

```bash
npm test -- src/__tests__/sitemap.test.ts
```

Expected: All 5 tests PASS.

- [ ] **Step 6: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/__tests__/sitemap.test.ts
git commit -m "feat: add sitemap and robots.txt"
```

---

## Task 2: Canonical URLs

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/blog/tag/[tag]/page.tsx`
- Modify: `src/app/blog/category/[category]/[page]/page.tsx`
- Modify: `src/app/blog/year/[year]/[page]/page.tsx`
- Modify: `src/app/blog/latest/[page]/page.tsx`

Add `alternates: { canonical: '<relative-url>' }` to each page's metadata. Because `metadataBase` is already set to `https://www.yongchenglow.com` in `layout.tsx`, relative paths work fine everywhere.

- [ ] **Step 1: Add canonical to `src/app/layout.tsx`**

In the `metadata` export object, add `alternates` after `icons`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://www.yongchenglow.com"),
  title: {
    default: "Yong Cheng Low (YC)",
    template: "%s | YC",
  },
  description:
    "Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
  keywords:
    "Yong Cheng Low, YC, Glints, Le Wagon, NUS, Tech, Computing, Computer Enginering, Blog, NUS Students' Sports Club",
  authors: [{ name: "Yong Cheng Low" }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.yongchenglow.com",
    title: "Yong Cheng Low (YC)",
    description:
      "Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
    images: [
      {
        url: "/img/yong-cheng-metasprint.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Yong Cheng Low (YC)",
    description:
      "Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
    images: ["/img/yong-cheng-metasprint.jpeg"],
  },
  icons: {
    icon: "/img/YongCheng.jpg",
  },
};
```

- [ ] **Step 2: Add canonical to `src/app/about/page.tsx`**

Update the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "/about",
  },
};
```

- [ ] **Step 3: Add canonical to `src/app/blog/page.tsx`**

Update the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: "/blog",
  },
};
```

- [ ] **Step 4: Add canonical to `src/app/blog/[slug]/page.tsx`**

In `generateMetadata`, add `alternates` to the returned object:

```ts
export const generateMetadata = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  try {
    const post = getBlogPost(slug);

    if (!post) {
      return { title: "Post Not Found" };
    }

    const ogImage =
      post.frontmatter.image ??
      `/og?title=${encodeURIComponent(post.frontmatter.title)}&tags=${encodeURIComponent((post.frontmatter.tags ?? []).join(","))}`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        modifiedTime: post.frontmatter.lastUpdated,
        images: [ogImage],
      },
      twitter: {
        card: post.frontmatter.image ? "summary" : "summary_large_image",
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
};
```

- [ ] **Step 5: Add canonical to `src/app/blog/tag/[tag]/page.tsx`**

Update the existing `generateMetadata`:

```ts
export const generateMetadata = async ({ params }: TagPageProps) => {
  const { tag } = await params;
  return {
    title: `Tag: ${tag}`,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
  };
};
```

- [ ] **Step 6: Add canonical to `src/app/blog/category/[category]/[page]/page.tsx`**

Update the existing `generateMetadata`:

```ts
export const generateMetadata = async ({ params }: CategoryPageProps) => {
  const { category, page } = await params;
  const categoryMetadata = getCategoryMetadata(category);
  const label = categoryMetadata?.label ?? category;
  return {
    title: `${label} - Page ${page}`,
    alternates: {
      canonical: `/blog/category/${category}/${page}`,
    },
  };
};
```

- [ ] **Step 7: Add canonical to `src/app/blog/year/[year]/[page]/page.tsx`**

Update the existing `generateMetadata`:

```ts
export const generateMetadata = async ({ params }: YearPageProps) => {
  const { year, page } = await params;
  return {
    title: `Posts from ${year} - Page ${page}`,
    alternates: {
      canonical: `/blog/year/${year}/${page}`,
    },
  };
};
```

- [ ] **Step 8: Add canonical to `src/app/blog/latest/[page]/page.tsx`**

Update the existing `generateMetadata`:

```ts
export const generateMetadata = async ({ params }: LatestPageProps) => {
  const { page } = await params;
  return {
    title: `Featured Posts - Page ${page}`,
    alternates: {
      canonical: `/blog/latest/${page}`,
    },
  };
};
```

- [ ] **Step 9: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 10: Commit**

```bash
git add src/app/layout.tsx src/app/about/page.tsx src/app/blog/page.tsx \
  "src/app/blog/[slug]/page.tsx" "src/app/blog/tag/[tag]/page.tsx" \
  "src/app/blog/category/[category]/[page]/page.tsx" \
  "src/app/blog/year/[year]/[page]/page.tsx" \
  src/app/blog/latest/[page]/page.tsx
git commit -m "feat: add canonical URLs to all pages"
```

---

## Task 3: JsonLd Component

**Files:**

- Create: `src/components/seo/JsonLd.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/JsonLd.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/src/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with type application/ld+json", () => {
    const data = { "@context": "https://schema.org", "@type": "Article", "headline": "Test" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("serializes the data as JSON", () => {
    const data = { "@context": "https://schema.org", "@type": "Person", "name": "Yong Cheng Low" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector("script");
    expect(script?.innerHTML).toBe(JSON.stringify(data));
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/__tests__/JsonLd.test.tsx
```

Expected: FAIL — `src/components/seo/JsonLd.tsx` does not exist.

- [ ] **Step 3: Create `src/components/seo/JsonLd.tsx`**

```tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled schema.org data, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
```

- [ ] **Step 4: Run the test**

```bash
npm test -- src/__tests__/JsonLd.test.tsx
```

Expected: 2 tests PASS.

- [ ] **Step 5: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/seo/JsonLd.tsx src/__tests__/JsonLd.test.tsx
git commit -m "feat: add JsonLd component for structured data"
```

---

## Task 4: JSON-LD — Article + BreadcrumbList on Blog Post Pages

**Files:**

- Modify: `src/app/blog/[slug]/page.tsx`

The `JsonLd` component must be rendered inside the page's JSX. The `BlogPostLayout` component wraps children, so place `JsonLd` tags alongside the `MDXRemote` inside `BlogPostLayout`.

- [ ] **Step 1: Update `src/app/blog/[slug]/page.tsx`**

Add the import for `JsonLd` and render two `JsonLd` components inside the page return. The full updated `BlogPostPage` component:

```tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BlogPostLayout } from "@/src/components/blog/BlogPostLayout";
import { MdxImage, MdxLink } from "@/src/components/blog/MdxImage";
import { JsonLd } from "@/src/components/seo/JsonLd";
import {
  getAllBlogSlugs,
  getBlogPost,
  getBlogPostNavigation,
} from "@/src/lib/blog";
import type { BlogPost } from "@/src/types/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  try {
    const post = getBlogPost(slug);

    if (!post) {
      return { title: "Post Not Found" };
    }

    const ogImage =
      post.frontmatter.image ??
      `/og?title=${encodeURIComponent(post.frontmatter.title)}&tags=${encodeURIComponent((post.frontmatter.tags ?? []).join(","))}`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        modifiedTime: post.frontmatter.lastUpdated,
        images: [ogImage],
      },
      twitter: {
        card: post.frontmatter.image ? "summary" : "summary_large_image",
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
};

export const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  let post: BlogPost;

  try {
    post = getBlogPost(slug);
  } catch {
    notFound();
  }

  const { previous, next } = getBlogPostNavigation(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.lastUpdated ?? post.frontmatter.date,
    url: `https://www.yongchenglow.com/blog/${slug}`,
    image: post.frontmatter.image ?? "https://www.yongchenglow.com/img/yong-cheng-metasprint.jpeg",
    author: {
      "@type": "Person",
      name: "Yong Cheng Low",
      url: "https://www.yongchenglow.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Yong Cheng Low",
      url: "https://www.yongchenglow.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yongchenglow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.yongchenglow.com/blog" },
      { "@type": "ListItem", position: 3, name: post.frontmatter.title, item: `https://www.yongchenglow.com/blog/${slug}` },
    ],
  };

  return (
    <BlogPostLayout post={post} previousPost={previous} nextPost={next}>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <MDXRemote
        source={post.content}
        components={{
          img: MdxImage,
          a: MdxLink,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        }}
      />
    </BlogPostLayout>
  );
};

export default BlogPostPage;
```

- [ ] **Step 2: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add "src/app/blog/[slug]/page.tsx"
git commit -m "feat: add Article and BreadcrumbList JSON-LD to blog posts"
```

---

## Task 5: JSON-LD — Person Schema on About Page

**Files:**

- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update `src/app/about/page.tsx`**

Add the `JsonLd` import and render a Person schema at the end of the `AboutPage` component's JSX (after the `GoogleAds` call). The `about.json` hero section provides all required fields.

Add this import alongside the existing imports:

```tsx
import { JsonLd } from "@/src/components/seo/JsonLd";
```

Add this inside `AboutPage`, just before the closing `</PostContainer>` tag:

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.hero.name,
    url: "https://www.yongchenglow.com",
    jobTitle: about.hero.title,
    image: "https://www.yongchenglow.com/img/yong-cheng-metasprint.jpeg",
    sameAs: about.hero.links.map((link) => link.url),
  }}
/>
```

- [ ] **Step 2: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add Person JSON-LD to about page"
```

---

## Task 6: JSON-LD — BreadcrumbList on Listing Pages

**Files:**

- Modify: `src/app/blog/tag/[tag]/page.tsx`
- Modify: `src/app/blog/category/[category]/[page]/page.tsx`
- Modify: `src/app/blog/year/[year]/[page]/page.tsx`
- Modify: `src/app/blog/latest/[page]/page.tsx`

Each page gets a `BreadcrumbList` JSON-LD rendered at the top of its JSX return.

- [ ] **Step 1: Update `src/app/blog/tag/[tag]/page.tsx`**

Add import:

```tsx
import { JsonLd } from "@/src/components/seo/JsonLd";
```

Inside `TagPage`, add before the first `<FadeIn>`:

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yongchenglow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.yongchenglow.com/blog" },
      { "@type": "ListItem", position: 3, name: `Tag: ${tag}`, item: `https://www.yongchenglow.com/blog/tag/${tag}` },
    ],
  }}
/>
```

- [ ] **Step 2: Update `src/app/blog/category/[category]/[page]/page.tsx`**

Add import:

```tsx
import { JsonLd } from "@/src/components/seo/JsonLd";
```

Inside `CategoryPageWithPagination`, add before the first `<FadeIn>` (after the `<div className="py-3 text-center">` opening tag):

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yongchenglow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.yongchenglow.com/blog" },
      { "@type": "ListItem", position: 3, name: categoryMetadata.label, item: `https://www.yongchenglow.com/blog/category/${category}/1` },
      ...(pageNumber > 1
        ? [{ "@type": "ListItem", position: 4, name: `Page ${pageNumber}`, item: `https://www.yongchenglow.com/blog/category/${category}/${pageNumber}` }]
        : []),
    ],
  }}
/>
```

- [ ] **Step 3: Update `src/app/blog/year/[year]/[page]/page.tsx`**

Add import:

```tsx
import { JsonLd } from "@/src/components/seo/JsonLd";
```

Inside `YearPageWithPagination`, add before the first `<FadeIn>`:

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yongchenglow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.yongchenglow.com/blog" },
      { "@type": "ListItem", position: 3, name: `Posts from ${year}`, item: `https://www.yongchenglow.com/blog/year/${year}/1` },
      ...(pageNumber > 1
        ? [{ "@type": "ListItem", position: 4, name: `Page ${pageNumber}`, item: `https://www.yongchenglow.com/blog/year/${year}/${pageNumber}` }]
        : []),
    ],
  }}
/>
```

- [ ] **Step 4: Update `src/app/blog/latest/[page]/page.tsx`**

Add import:

```tsx
import { JsonLd } from "@/src/components/seo/JsonLd";
```

Inside `LatestPage`, add before the first `<FadeIn>`:

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yongchenglow.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.yongchenglow.com/blog" },
      { "@type": "ListItem", position: 3, name: "Featured Posts", item: "https://www.yongchenglow.com/blog/latest/1" },
      ...(pageNumber > 1
        ? [{ "@type": "ListItem", position: 4, name: `Page ${pageNumber}`, item: `https://www.yongchenglow.com/blog/latest/${pageNumber}` }]
        : []),
    ],
  }}
/>
```

- [ ] **Step 5: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add "src/app/blog/tag/[tag]/page.tsx" \
  "src/app/blog/category/[category]/[page]/page.tsx" \
  "src/app/blog/year/[year]/[page]/page.tsx" \
  src/app/blog/latest/[page]/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to listing pages"
```

---

## Task 7: Dynamic OG Image Route

**Files:**

- Create: `src/app/og/route.tsx`

This uses `next/og`'s `ImageResponse` to generate a 1200×630 PNG. The route reads `title` and `tags` query params and renders a branded card.

**Note:** `next/og` requires the route to use the Edge runtime. The avatar image must be fetched as an `ArrayBuffer` using `fetch` with the absolute URL (not a relative path) because `ImageResponse` runs in the Edge runtime.

- [ ] **Step 1: Create `src/app/og/route.tsx`**

```tsx
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Yong Cheng Low";
  const tagsParam = searchParams.get("tags") ?? "";
  const tags = tagsParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const avatarUrl = new URL("/img/yong-cheng-metasprint.jpeg", request.url).toString();
  const avatarData = await fetch(avatarUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "70px",
            overflow: "hidden",
            flexShrink: 0,
            marginRight: "48px",
            border: "3px solid #334155",
          }}
        >
          {/* @ts-expect-error: ImageResponse accepts ArrayBuffer for img src */}
          <img src={avatarData} width={140} height={140} style={{ objectFit: "cover" }} alt="" />
        </div>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
            justifyContent: "center",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            {title}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                marginBottom: "auto",
              }}
            >
              {tags.join(" · ")}
            </div>
          )}

          {/* Site URL */}
          <div
            style={{
              fontSize: "20px",
              color: "#64748b",
              marginTop: "auto",
              alignSelf: "flex-end",
            }}
          >
            yongchenglow.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
```

- [ ] **Step 2: Verify the route works locally**

Start the dev server and visit the URL in a browser:

```bash
npm run dev
```

Then open: `http://localhost:3000/og?title=Hello+World&tags=react,typescript`

Expected: A 1200×630 PNG image with dark gradient background, circular avatar, title "Hello World", tags "react · typescript", and "yongchenglow.com" at the bottom right.

- [ ] **Step 3: Run linter**

```bash
npm run check
```

Expected: No errors (the `@ts-expect-error` suppresses the one type issue).

- [ ] **Step 4: Commit**

```bash
git add src/app/og/route.tsx
git commit -m "feat: add dynamic branded OG image route"
```

---

## Task 8: Wire OG Image into Blog Post Metadata

The `generateMetadata` in `src/app/blog/[slug]/page.tsx` was already updated in Task 2 (Step 4) to include the `ogImage` fallback logic. Verify it is correct.

- [ ] **Step 1: Confirm `generateMetadata` in `src/app/blog/[slug]/page.tsx` contains the OG image logic**

The function should have this block (added in Task 2):

```ts
const ogImage =
  post.frontmatter.image ??
  `/og?title=${encodeURIComponent(post.frontmatter.title)}&tags=${encodeURIComponent((post.frontmatter.tags ?? []).join(","))}`;

return {
  title: post.frontmatter.title,
  description: post.frontmatter.description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    type: "article",
    publishedTime: post.frontmatter.date,
    modifiedTime: post.frontmatter.lastUpdated,
    images: [ogImage],
  },
  twitter: {
    card: post.frontmatter.image ? "summary" : "summary_large_image",
    images: [ogImage],
  },
};
```

If it is already present from Task 2, no changes are needed here.

- [ ] **Step 2: Run the full test suite**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 3: Run linter**

```bash
npm run check
```

Expected: No errors.

- [ ] **Step 4: Run production build to verify no build errors**

```bash
npm run build
```

Expected: Build succeeds with no errors. The `/og` route will appear in the build output as an Edge route.

- [ ] **Step 5: Commit if any changes were needed**

```bash
git add "src/app/blog/[slug]/page.tsx"
git commit -m "feat: wire dynamic OG image into blog post metadata"
```

---

## Verification Checklist

After all tasks complete:

- [ ] `https://www.yongchenglow.com/sitemap.xml` returns valid XML with all page URLs
- [ ] `https://www.yongchenglow.com/robots.txt` shows correct rules and sitemap pointer
- [ ] View source on any blog post — `<link rel="canonical">` matches the page URL
- [ ] View source on a blog post — `<script type="application/ld+json">` contains Article and BreadcrumbList schemas
- [ ] View source on `/about` — `<script type="application/ld+json">` contains Person schema
- [ ] `/og?title=Test+Post&tags=react,typescript` returns a PNG image
- [ ] A blog post without a `frontmatter.image` has an OG image URL pointing to `/og?title=...`
- [ ] Run `npm run build` — no errors
