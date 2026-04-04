# Test Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit and component tests covering blog utility logic, pagination, category/year navigation, and the standard layout — without testing content.

**Architecture:** Tests are organised to mirror `src/`: utility tests in `test/lib/`, component tests in `test/components/blog/` and `test/components/shared/`. Filesystem is mocked with `vi.mock("node:fs")` in utility tests; `@/src/lib/blog` is mocked in component tests so rendering is decoupled from data.

**Tech Stack:** Vitest, @testing-library/react, jsdom (all already configured in `vitest.config.ts`).

---

## Files

| Action | Path |
|--------|------|
| Create | `test/lib/blog.test.ts` |
| Create | `test/components/blog/Pagination.test.tsx` |
| Create | `test/components/blog/CategoryNavigation.test.tsx` |
| Create | `test/components/blog/YearFilter.test.tsx` |
| Create | `test/components/shared/StandardLayout.test.tsx` |

---

## Task 1: Blog Utility Tests — slugs, posts, featured

**Files:**
- Create: `test/lib/blog.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `test/lib/blog.test.ts` with this content:

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";

// Must mock before importing the module under test
vi.mock("node:fs");
vi.mock("node:path", async () => {
  const actual = await vi.importActual<typeof import("node:path")>("node:path");
  return {
    ...actual,
    join: (...args: string[]) => args.join("/"),
  };
});

import fs from "node:fs";
import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getFeaturedPost,
} from "@/src/lib/blog";

const mockPost = (
  slug: string,
  overrides: Record<string, unknown> = {}
): string => `---
title: ${overrides.title ?? slug}
description: A description
date: ${overrides.date ?? "2024-01-01"}
author: Test Author
${overrides.draft ? "draft: true" : ""}
${overrides.featured ? "featured: true" : ""}
tags: [${overrides.tags ?? ""}]
---
Content for ${slug}`;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getAllBlogSlugs", () => {
  it("returns slugs for .mdx files", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["post-a.mdx", "post-b.mdx"] as never);
    expect(getAllBlogSlugs()).toEqual(["post-a", "post-b"]);
  });

  it("returns slugs for .md files", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["post-a.md"] as never);
    expect(getAllBlogSlugs()).toEqual(["post-a"]);
  });

  it("ignores files without .mdx or .md extension", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["image.png", "post-a.mdx"] as never);
    expect(getAllBlogSlugs()).toEqual(["post-a"]);
  });
});

describe("getAllBlogPosts", () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(["old.mdx", "new.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("new")) return mockPost("new", { date: "2024-06-01" });
      return mockPost("old", { date: "2023-01-01" });
    });
  });

  it("sorts posts by date descending", () => {
    const posts = getAllBlogPosts();
    expect(posts[0].slug).toBe("new");
    expect(posts[1].slug).toBe("old");
  });

  it("filters out draft posts by default", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["draft.mdx", "published.mdx"] as never);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("draft")) return mockPost("draft", { draft: true });
      return mockPost("published");
    });
    const posts = getAllBlogPosts();
    expect(posts.map((p) => p.slug)).not.toContain("draft");
    expect(posts.map((p) => p.slug)).toContain("published");
  });

  it("includes draft posts when includesDrafts is true", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["draft.mdx"] as never);
    vi.mocked(fs.readFileSync).mockReturnValue(mockPost("draft", { draft: true }) as never);
    const posts = getAllBlogPosts(true);
    expect(posts.map((p) => p.slug)).toContain("draft");
  });
});

describe("getFeaturedPost", () => {
  it("returns the post with featured: true when one exists", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["a.mdx", "featured.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("featured")) return mockPost("featured", { date: "2024-01-01", featured: true });
      return mockPost("a", { date: "2023-01-01" });
    });
    expect(getFeaturedPost()?.slug).toBe("featured");
  });

  it("falls back to the first (most recent) post when no featured post exists", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["old.mdx", "new.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("new")) return mockPost("new", { date: "2024-06-01" });
      return mockPost("old", { date: "2023-01-01" });
    });
    expect(getFeaturedPost()?.slug).toBe("new");
  });

  it("returns null when there are no posts", () => {
    vi.mocked(fs.readdirSync).mockReturnValue([] as never);
    expect(getFeaturedPost()).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- test/lib/blog.test.ts
```

Expected: tests fail because the file didn't exist before.

- [ ] **Step 3: Run tests to verify they pass**

The tests exercise existing code in `src/lib/blog.ts` — no implementation changes needed. Run again:

