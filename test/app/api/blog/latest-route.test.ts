import { describe, expect, it } from "bun:test";
import { GET } from "@/src/app/api/blog/latest/route";
import { BLOG_CONFIG } from "@/src/config/blog";
import { readPublishedBlogContent } from "../../../helpers/blog-content";

describe("GET /api/blog/latest", () => {
	it("rejects a page value that is not a positive integer", async () => {
		const response = await GET(
			new Request("http://localhost/api/blog/latest?page=1abc"),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: "Invalid page number" });
	});

	it("returns the newest published posts with consistent pagination metadata", async () => {
		const response = await GET(
			new Request("http://localhost/api/blog/latest?page=1"),
		);
		const body = await response.json();
		const expectedPosts = readPublishedBlogContent().sort(
			(a, b) =>
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime(),
		);

		expect(response.status).toBe(200);
		expect(body.items.map((post: { slug: string }) => post.slug)).toEqual(
			expectedPosts.slice(0, BLOG_CONFIG.postsPerPage).map((post) => post.slug),
		);
		expect(body).toMatchObject({
			currentPage: 1,
			totalPages: Math.ceil(expectedPosts.length / BLOG_CONFIG.postsPerPage),
			totalItems: expectedPosts.length,
			hasPreviousPage: false,
			hasNextPage: expectedPosts.length > BLOG_CONFIG.postsPerPage,
		});
	});

	it("clamps a page above the available range to the final page", async () => {
		const response = await GET(
			new Request("http://localhost/api/blog/latest?page=999"),
		);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.currentPage).toBe(Math.max(body.totalPages, 1));
	});
});
