# Code Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all high-priority issues identified in the repository code review: import convention violations, invalid HTML nesting, runtime bugs (division by zero, unhandled errors), performance issues, and missing test coverage.

**Architecture:** Fixes are grouped into four independent batches: (1) import convention fixes across all files, (2) runtime bug fixes in pages and components, (3) performance improvements in lib and InfiniteScroll, (4) test coverage additions. Each batch can be committed independently.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Vitest, Testing Library, Biome

---

## Files Modified / Created

**Import convention fixes:**
- Modify: `src/app/layout.tsx` — remove `React.ReactNode`, use named import
- Modify: `src/components/blog/MdxImage.tsx` — replace `import type * as React` with named imports
- Modify: `src/components/post/PostButton.tsx` — replace `React.ReactNode` with named import
- Modify: `src/components/post/PostDefinition.tsx` — replace `React.ReactNode` with named import
- Modify: `src/components/post/PostList.tsx` — replace `React.ReactNode` with named import
- Modify: `src/components/post/PostMetadata.tsx` — replace `React.ReactNode` with named import
- Modify: `src/components/mdx/Admonition.tsx` — replace `React.ReactNode` with named import
- Modify: `src/components/shared/atoms/ExternalLink.tsx` — replace `React.AnchorHTMLAttributes` with named import
- Modify: `src/components/shared/layouts/StandardLayout.tsx` — add typed children prop, fix return type import

**Runtime bug fixes:**
- Modify: `src/components/blog/ReadingProgress.tsx` — guard against division by zero
- Modify: `src/components/blog/BlogNavigation.tsx` — fix nested `<button>` inside `<a>`
- Modify: `src/app/blog/[slug]/page.tsx` — wrap `generateMetadata` getBlogPost call in try/catch
- Modify: `src/app/blog/category/[category]/page.tsx` — replace `throw new Error` with `notFound()`
- Modify: `src/app/blog/category/[category]/[page]/page.tsx` — replace `throw new Error` with `notFound()`
- Modify: `src/app/blog/latest/[page]/page.tsx` — replace `throw new Error` with `notFound()`
- Modify: `src/app/blog/year/[year]/page.tsx` — replace `throw new Error` with `notFound()`
- Modify: `src/app/blog/year/[year]/[page]/page.tsx` — replace `throw new Error` with `notFound()`
- Modify: `src/app/about/page.tsx` — remove `"use client"`
- Modify: `src/components/search/SearchTrigger.tsx` — add `aria-label`
- Modify: `src/hooks/useSearch.ts` — add `response.ok` check

**Performance fixes:**
- Modify: `src/lib/blog.ts` — optimise `getCategoryPostCounts` and `getYearPostCounts`
- Modify: `src/components/blog/LatestPostsView.tsx` — wrap `loadMorePosts` in `useCallback`
- Modify: `src/components/blog/InfiniteScroll.tsx` — stabilise observer using `pageRef`
- Modify: `src/components/blog/TableOfContents.tsx` — fix active heading selection priority

**New tests:**
- Modify: `test/lib/blog.test.ts` — add `getBlogPost`, `getCategoryMetadata`, `getBlogPostsByCategory`, `getCategoryPostCounts`, `getYearPostCounts` tests
- Modify: `test/index.test.tsx` — mock `getFeaturedPost` so test is deterministic
- Create: `test/components/blog/BlogNavigation.test.tsx`
- Create: `test/components/blog/InfiniteScroll.test.tsx`

---

