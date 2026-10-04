import { describe, expect, it } from "bun:test";
import { BLOG_CONFIG } from "@/src/config/blog";
import {
	getAllTags,
	getListing,
	getListingBaseUrl,
	getListingPageCount,
	getListingPosts,
	paginatePosts,
	paginationSummary,
	parsePage,
	postCountText,
} from "@/src/lib/blog-listing";
import type { BlogPost } from "@/src/types/blog";

const fakePosts = (count: number): BlogPost[] =>
	Array.from({ length: count }, (_, i) => ({
		slug: `post-${i}`,
		frontmatter: {
			title: `post-${i}`,
			description: "",
			date: "2024-01-01",
			author: "Test Author",
		},
		content: "",
		readingTime: "1 min read",
		wordCount: 1,
	}));

describe("parsePage", () => {
	it("accepts a canonical positive integer", () => {
		expect(parsePage("1")).toBe(1);
		expect(parsePage("42")).toBe(42);
	});

	it.each([["0"], ["-1"], ["1abc"], ["1.5"], [""], [" "], ["01"]])(
		"rejects %p as a page",
		(raw) => {
			expect(parsePage(raw)).toBeNull();
		},
	);

	it("treats a missing param as no page", () => {
		expect(parsePage(null)).toBeNull();
		expect(parsePage(undefined)).toBeNull();
	});
});

describe("paginatePosts", () => {
	const fifteen = fakePosts(15);

	it("returns the first page slice", () => {
		const result = paginatePosts(fifteen, 1, 12);
		expect(result.items).toHaveLength(12);
		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(2);
		expect(result.hasNextPage).toBe(true);
		expect(result.hasPreviousPage).toBe(false);
	});

	it("returns the trailing slice on the last page", () => {
		const result = paginatePosts(fifteen, 2, 12);
		expect(result.items).toHaveLength(3);
		expect(result.hasNextPage).toBe(false);
		expect(result.hasPreviousPage).toBe(true);
	});

	it("clamps a page below 1 to the first page", () => {
		expect(paginatePosts(fifteen, 0, 12).currentPage).toBe(1);
	});

	it("clamps a page beyond the end to the last page", () => {
		expect(paginatePosts(fakePosts(15), 99, 12).currentPage).toBe(2);
	});

	it("reports one empty page for an empty collection", () => {
		const result = paginatePosts([], 1, 12);
		expect(result.items).toHaveLength(0);
		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(0);
		expect(result.hasNextPage).toBe(false);
	});

	it("defaults to the configured page size", () => {
		const result = paginatePosts(fakePosts(BLOG_CONFIG.postsPerPage + 1), 1);
		expect(result.items).toHaveLength(BLOG_CONFIG.postsPerPage);
	});
});

describe("getListing and its scope", () => {
	it("lists every published post for the all scope", () => {
		const scope = { kind: "all" } as const;
		expect(getListingPosts(scope).length).toBeGreaterThan(0);
		expect(getListing(scope, 1).items.length).toBeLessThanOrEqual(
			BLOG_CONFIG.postsPerPage,
		);
	});

	it("returns nothing for a category that does not exist", () => {
		const scope = { kind: "category", slug: "no-such-category" } as const;
		expect(getListingPosts(scope)).toEqual([]);
		expect(getListingPageCount(scope)).toBe(0);
	});

	it("pages a tag scope to at most one page with the published posts", () => {
		const tag = getAllTags()[0];
		const scope = { kind: "tag", slug: tag } as const;
		const posts = getListingPosts(scope);
		expect(posts.length).toBeGreaterThan(0);
		expect(posts.every((post) => post.frontmatter.tags?.includes(tag))).toBe(
			true,
		);
		expect(getListingPageCount(scope)).toBe(1);
	});
});

describe("getListingBaseUrl", () => {
	it("builds one URL shape per scope", () => {
		expect(getListingBaseUrl({ kind: "all" })).toBe("/blog/all/");
		expect(getListingBaseUrl({ kind: "category", slug: "development" })).toBe(
			"/blog/category/development/",
		);
		expect(getListingBaseUrl({ kind: "tag", slug: "c# basics" })).toBe(
			"/blog/tag/c%23%20basics/",
		);
	});
});

describe("getAllTags", () => {
	it("returns every tag at least one published post carries, without duplicates", () => {
		const tags = getAllTags();
		expect(tags.length).toBeGreaterThan(0);
		expect(new Set(tags).size).toBe(tags.length);
	});
});

describe("count copy", () => {
	it("pluralises around one post", () => {
		expect(postCountText(0)).toBe("0 posts");
		expect(postCountText(1)).toBe("1 post");
		expect(postCountText(7)).toBe("7 posts");
	});

	it("shows the page clause only when there is more than one page", () => {
		const single = paginatePosts(fakePosts(3), 1, 12);
		expect(paginationSummary(single)).toBe("Showing 3 of 3 posts");

		const many = paginatePosts(fakePosts(15), 2, 12);
		expect(paginationSummary(many)).toBe("Showing 3 of 15 posts (Page 2 of 2)");
	});
});