```bash
npm test -- test/lib/blog.test.ts
```

Expected: all tests in `getAllBlogSlugs`, `getAllBlogPosts`, `getFeaturedPost` pass.

- [ ] **Step 4: Commit**

```bash
git add test/lib/blog.test.ts
git commit -m "test: add blog utility tests for slugs, posts, and featured post"
```

---

## Task 2: Blog Utility Tests — tags, navigation, years

**Files:**
- Modify: `test/lib/blog.test.ts`

- [ ] **Step 1: Append the following test blocks to `test/lib/blog.test.ts`**

```typescript
import {
  getBlogPostNavigation,
  getBlogPostsByTag,
  getAllPostYears,
  getBlogPostsByYear,
} from "@/src/lib/blog";

describe("getBlogPostsByTag", () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(["a.mdx", "b.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("/a")) return mockPost("a", { date: "2024-01-01", tags: "react, typescript" });
      return mockPost("b", { date: "2023-01-01", tags: "vue" });
    });
  });

  it("returns posts that include the given tag", () => {
    const posts = getBlogPostsByTag("react");
    expect(posts.map((p) => p.slug)).toContain("a");
  });

  it("returns empty array when no posts match the tag", () => {
    expect(getBlogPostsByTag("angular")).toHaveLength(0);
  });
});

describe("getBlogPostNavigation", () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(["newest.mdx", "middle.mdx", "oldest.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("newest")) return mockPost("newest", { date: "2024-03-01" });
      if (String(filePath).includes("middle")) return mockPost("middle", { date: "2024-02-01" });
      return mockPost("oldest", { date: "2024-01-01" });
    });
  });

  it("returns correct previous and next for a middle post", () => {
    const nav = getBlogPostNavigation("middle");
    expect(nav.previous?.slug).toBe("newest");
    expect(nav.next?.slug).toBe("oldest");
  });

  it("returns null for previous on the first (newest) post", () => {
    const nav = getBlogPostNavigation("newest");
    expect(nav.previous).toBeNull();
  });

  it("returns null for next on the last (oldest) post", () => {
    const nav = getBlogPostNavigation("oldest");
    expect(nav.next).toBeNull();
  });
});

describe("getAllPostYears", () => {
  it("returns unique years in descending order", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["a.mdx", "b.mdx", "c.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("/a")) return mockPost("a", { date: "2024-05-01" });
      if (String(filePath).includes("/b")) return mockPost("b", { date: "2023-05-01" });
      return mockPost("c", { date: "2024-11-01" });
    });
    expect(getAllPostYears()).toEqual([2024, 2023]);
  });
});

describe("getBlogPostsByYear", () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(["y2024.mdx", "y2023.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("y2024")) return mockPost("y2024", { date: "2024-06-01" });
      return mockPost("y2023", { date: "2023-06-01" });
    });
  });

  it("returns only posts from the given year", () => {
    expect(getBlogPostsByYear(2024).map((p) => p.slug)).toEqual(["y2024"]);
  });

  it("returns empty array for a year with no posts", () => {
    expect(getBlogPostsByYear(2020)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/lib/blog.test.ts
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/lib/blog.test.ts
git commit -m "test: add blog utility tests for tags, navigation, and years"
```

---

## Task 3: Blog Utility Tests — pagination

**Files:**
- Modify: `test/lib/blog.test.ts`

- [ ] **Step 1: Append the following to `test/lib/blog.test.ts`**