## Task 1: Fix React import convention violations

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/blog/MdxImage.tsx`
- Modify: `src/components/post/PostButton.tsx`
- Modify: `src/components/post/PostDefinition.tsx`
- Modify: `src/components/post/PostList.tsx`
- Modify: `src/components/post/PostMetadata.tsx`
- Modify: `src/components/mdx/Admonition.tsx`
- Modify: `src/components/shared/atoms/ExternalLink.tsx`
- Modify: `src/components/shared/layouts/StandardLayout.tsx`

- [ ] **Step 1: Fix `src/app/layout.tsx`**

Replace lines 41-45:
```tsx
// Before:
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
```
```tsx
// After (add import at top of file, after existing imports):
import type { ReactNode } from "react";

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
```

- [ ] **Step 2: Fix `src/components/blog/MdxImage.tsx`**

Replace line 3 and update `MdxLinkProps`:
```tsx
// Remove line 3: import type * as React from "react";
// Replace with:
import type { ReactNode } from "react";

// Update MdxLinkProps interface (was React.ReactNode):
interface MdxLinkProps {
	href?: string;
	children?: ReactNode;
}
```

- [ ] **Step 3: Fix post components — add named ReactNode import**

`src/components/post/PostButton.tsx` — add import, update interface:
```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
```

`src/components/post/PostDefinition.tsx` — add import, update interface:
```tsx
import type { ReactNode } from "react";

interface PostDefinitionProps {
	children: ReactNode;
	className?: string;
}
```

`src/components/post/PostList.tsx` — add import, update interface:
```tsx
import type { ReactNode } from "react";

interface PostListProps {
	children: ReactNode;
	className?: string;
	type?: "ordered" | "unordered";
}
```

`src/components/post/PostMetadata.tsx` — add import, update interface:
```tsx
import type { ReactNode } from "react";

interface PostMetadataProps {
	children: ReactNode;
	className?: string;
}
```

- [ ] **Step 4: Fix `src/components/mdx/Admonition.tsx`**

Add import, update interface:
```tsx
import type { ReactNode } from "react";

interface AdmonitionProps {
	type?: "note" | "tip" | "warning" | "danger";
	title?: string;
	children: ReactNode;
}
```

- [ ] **Step 5: Fix `src/components/shared/atoms/ExternalLink.tsx`**

Replace line 3:
```tsx
// Remove: type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
// Add import and replace:
import type { AnchorHTMLAttributes } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	icon?: boolean;
	unstyled?: boolean;
};
```

- [ ] **Step 6: Fix `src/components/shared/layouts/StandardLayout.tsx`**

Replace entire file:
```tsx
"use client";

import type { ReactElement, ReactNode } from "react";
import Container from "@/src/components/shared/atoms/Container";
import Footer from "@/src/components/shared/organisms/Footer";
import NavigationBar from "@/src/components/shared/organisms/Navigationbar";

const StandardLayout = ({ children }: { children: ReactNode }): ReactElement => {
	return (
		<div className="min-h-screen pt-16 flex flex-col">
			<NavigationBar />
			<Container>{children}</Container>
			<Footer />
		</div>
	);
};

export default StandardLayout;
```

- [ ] **Step 7: Run lint check**

```bash
npm run check
```
Expected: no errors related to the changed files.

- [ ] **Step 8: Run tests**

```bash
npm test
```
Expected: all existing tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/app/layout.tsx src/components/blog/MdxImage.tsx src/components/post/PostButton.tsx src/components/post/PostDefinition.tsx src/components/post/PostList.tsx src/components/post/PostMetadata.tsx src/components/mdx/Admonition.tsx src/components/shared/atoms/ExternalLink.tsx src/components/shared/layouts/StandardLayout.tsx
git commit -m "fix: replace React namespace references with named imports per project conventions"
```

---

