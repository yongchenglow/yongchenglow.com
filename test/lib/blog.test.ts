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