```typescript
import {
  getPaginatedPosts,
  getPaginatedPostsByCategory,
  getPaginatedPostsByYear,
} from "@/src/lib/blog";

// Helper: generate N mock slugs with descending dates
const setupNPosts = (n: number) => {
  const files = Array.from({ length: n }, (_, i) => `post-${i}.mdx`);
  vi.mocked(fs.readdirSync).mockReturnValue(files as never);
  vi.mocked(fs.existsSync).mockReturnValue(false);
  vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
    const match = String(filePath).match(/post-(\d+)/);
    const idx = match ? Number(match[1]) : 0;
    const date = new Date(2024, 0, n - idx).toISOString().split("T")[0];
    return mockPost(`post-${idx}`, { date });
  });
};

describe("getPaginatedPosts", () => {
  it("returns correct slice for page 1", () => {
    setupNPosts(15);
    const result = getPaginatedPosts(1, 12);
    expect(result.items).toHaveLength(12);
    expect(result.currentPage).toBe(1);
  });

  it("returns correct slice for page 2", () => {
    setupNPosts(15);
    const result = getPaginatedPosts(2, 12);
    expect(result.items).toHaveLength(3);
    expect(result.currentPage).toBe(2);
  });

  it("clamps page 0 to page 1", () => {
    setupNPosts(5);
    const result = getPaginatedPosts(0, 12);
    expect(result.currentPage).toBe(1);
  });

  it("clamps page beyond total to last page", () => {
    setupNPosts(5);
    const result = getPaginatedPosts(99, 12);
    expect(result.currentPage).toBe(1);
  });

  it("hasNextPage is true when not on last page", () => {
    setupNPosts(15);
    const result = getPaginatedPosts(1, 12);
    expect(result.hasNextPage).toBe(true);
  });

  it("hasPreviousPage is false on page 1", () => {
    setupNPosts(15);
    const result = getPaginatedPosts(1, 12);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("hasPreviousPage is true on page 2", () => {
    setupNPosts(15);
    const result = getPaginatedPosts(2, 12);
    expect(result.hasPreviousPage).toBe(true);
  });
});

describe("getPaginatedPostsByCategory", () => {
  it("filters posts by category tags before paginating", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["dev.mdx", "other.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("dev")) return mockPost("dev", { date: "2024-01-01", tags: "web-development" });
      return mockPost("other", { date: "2023-01-01", tags: "agile" });
    });
    const result = getPaginatedPostsByCategory("development", 1, 12);
    expect(result.items.map((p) => p.slug)).toContain("dev");
    expect(result.items.map((p) => p.slug)).not.toContain("other");
  });

  it("returns empty result for unknown category slug", () => {
    setupNPosts(3);
    const result = getPaginatedPostsByCategory("nonexistent", 1, 12);
    expect(result.items).toHaveLength(0);
    expect(result.totalItems).toBe(0);
  });
});

describe("getPaginatedPostsByYear", () => {
  it("filters posts by year before paginating", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["y2024.mdx", "y2023.mdx"] as never);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("y2024")) return mockPost("y2024", { date: "2024-06-01" });
      return mockPost("y2023", { date: "2023-06-01" });
    });
    const result = getPaginatedPostsByYear(2024, 1, 12);
    expect(result.items.map((p) => p.slug)).toEqual(["y2024"]);
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/lib/blog.test.ts
```

Expected: all pagination tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/lib/blog.test.ts
git commit -m "test: add pagination utility tests"
```

---

## Task 4: Pagination Component Tests

**Files:**
- Create: `test/components/blog/Pagination.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Pagination from "@/src/components/blog/Pagination";

describe("Pagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} baseUrl="/blog/latest/" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when totalPages is 0", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} baseUrl="/blog/latest/" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all page numbers when totalPages <= 7", () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/blog/latest/" />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("renders ellipsis when totalPages > 7 and current page is in the middle", () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl="/blog/latest/" />);
    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("renders only trailing ellipsis when on page 1 with many pages", () => {
    render(<Pagination currentPage={1} totalPages={10} baseUrl="/blog/latest/" />);
    expect(screen.getAllByText("...")).toHaveLength(1);
  });

  it("renders only leading ellipsis when on last page with many pages", () => {
    render(<Pagination currentPage={10} totalPages={10} baseUrl="/blog/latest/" />);
    expect(screen.getAllByText("...")).toHaveLength(1);
  });

  it("disables Previous button on page 1", () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/blog/latest/" />);
    const prev = screen.getByRole("button", { name: /previous/i });
    expect(prev).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} baseUrl="/blog/latest/" />);
    const next = screen.getByRole("button", { name: /next/i });
    expect(next).toBeDisabled();
  });

  it("Previous button links to baseUrl + (currentPage - 1)", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />);
    const prev = screen.getByRole("link", { name: /previous/i });
    expect(prev).toHaveAttribute("href", "/blog/latest/2");
  });

  it("Next button links to baseUrl + (currentPage + 1)", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />);
    const next = screen.getByRole("link", { name: /next/i });
    expect(next).toHaveAttribute("href", "/blog/latest/4");
  });

  it("active page is rendered as a span (not a link) and is disabled", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />);
    const activePage = screen.getByRole("button", { name: "3" });
    expect(activePage).toBeDisabled();
    // Should not be wrapped in an anchor
    expect(activePage.closest("a")).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/components/blog/Pagination.test.tsx
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/components/blog/Pagination.test.tsx
git commit -m "test: add Pagination component tests"
```

---

## Task 5: CategoryNavigation Component Tests

**Files:**
- Create: `test/components/blog/CategoryNavigation.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryNavigation from "@/src/components/blog/CategoryNavigation";