## Task 2: Fix runtime bugs in pages

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/blog/category/[category]/page.tsx`
- Modify: `src/app/blog/category/[category]/[page]/page.tsx`
- Modify: `src/app/blog/latest/[page]/page.tsx`
- Modify: `src/app/blog/year/[year]/page.tsx`
- Modify: `src/app/blog/year/[year]/[page]/page.tsx`
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Fix `generateMetadata` in `src/app/blog/[slug]/page.tsx`**

The current `generateMetadata` at line 28-50 calls `getBlogPost(slug)` without error handling. `getBlogPost` throws `ENOENT` for missing files. Replace the function:

```tsx
export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params;
	let post: BlogPost | null = null;
	try {
		post = getBlogPost(slug);
	} catch {
		return { title: "Post Not Found" };
	}

	if (!post) {
		return { title: "Post Not Found" };
	}

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.description,
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			type: "article",
			publishedTime: post.frontmatter.date,
			modifiedTime: post.frontmatter.lastUpdated,
			images: post.frontmatter.image ? [post.frontmatter.image] : [],
		},
	};
}
```

- [ ] **Step 2: Replace `throw new Error` with `notFound()` in category page**

`src/app/blog/category/[category]/page.tsx` — add import and fix line 19:
```tsx
import { notFound } from "next/navigation";
// already has: import { redirect } from "next/navigation";

// Replace:
// throw new Error("Invalid category");
// With:
notFound();
```

- [ ] **Step 3: Replace `throw new Error` with `notFound()` in category+page route**

`src/app/blog/category/[category]/[page]/page.tsx` — the file already imports nothing from `next/navigation`. Add import and fix lines 51-53, 57-59, 64-66:

```tsx
import { notFound } from "next/navigation";

// Replace all three throw new Error blocks:
// Line 51-53: if (Number.isNaN(pageNumber) || pageNumber < 1)
notFound();

// Line 57-59: if (!categoryMetadata)
notFound();

// Line 64-66: if (paginationResult.items.length === 0 && pageNumber > 1)
notFound();
```

- [ ] **Step 4: Replace `throw new Error` with `notFound()` in latest page**

`src/app/blog/latest/[page]/page.tsx`:
```tsx
import { notFound } from "next/navigation";

// Replace line 30: if (Number.isNaN(pageNumber) || pageNumber < 1)
notFound();

// Replace line 36-38: if (paginationResult.items.length === 0 && pageNumber > 1)
notFound();
```

- [ ] **Step 5: Replace `throw new Error` with `notFound()` in year index page**

`src/app/blog/year/[year]/page.tsx`:
```tsx
// already imports from next/navigation (redirect)
import { notFound, redirect } from "next/navigation";

// Replace line 21: if (Number.isNaN(yearNumber))
notFound();
```

- [ ] **Step 6: Replace `throw new Error` with `notFound()` in year+page route**

`src/app/blog/year/[year]/[page]/page.tsx`:
```tsx
import { notFound } from "next/navigation";

// Replace line 51-53: if (Number.isNaN(yearNumber) || Number.isNaN(pageNumber) || pageNumber < 1)
notFound();

// Replace line 57-59: if (paginationResult.items.length === 0 && pageNumber > 1)
notFound();
```

- [ ] **Step 7: Remove `"use client"` from About page**

`src/app/about/page.tsx` — delete line 1 (`"use client";`). The page uses only static JSON data and no hooks or browser APIs, so it should be a Server Component.

- [ ] **Step 8: Run lint check**

```bash
npm run check
```
Expected: no errors.

- [ ] **Step 9: Run tests**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 10: Commit**

```bash
git add src/app/blog/\[slug\]/page.tsx src/app/blog/category/\[category\]/page.tsx "src/app/blog/category/[category]/[page]/page.tsx" "src/app/blog/latest/[page]/page.tsx" "src/app/blog/year/[year]/page.tsx" "src/app/blog/year/[year]/[page]/page.tsx" src/app/about/page.tsx
git commit -m "fix: use notFound() for invalid params and guard generateMetadata against thrown errors"
```

---

## Task 3: Fix component runtime bugs

**Files:**
- Modify: `src/components/blog/ReadingProgress.tsx`
- Modify: `src/components/blog/BlogNavigation.tsx`
- Modify: `src/components/search/SearchTrigger.tsx`
- Modify: `src/hooks/useSearch.ts`

- [ ] **Step 1: Fix division by zero in `ReadingProgress`**

`src/components/blog/ReadingProgress.tsx` — replace line 13:
```tsx
// Before:
const scrollPercent = (scrollTop / docHeight) * 100;

