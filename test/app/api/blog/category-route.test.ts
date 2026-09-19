import { describe, expect, it } from "bun:test";
import { GET } from "@/src/app/api/blog/category/route";
import { BLOG_CATEGORIES } from "@/src/config/blog";
import { readPublishedBlogContent } from "../../../helpers/blog-content";

describe("GET /api/blog/category", () => {
	it("rejects a page value that is not a positive integer", async () => {
		const response = await GET(
			new Request(
				"http://localhost/api/blog/category?category=development&page=1abc",
			),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: "Invalid page number" });
	});

	it("requires a category", async () => {
		const response = await GET(
			new Request("http://localhost/api/blog/category?page=1"),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "Category parameter required",
		});
	});

	it("returns exactly the published posts belonging to a category", async () => {
		const response = await GET(
			new Request(
				"http://localhost/api/blog/category?category=development&page=1",
			),
		);
		const body = await response.json();
		const expectedSlugs = readPublishedBlogContent()
			.filter((post) =>
				post.frontmatter.tags?.some((tag) =>
					BLOG_CATEGORIES.development.tags.includes(tag),
				),
			)
			.sort(
				(a, b) =>
					new Date(b.frontmatter.date).getTime() -
					new Date(a.frontmatter.date).getTime(),
			)
			.map((post) => post.slug);

		expect(response.status).toBe(200);
		expect(body.items.map((post: { slug: string }) => post.slug)).toEqual(
			expectedSlugs,
		);
		expect(body.totalItems).toBe(expectedSlugs.length);
	});

	it("returns an empty result for an unknown category", async () => {
		const response = await GET(
			new Request("http://localhost/api/blog/category?category=unknown&page=1"),
		);

		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({
			items: [],
			currentPage: 1,
			totalPages: 0,
			totalItems: 0,
		});
	});
});