vi.mock("@/src/lib/blog", () => ({
  getAllCategories: () => [
    { slug: "development", label: "Development", tags: [], description: "" },
    { slug: "design", label: "Design", tags: [], description: "" },
  ],
  getCategoryPostCounts: () => ({ development: 5, design: 3 }),
}));

describe("CategoryNavigation", () => {
  it("renders a badge for each category", () => {
    render(<CategoryNavigation />);
    expect(screen.getByText(/Development/)).toBeInTheDocument();
    expect(screen.getByText(/Design/)).toBeInTheDocument();
  });

  it("each badge links to /blog/category/<slug>/1", () => {
    render(<CategoryNavigation />);
    expect(screen.getByRole("link", { name: /Development/ })).toHaveAttribute(
      "href",
      "/blog/category/development/1"
    );
    expect(screen.getByRole("link", { name: /Design/ })).toHaveAttribute(
      "href",
      "/blog/category/design/1"
    );
  });

  it("displays post count alongside category label", () => {
    render(<CategoryNavigation />);
    expect(screen.getByText(/Development \(5\)/)).toBeInTheDocument();
    expect(screen.getByText(/Design \(3\)/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/components/blog/CategoryNavigation.test.tsx
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/components/blog/CategoryNavigation.test.tsx
git commit -m "test: add CategoryNavigation component tests"
```

---

## Task 6: YearFilter Component Tests

**Files:**
- Create: `test/components/blog/YearFilter.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import YearFilter from "@/src/components/blog/YearFilter";

vi.mock("@/src/lib/blog", () => ({
  getAllPostYears: () => [2024, 2023],
  getYearPostCounts: () => ({ 2024: 8, 2023: 4 }),
}));

describe("YearFilter", () => {
  it("renders a badge for each year", () => {
    render(<YearFilter />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it("each badge links to /blog/year/<year>/1", () => {
    render(<YearFilter />);
    expect(screen.getByRole("link", { name: /2024/ })).toHaveAttribute(
      "href",
      "/blog/year/2024/1"
    );
    expect(screen.getByRole("link", { name: /2023/ })).toHaveAttribute(
      "href",
      "/blog/year/2023/1"
    );
  });

  it("displays post count alongside year label", () => {
    render(<YearFilter />);
    expect(screen.getByText(/2024 \(8\)/)).toBeInTheDocument();
    expect(screen.getByText(/2023 \(4\)/)).toBeInTheDocument();
  });
});

describe("YearFilter with no years", () => {
  it("returns null when getAllPostYears returns an empty array", () => {
    vi.mock("@/src/lib/blog", () => ({
      getAllPostYears: () => [],
      getYearPostCounts: () => ({}),
    }));
    const { container } = render(<YearFilter />);
    expect(container.firstChild).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/components/blog/YearFilter.test.tsx
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/components/blog/YearFilter.test.tsx
git commit -m "test: add YearFilter component tests"
```

---

## Task 7: StandardLayout Component Tests

**Files:**
- Create: `test/components/shared/StandardLayout.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

vi.mock("@/src/components/shared/organisms/Navigationbar", () => ({
  default: () => <nav data-testid="navigation-bar">NavBar</nav>,
}));

vi.mock("@/src/components/shared/organisms/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/src/components/shared/atoms/Container", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

describe("StandardLayout", () => {
  it("renders NavigationBar", () => {
    render(<StandardLayout>content</StandardLayout>);
    expect(screen.getByTestId("navigation-bar")).toBeInTheDocument();
  });

  it("renders Footer", () => {
    render(<StandardLayout>content</StandardLayout>);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders children inside the layout", () => {
    render(<StandardLayout><span data-testid="child">hello</span></StandardLayout>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- test/components/shared/StandardLayout.test.tsx
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add test/components/shared/StandardLayout.test.tsx
git commit -m "test: add StandardLayout component tests"
```

---

## Task 8: Full Test Suite Verification

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: all tests pass including the existing `test/index.test.tsx` snapshot test.

- [ ] **Step 2: Run code quality check**

```bash
npm run check
```

Expected: no linting or formatting errors.

- [ ] **Step 3: Final commit if any auto-fixes were applied**

```bash
git add -A
git commit -m "chore: fix linting after test suite addition"
```

Only run this step if `npm run check` modified any files.