// After:
const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
```

- [ ] **Step 2: Fix nested `<button>` inside `<a>` in `BlogNavigation`**

`src/components/blog/BlogNavigation.tsx` — both previous and next links nest `<Button>` inside `<InternalLink>` (which renders `<a>`). Fix both to use `<Button asChild>` wrapping `<InternalLink>`:

```tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";
import type { BlogPost } from "@/src/types/blog";

interface BlogNavigationProps {
	previousPost?: BlogPost | null;
	nextPost?: BlogPost | null;
}

export default function BlogNavigation({
	previousPost,
	nextPost,
}: BlogNavigationProps) {
	return (
		<nav className="flex justify-between items-center gap-4 py-4">
			<div className="flex-1">
				{previousPost && (
					<Button
						asChild
						variant="outline"
						className="w-full justify-start h-auto py-3 px-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
					>
						<InternalLink href={`/blog/${previousPost.slug}`}>
							<ChevronLeft className="mr-2 h-4 w-4 flex-shrink-0" />
							<div className="text-left min-w-0">
								<div className="text-xs text-muted-foreground">Previous</div>
								<div className="font-semibold truncate">
									{previousPost.frontmatter.title}
								</div>
							</div>
						</InternalLink>
					</Button>
				)}
			</div>

			<div className="flex-1 text-right">
				{nextPost && (
					<Button
						asChild
						variant="outline"
						className="w-full justify-end h-auto py-3 px-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
					>
						<InternalLink href={`/blog/${nextPost.slug}`}>
							<div className="text-right min-w-0">
								<div className="text-xs text-muted-foreground">Next</div>
								<div className="font-semibold truncate">
									{nextPost.frontmatter.title}
								</div>
							</div>
							<ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
						</InternalLink>
					</Button>
				)}
			</div>
		</nav>
	);
}
```

- [ ] **Step 3: Add `aria-label` to `SearchTrigger`**

`src/components/search/SearchTrigger.tsx` — add `aria-label="Search"` to the Button:
```tsx
<Button variant="outline" size="sm" onClick={handleClick} className="gap-2" aria-label="Search">
```

- [ ] **Step 4: Add `response.ok` guard to `useSearch`**

`src/hooks/useSearch.ts` — add check after fetch, before parsing JSON:
```tsx
const response = await fetch("/search-index.json");
if (!response.ok) {
	throw new Error(`Failed to fetch search index: ${response.status}`);
}
const data: SerializedSearchIndex = await response.json();
```

- [ ] **Step 5: Run lint check**

```bash
npm run check
```
Expected: no errors.

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/blog/ReadingProgress.tsx src/components/blog/BlogNavigation.tsx src/components/search/SearchTrigger.tsx src/hooks/useSearch.ts
git commit -m "fix: guard ReadingProgress division by zero, fix BlogNavigation invalid HTML nesting, add SearchTrigger aria-label, guard useSearch response.ok"
```

---

## Task 4: Performance fixes

**Files:**
- Modify: `src/lib/blog.ts`
- Modify: `src/components/blog/LatestPostsView.tsx`
- Modify: `src/components/blog/InfiniteScroll.tsx`
- Modify: `src/components/blog/TableOfContents.tsx`

- [ ] **Step 1: Optimise `getCategoryPostCounts` in `src/lib/blog.ts`**

Replace lines 105-114 to read posts once:
```ts
export function getCategoryPostCounts(): Record<string, number> {
	const posts = getAllBlogPosts();
	const categories = getAllCategories();
	const counts: Record<string, number> = {};

	for (const category of categories) {
		counts[category.slug] = posts.filter((post) =>
			post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
		).length;
	}

	return counts;
}
```

- [ ] **Step 2: Optimise `getYearPostCounts` in `src/lib/blog.ts`**

