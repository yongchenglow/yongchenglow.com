import { beforeEach, describe, expect, it, vi } from "vitest";

// Must mock before importing the module under test
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return {
    default: {
      ...actual.default,
      readdirSync: vi.fn(),
      existsSync: vi.fn(),
      readFileSync: vi.fn(),
    },
  };
});

vi.mock("node:path", async () => {
  const actual = await vi.importActual<typeof import("node:path")>("node:path");
  return {
    default: {
      ...actual,
      join: (...args: string[]) => args.join("/"),
    },
  };
});

import fs from "node:fs";
import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getFeaturedPost,
  getBlogPostsByTag,
  getBlogPostNavigation,
  getAllPostYears,
  getBlogPostsByYear,
  getPaginatedPosts,
  getPaginatedPostsByCategory,
  getPaginatedPostsByYear,
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
    (fs.readdirSync as any).mockReturnValue(["old.mdx", "new.mdx"]);
    (fs.existsSync as any).mockReturnValue(false);
    (fs.readFileSync as any).mockImplementation((filePath: unknown) => {
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
    (fs.readdirSync as any).mockReturnValue(["draft.mdx", "published.mdx"]);
    (fs.readFileSync as any).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("draft")) return mockPost("draft", { draft: true });
      return mockPost("published");
    });
    const posts = getAllBlogPosts();
    expect(posts.map((p) => p.slug)).not.toContain("draft");
    expect(posts.map((p) => p.slug)).toContain("published");
  });

  it("includes draft posts when includesDrafts is true", () => {
    (fs.readdirSync as any).mockReturnValue(["draft.mdx"]);
    (fs.readFileSync as any).mockReturnValue(mockPost("draft", { draft: true }));
    const posts = getAllBlogPosts(true);
    expect(posts.map((p) => p.slug)).toContain("draft");
  });
});

describe("getFeaturedPost", () => {
  it("returns the post with featured: true when one exists", () => {
    (fs.readdirSync as any).mockReturnValue(["a.mdx", "featured.mdx"]);
    (fs.existsSync as any).mockReturnValue(false);
    (fs.readFileSync as any).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("featured")) return mockPost("featured", { date: "2024-01-01", featured: true });
      return mockPost("a", { date: "2023-01-01" });
    });
    expect(getFeaturedPost()?.slug).toBe("featured");
  });

  it("falls back to the first (most recent) post when no featured post exists", () => {
    (fs.readdirSync as any).mockReturnValue(["old.mdx", "new.mdx"]);
    (fs.existsSync as any).mockReturnValue(false);
    (fs.readFileSync as any).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes("new")) return mockPost("new", { date: "2024-06-01" });
      return mockPost("old", { date: "2023-01-01" });
    });
    expect(getFeaturedPost()?.slug).toBe("new");
  });

  it("returns null when there are no posts", () => {
    (fs.readdirSync as any).mockReturnValue([]);
    expect(getFeaturedPost()).toBeNull();
  });
});

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
