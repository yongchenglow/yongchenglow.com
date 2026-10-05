import { describe, expect, it } from "bun:test";
import {
	BlogFrontmatterError,
	BlogPostNotFoundError,
	createBlogRepository,
	InvalidBlogSlugError,
} from "@/src/lib/blog";
import { inMemoryContentSource } from "@/src/lib/blog-source";

const postFile = (
	slug: string,
	overrides: Record<string, unknown> = {},
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

/** A repository over in-memory content, one per case. */
const repoWith = (files: Record<string, string>) =>
	createBlogRepository(inMemoryContentSource(files));

/** Builds a fixture set from `slug -> frontmatter overrides` pairs. */
const withPosts = (
	entries: Array<[string, Record<string, unknown>?]>,
): Record<string, string> =>
	Object.fromEntries(
		entries.map(([slug, overrides]) => [
			`${slug}.mdx`,
			postFile(slug, overrides ?? {}),
		]),
	);

describe("getAllBlogSlugs", () => {
	it("returns slugs for .mdx files", () => {
		const blog = repoWith(withPosts([["post-a"], ["post-b"]]));
		expect(blog.getAllBlogSlugs()).toEqual(["post-a", "post-b"]);
	});

	it("returns slugs for .md files", () => {
		const blog = repoWith({ "post-a.md": postFile("post-a") });
		expect(blog.getAllBlogSlugs()).toEqual(["post-a"]);
	});

	it("ignores files without .mdx or .md extension", () => {
		const blog = repoWith({
			"image.png": "not a post",
			...withPosts([["post-a"]]),
		});
		expect(blog.getAllBlogSlugs()).toEqual(["post-a"]);
	});

	it("ignores blog instruction files", () => {
		const blog = repoWith({
			"AGENTS.md": "instructions",
			"CLAUDE.md": "instructions",
			...withPosts([["post-a"]]),
		});
		expect(blog.getAllBlogSlugs()).toEqual(["post-a"]);
	});
});

describe("getAllBlogPosts", () => {
	it("sorts posts by date descending", () => {
		const blog = repoWith(
			withPosts([
				["old", { date: "2023-01-01" }],
				["new", { date: "2024-06-01" }],
			]),
		);
		const posts = blog.getAllBlogPosts();
		expect(posts[0].slug).toBe("new");
		expect(posts[1].slug).toBe("old");
	});

	it("filters out draft posts by default", () => {
		const blog = repoWith(
			withPosts([["draft", { draft: true }], ["published"]]),
		);
		const posts = blog.getAllBlogPosts();
		expect(posts.map((p) => p.slug)).not.toContain("draft");
		expect(posts.map((p) => p.slug)).toContain("published");
	});

	it("includes draft posts when includesDrafts is true", () => {
		const blog = repoWith(withPosts([["draft", { draft: true }]]));
		expect(blog.getAllBlogPosts(true).map((p) => p.slug)).toContain("draft");
	});

	it("reflects frontmatter changes immediately during development", () => {
		const mutableEnv = process.env as { NODE_ENV?: string };
		const originalNodeEnv = mutableEnv.NODE_ENV;
		mutableEnv.NODE_ENV = "development";

		try {
			let source = withPosts([["changing", { draft: true }]]);
			const blog = createBlogRepository({
				listFiles: () => Object.keys(source),
				readFile: (fileName) => source[fileName],
			});

			expect(blog.getAllBlogPosts()).toHaveLength(0);

			source = withPosts([["changing"]]);
			expect(blog.getAllBlogPosts().map((post) => post.slug)).toEqual([
				"changing",
			]);
		} finally {
			mutableEnv.NODE_ENV = originalNodeEnv;
		}
	});
});

describe("getFeaturedPost", () => {
	it("returns the post with featured: true when one exists", () => {
		const blog = repoWith(
			withPosts([
				["a", { date: "2023-01-01" }],
				["featured", { date: "2024-01-01", featured: true }],
			]),
		);
		expect(blog.getFeaturedPost()?.slug).toBe("featured");
	});

	it("falls back to the first (most recent) post when no featured post exists", () => {
		const blog = repoWith(
			withPosts([
				["old", { date: "2023-01-01" }],
				["new", { date: "2024-06-01" }],
			]),
		);
		expect(blog.getFeaturedPost()?.slug).toBe("new");
	});

	it("returns null when there are no posts", () => {
		expect(repoWith({}).getFeaturedPost()).toBeNull();
	});
});

describe("getBlogPostsByTag", () => {
	const blog = repoWith(
		withPosts([
			["a", { date: "2024-01-01", tags: "react, typescript" }],
			["b", { date: "2023-01-01", tags: "vue" }],
		]),
	);

	it("returns posts that include the given tag", () => {
		expect(blog.getBlogPostsByTag("react").map((p) => p.slug)).toContain("a");
	});

	it("returns empty array when no posts match the tag", () => {
		expect(blog.getBlogPostsByTag("angular")).toHaveLength(0);
	});
});

describe("getBlogPostNavigation", () => {
	const blog = repoWith(
		withPosts([
			["newest", { date: "2024-03-01" }],
			["middle", { date: "2024-02-01" }],
			["oldest", { date: "2024-01-01" }],
		]),
	);

	it("returns correct previous and next for a middle post", () => {
		const nav = blog.getBlogPostNavigation("middle");
		expect(nav.previous?.slug).toBe("oldest");
		expect(nav.next?.slug).toBe("newest");
	});

	it("returns null for previous on the first (oldest) post", () => {
		expect(blog.getBlogPostNavigation("oldest").previous).toBeNull();
	});

	it("returns null for next on the last (newest) post", () => {
		expect(blog.getBlogPostNavigation("newest").next).toBeNull();
	});

	it("returns no navigation for a slug outside the published collection", () => {
		expect(blog.getBlogPostNavigation("missing-post")).toEqual({
			previous: null,
			next: null,
		});
	});
});

describe("getBlogPost", () => {
	it("returns a BlogPost with the correct slug", () => {
		const post = repoWith(withPosts([["test-slug"]])).getBlogPost("test-slug");
		expect(post.slug).toBe("test-slug");
	});

	it("prefers the .mdx file when both extensions exist", () => {
		const blog = repoWith({
			"dual.mdx": postFile("dual", { title: "from mdx" }),
			"dual.md": postFile("dual", { title: "from md" }),
		});
		expect(blog.getBlogPost("dual").frontmatter.title).toBe("from mdx");
	});

	it("falls back to .md when no .mdx file exists", () => {
		const blog = repoWith({ "md-post.md": postFile("md-post") });
		expect(blog.getBlogPost("md-post").slug).toBe("md-post");
	});

	it("truncates excerpt to 200 characters", () => {
		const longContent = "A".repeat(300);
		const blog = repoWith({
			"long-excerpt.mdx": `---\ntitle: test\ndescription: desc\ndate: 2024-01-01\nauthor: Test\ntags: []\n---\n${longContent}`,
		});
		const post = blog.getBlogPost("long-excerpt");
		expect(post.excerpt?.length).toBeLessThanOrEqual(200);
	});

	it("sets readingTime as non-empty string", () => {
		const post = repoWith(withPosts([["reading-test"]])).getBlogPost(
			"reading-test",
		);
		expect(typeof post.readingTime).toBe("string");
		expect(post.readingTime.length).toBeGreaterThan(0);
	});
});

describe("getBlogPost validation", () => {
	it("throws BlogPostNotFoundError when no content file exists", () => {
		const blog = repoWith({});
		expect(() => blog.getBlogPost("no-such-post")).toThrow(
			BlogPostNotFoundError,
		);
		expect(() => blog.getBlogPost("no-such-post")).toThrow(
			'Blog post not found: "no-such-post"',
		);
	});

	it("does not read any file when the post is missing", () => {
		let readCount = 0;
		const blog = createBlogRepository({
			listFiles: () => ["post-a.mdx"],
			readFile: () => {
				readCount += 1;
				return postFile("post-a");
			},
		});

		expect(() => blog.getBlogPost("no-such-post")).toThrow(
			BlogPostNotFoundError,
		);
		expect(readCount).toBe(0);
	});

	it.each([
		["../../etc/passwd", "path traversal"],
		["nested/slug", "path separator"],
		["Upper-Case", "uppercase letters"],
		["has_underscore", "underscore"],
		["", "empty string"],
	])("rejects %s (%s) with InvalidBlogSlugError", (slug) => {
		const blog = repoWith(withPosts([["post-a"]]));
		expect(() => blog.getBlogPost(slug)).toThrow(InvalidBlogSlugError);
	});

	it("rejects an invalid slug before reading anything", () => {
		let readCount = 0;
		const blog = createBlogRepository({
			listFiles: () => ["post-a.mdx"],
			readFile: () => {
				readCount += 1;
				return postFile("post-a");
			},
		});

		expect(() => blog.getBlogPost("../../etc/passwd")).toThrow(
			InvalidBlogSlugError,
		);
		expect(readCount).toBe(0);
	});

	it("throws BlogFrontmatterError naming the file and the missing field", () => {
		// `description` and `author` are required by BlogFrontmatterSchema.
		const blog = repoWith({
			"bad-frontmatter.mdx":
				'---\ntitle: "Only a title"\ndate: "2024-01-01"\n---\nBody',
		});

		expect(() => blog.getBlogPost("bad-frontmatter")).toThrow(
			BlogFrontmatterError,
		);

		let message = "";
		try {
			blog.getBlogPost("bad-frontmatter");
		} catch (error) {
			message = (error as Error).message;
		}

		expect(message).toContain("bad-frontmatter.mdx");
		expect(message).toContain("description");
		expect(message).toContain("author");
	});

	it("reports the offending field for a wrong-typed value", () => {
		const blog = repoWith({
			"bad-tags.mdx":
				'---\ntitle: "T"\ndescription: "D"\ndate: "2024-01-01"\nauthor: "A"\ntags: "not-an-array"\n---\nBody',
		});

		let message = "";
		try {
			blog.getBlogPost("bad-tags");
		} catch (error) {
			message = (error as Error).message;
		}

		expect(message).toContain("bad-tags.mdx");
		expect(message).toContain("tags");
	});

	it("normalises an unquoted YAML date to YYYY-MM-DD", () => {
		const blog = repoWith({
			"unquoted.mdx":
				'---\ntitle: "T"\ndescription: "D"\ndate: 2024-03-04\nauthor: "A"\n---\nBody',
		});
		expect(blog.getBlogPost("unquoted").frontmatter.date).toBe("2024-03-04");
	});

	it("accepts frontmatter that satisfies the schema", () => {
		const blog = repoWith(withPosts([["good-post"]]));
		expect(blog.getBlogPost("good-post").frontmatter.title).toBe("good-post");
	});
});

describe("getCategoryMetadata", () => {
	const blog = repoWith({});

	it("returns metadata for known category slug", () => {
		const metadata = blog.getCategoryMetadata("development");
		expect(metadata).not.toBeNull();
		expect(metadata?.slug).toBe("development");
		expect(metadata?.label).toBe("Development");
	});

	it("returns null for unknown slug", () => {
		expect(blog.getCategoryMetadata("nonexistent-category")).toBeNull();
	});
});

describe("getBlogPostsByCategory", () => {
	const blog = repoWith(
		withPosts([
			["dev-post", { date: "2024-01-01", tags: "web-development" }],
			["process-post", { date: "2024-01-01", tags: "agile" }],
			["other-post", { date: "2024-01-01", tags: "random-tag" }],
		]),
	);

	it("returns posts matching category tags", () => {
		const posts = blog.getBlogPostsByCategory("development");
		expect(posts.map((p) => p.slug)).toContain("dev-post");
		expect(posts.map((p) => p.slug)).not.toContain("process-post");
	});

	it("returns empty array for unknown category", () => {
		expect(blog.getBlogPostsByCategory("nonexistent-category")).toHaveLength(0);
	});

	it("excludes posts that don't match category tags", () => {
		expect(
			blog.getBlogPostsByCategory("development").map((p) => p.slug),
		).not.toContain("other-post");
	});
});

describe("getCategoryPostCounts", () => {
	const blog = repoWith(
		withPosts([
			["dev-post", { date: "2024-01-01", tags: "web-development" }],
			["process-post", { date: "2024-01-01", tags: "agile" }],
		]),
	);

	it("returns counts keyed by category slug", () => {
		const counts = blog.getCategoryPostCounts();
		expect(counts).toHaveProperty("development");
		expect(counts).toHaveProperty("process");
		expect(counts).toHaveProperty("design");
		expect(counts).toHaveProperty("career");
	});

	it("returns 0 for categories with no posts", () => {
		const counts = blog.getCategoryPostCounts();
		expect(counts.development).toBe(1);
		expect(counts.process).toBe(1);
		expect(counts.design).toBe(0);
		expect(counts.career).toBe(0);
	});
});