Replace lines 137-146:
```ts
export function getYearPostCounts(): Record<number, number> {
	const posts = getAllBlogPosts();
	const years = getAllPostYears();
	const counts: Record<number, number> = {};

	for (const year of years) {
		counts[year] = posts.filter((post) => {
			const postYear = new Date(post.frontmatter.date).getFullYear();
			return postYear === year;
		}).length;
	}

	return counts;
}
```

Note: `getAllPostYears` itself calls `getAllBlogPosts()`. To fully eliminate the extra call you'd need to refactor further, but this is a meaningful improvement — from N+1 calls to 2 calls total (one in `getAllPostYears`, one in the new body).

- [ ] **Step 3: Memoize `loadMorePosts` in `LatestPostsView`**

`src/components/blog/LatestPostsView.tsx` — add `useCallback` import and wrap the function:
```tsx
import { useCallback, useState } from "react";

// Replace the plain async function with:
const loadMorePosts = useCallback(async (page: number): Promise<BlogPost[]> => {
	const response = await fetch(`/api/blog/latest?page=${page}`);
	if (!response.ok) {
		throw new Error("Failed to fetch posts");
	}
	const data: PaginationResult<BlogPost> = await response.json();
	return data.items;
}, []);
```

- [ ] **Step 4: Stabilise `InfiniteScroll` observer with `pageRef`**

`src/components/blog/InfiniteScroll.tsx` — add a `pageRef` to avoid observer churn:

```tsx
// Add pageRef after the other refs (after line 34):
const pageRef = useRef(page);

// Add a useEffect to keep pageRef in sync (after the existing ref sync effects):
useEffect(() => {
	pageRef.current = page;
}, [page]);

// Update loadMore to use pageRef.current instead of page from closure,
// and remove page from the dependency array:
const loadMore = useCallback(async () => {
	if (isLoadingRef.current || !hasMoreRef.current) return;

	setIsLoading(true);
	const nextPage = pageRef.current + 1;

	try {
		const newPosts = await loadMorePosts(nextPage);
		setPosts((prev) => [...prev, ...newPosts]);
		setPage(nextPage);
		setHasMore(nextPage < totalPages);

		// Update URL without full page reload
		router.replace(`${baseUrl}${nextPage}`, { scroll: false });
	} catch (error) {
		console.error("Failed to load more posts:", error);
	} finally {
		setIsLoading(false);
	}
}, [totalPages, baseUrl, router, loadMorePosts]);
```

- [ ] **Step 5: Fix active heading priority in `TableOfContents`**

`src/components/blog/TableOfContents.tsx` — replace the IntersectionObserver callback (lines 39-48):
```tsx
const observer = new IntersectionObserver(
	(entries) => {
		const intersecting = entries.filter((entry) => entry.isIntersecting);
		if (intersecting.length > 0) {
			intersecting.sort(
				(a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
			);
			setActiveId(intersecting[0].target.id);
		}
	},
	{ rootMargin: "-100px 0px -80% 0px" },
);
```

- [ ] **Step 6: Run lint check**

```bash
npm run check
```
Expected: no errors.

- [ ] **Step 7: Run tests**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/lib/blog.ts src/components/blog/LatestPostsView.tsx src/components/blog/InfiniteScroll.tsx src/components/blog/TableOfContents.tsx
git commit -m "perf: eliminate redundant blog post filesystem scans and stabilise InfiniteScroll observer"
```

---

## Task 5: Add missing tests to `blog.test.ts`

**Files:**
- Modify: `test/lib/blog.test.ts`

- [ ] **Step 1: Add `getBlogPost` tests**

Append to `test/lib/blog.test.ts`:
```ts
describe("getBlogPost", () => {
	it("returns a BlogPost with the correct slug", () => {
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(mockPost("my-post"));
		const post = getBlogPost("my-post");
		expect(post.slug).toBe("my-post");
	});

	it("reads the .mdx file when it exists", () => {
		vi.mocked(fs.existsSync).mockReturnValue(true);
		vi.mocked(fs.readFileSync).mockReturnValue(mockPost("my-post"));
		getBlogPost("my-post");
		const calls = vi.mocked(fs.readFileSync).mock.calls;
		expect(String(calls[0][0])).toContain(".mdx");
	});

	it("falls back to .md file when .mdx does not exist", () => {
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(mockPost("my-post"));
		getBlogPost("my-post");
		const calls = vi.mocked(fs.readFileSync).mock.calls;
		expect(String(calls[0][0])).toContain(".md");
	});

	it("truncates excerpt to 200 characters", () => {
		const longContent = "A".repeat(300);
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(
			`---\ntitle: Test\ndescription: D\ndate: 2024-01-01\nauthor: A\ntags: []\n---\n${longContent}`,
		);
		const post = getBlogPost("test");
		expect(post.excerpt.length).toBeLessThanOrEqual(200);
	});

	it("sets readingTime as a non-empty string", () => {
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(mockPost("my-post"));
		const post = getBlogPost("my-post");
		expect(typeof post.readingTime).toBe("string");
		expect(post.readingTime.length).toBeGreaterThan(0);
	});
});
```

Add this import at the top of the test file (alongside other imports from `@/src/lib/blog`):
```ts
import {
	// existing imports...
	getBlogPost,
	getCategoryMetadata,
	getBlogPostsByCategory,
	getCategoryPostCounts,
	getYearPostCounts,
} from "@/src/lib/blog";
```

- [ ] **Step 2: Add `getCategoryMetadata` and `getBlogPostsByCategory` tests**

Append to `test/lib/blog.test.ts`:
```ts
describe("getCategoryMetadata", () => {
	it("returns category metadata for a known slug", () => {
		const result = getCategoryMetadata("development");
		expect(result).not.toBeNull();
		expect(result?.slug).toBe("development");
	});

	it("returns null for an unknown slug", () => {
		expect(getCategoryMetadata("nonexistent-slug-xyz")).toBeNull();
	});
});

describe("getBlogPostsByCategory", () => {
	beforeEach(() => {
		vi.mocked(fs.readdirSync).mockReturnValue(["dev.mdx", "other.mdx"] as never);
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
			if (String(filePath).includes("dev"))
				return mockPost("dev", { date: "2024-01-01", tags: "web-development" });
			return mockPost("other", { date: "2023-01-01", tags: "agile" });
		});
	});

	it("returns posts matching the category tags", () => {
		const posts = getBlogPostsByCategory("development");
		expect(posts.map((p) => p.slug)).toContain("dev");
	});

	it("returns empty array for unknown category", () => {
		expect(getBlogPostsByCategory("nonexistent-slug-xyz")).toHaveLength(0);
	});

	it("excludes posts that do not match any category tag", () => {
		const posts = getBlogPostsByCategory("development");
		expect(posts.map((p) => p.slug)).not.toContain("other");
	});
});
```

- [ ] **Step 3: Add `getCategoryPostCounts` and `getYearPostCounts` tests**

Append to `test/lib/blog.test.ts`:
```ts
describe("getCategoryPostCounts", () => {
	it("returns counts keyed by category slug", () => {
		vi.mocked(fs.readdirSync).mockReturnValue(["dev.mdx"] as never);
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(
			mockPost("dev", { date: "2024-01-01", tags: "web-development" }),
		);
		const counts = getCategoryPostCounts();
		expect(typeof counts).toBe("object");
		expect(counts["development"]).toBe(1);
	});

	it("returns 0 for categories with no matching posts", () => {
		vi.mocked(fs.readdirSync).mockReturnValue(["post.mdx"] as never);
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockReturnValue(
			mockPost("post", { date: "2024-01-01", tags: "agile" }),
		);
		const counts = getCategoryPostCounts();
		// "development" uses "web-development" tags — agile doesn't match
		expect(counts["development"]).toBe(0);
	});
});

describe("getYearPostCounts", () => {
	it("returns the correct count per year", () => {
		vi.mocked(fs.readdirSync).mockReturnValue([
			"a.mdx",
			"b.mdx",
			"c.mdx",
		] as never);
		vi.mocked(fs.existsSync).mockReturnValue(false);
		vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
			if (String(filePath).includes("/a"))
				return mockPost("a", { date: "2024-05-01" });
			if (String(filePath).includes("/b"))
				return mockPost("b", { date: "2024-11-01" });
			return mockPost("c", { date: "2023-03-01" });
		});
		const counts = getYearPostCounts();
		expect(counts[2024]).toBe(2);
		expect(counts[2023]).toBe(1);
	});
});
```

- [ ] **Step 4: Run new tests**

```bash
npm test -- test/lib/blog.test.ts
```
Expected: all tests pass including the new ones.

- [ ] **Step 5: Commit**

```bash
git add test/lib/blog.test.ts
git commit -m "test: add getBlogPost, getCategoryMetadata, getBlogPostsByCategory, and count function tests"
```

---

## Task 6: Fix `test/index.test.tsx` and add BlogNavigation tests

**Files:**
- Modify: `test/index.test.tsx`
- Create: `test/components/blog/BlogNavigation.test.tsx`

- [ ] **Step 1: Fix `test/index.test.tsx` to mock filesystem**

The current test renders `<Index />` which calls `getFeaturedPost()` which reads from the filesystem. This makes the test non-deterministic in CI. Replace the test file contents:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Index from "@/src/app/page";

vi.mock("@/src/lib/blog", () => ({
	getFeaturedPost: vi.fn(() => ({
		slug: "test-post",
		frontmatter: {
			title: "Test Post",
			description: "Test description",
			date: "2024-01-01",
			tags: ["react"],
			featured: true,
		},
		content: "",
		readingTime: "1 min read",
		excerpt: "Test excerpt",
	})),
}));

describe("Index", () => {
	it("renders the homepage", () => {
		const { container } = render(<Index />);
		expect(container.firstChild).toBeTruthy();
	});
});
```

- [ ] **Step 2: Run updated homepage test**

```bash
npm test -- test/index.test.tsx
```
Expected: test passes.

- [ ] **Step 3: Write `BlogNavigation` tests**

Create `test/components/blog/BlogNavigation.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogNavigation from "@/src/components/blog/BlogNavigation";
import type { BlogPost } from "@/src/types/blog";

const makePost = (slug: string, title: string): BlogPost => ({
	slug,
	frontmatter: {
		title,
		description: "desc",
		date: "2024-01-01",
		tags: [],
	},
	content: "",
	readingTime: "1 min read",
	excerpt: "",
});

describe("BlogNavigation", () => {
	it("renders nothing when both previous and next are null", () => {
		const { container } = render(
			<BlogNavigation previousPost={null} nextPost={null} />,
		);
		expect(container.querySelector("a")).toBeNull();
	});

	it("renders a previous link with correct href", () => {
		render(
			<BlogNavigation
				previousPost={makePost("prev-post", "Previous Title")}
				nextPost={null}
			/>,
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/blog/prev-post");
		expect(screen.getByText("Previous Title")).toBeInTheDocument();
	});

	it("renders a next link with correct href", () => {
		render(
			<BlogNavigation
				previousPost={null}
				nextPost={makePost("next-post", "Next Title")}
			/>,
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/blog/next-post");
		expect(screen.getByText("Next Title")).toBeInTheDocument();
	});

	it("renders both previous and next links when both provided", () => {
		render(
			<BlogNavigation
				previousPost={makePost("prev-post", "Previous Title")}
				nextPost={makePost("next-post", "Next Title")}
			/>,
		);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		const hrefs = links.map((l) => l.getAttribute("href"));
		expect(hrefs).toContain("/blog/prev-post");
		expect(hrefs).toContain("/blog/next-post");
	});

	it("renders 'Previous' label for previous post", () => {
		render(
			<BlogNavigation
				previousPost={makePost("prev", "Some Post")}
				nextPost={null}
			/>,
		);
		expect(screen.getByText("Previous")).toBeInTheDocument();
	});

	it("renders 'Next' label for next post", () => {
		render(
			<BlogNavigation
				previousPost={null}
				nextPost={makePost("next", "Some Post")}
			/>,
		);
		expect(screen.getByText("Next")).toBeInTheDocument();
	});
});
```

- [ ] **Step 4: Run new tests**

```bash
npm test -- test/components/blog/BlogNavigation.test.tsx
```
Expected: all 6 tests pass.

- [ ] **Step 5: Run full test suite**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add test/index.test.tsx test/components/blog/BlogNavigation.test.tsx
git commit -m "test: fix homepage test to mock filesystem, add BlogNavigation component tests"
```

---

## Task 7: Add `InfiniteScroll` tests

**Files:**
- Create: `test/components/blog/InfiniteScroll.test.tsx`

- [ ] **Step 1: Write `InfiniteScroll` tests**

Create `test/components/blog/InfiniteScroll.test.tsx`:
```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import InfiniteScroll from "@/src/components/blog/InfiniteScroll";
import type { BlogPost } from "@/src/types/blog";

const makePost = (slug: string): BlogPost => ({
	slug,
	frontmatter: {
		title: `Post ${slug}`,
		description: "desc",
		date: "2024-01-01",
		tags: [],
	},
	content: "",
	readingTime: "1 min read",
	excerpt: "",
});

const initialPosts = [makePost("post-1"), makePost("post-2")];

describe("InfiniteScroll", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders initial posts", () => {
		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);
		expect(screen.getByText("Post post-1")).toBeInTheDocument();
		expect(screen.getByText("Post post-2")).toBeInTheDocument();
	});

	it("shows 'Scroll for more' when there are more pages", () => {
		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);
		expect(screen.getByText("Scroll for more")).toBeInTheDocument();
	});

	it("shows 'No more posts to load' when on the last page", () => {
		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={3}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);
		expect(screen.getByText("No more posts to load")).toBeInTheDocument();
	});

	it("does not show scroll sentinel when already on last page", () => {
		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={1}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);
		expect(screen.queryByText("Scroll for more")).not.toBeInTheDocument();
	});

	it("calls loadMorePosts when IntersectionObserver fires", async () => {
		const newPosts = [makePost("post-3")];
		const loadMorePosts = vi.fn().mockResolvedValue(newPosts);

		// Override IntersectionObserver to capture and fire the callback
		let observerCallback: IntersectionObserverCallback | null = null;
		const mockObserver = {
			observe: vi.fn(),
			disconnect: vi.fn(),
			unobserve: vi.fn(),
		};
		vi.spyOn(window, "IntersectionObserver").mockImplementation(
			(callback) => {
				observerCallback = callback;
				return mockObserver as unknown as IntersectionObserver;
			},
		);

		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={loadMorePosts}
			/>,
		);

		// Fire the intersection
		observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], mockObserver as unknown as IntersectionObserver);

		await waitFor(() => {
			expect(loadMorePosts).toHaveBeenCalledWith(2);
		});

		await waitFor(() => {
			expect(screen.getByText("Post post-3")).toBeInTheDocument();
		});
	});
});
```

- [ ] **Step 2: Run new tests**

```bash
npm test -- test/components/blog/InfiniteScroll.test.tsx
```
Expected: all 5 tests pass.

- [ ] **Step 3: Run full test suite**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 4: Run lint**

```bash
npm run check
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add test/components/blog/InfiniteScroll.test.tsx
git commit -m "test: add InfiniteScroll component tests"
```
