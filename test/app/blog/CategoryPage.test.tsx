import { describe, expect, it } from "bun:test";
import { BLOG_CATEGORIES, BLOG_CONFIG } from "@/src/config/blog";
import { readPublishedBlogContent } from "../../helpers/blog-content";
import { redirectMock } from "../../navigation-mocks";

const { CategoryPageWithPagination, generateStaticParams } = await import(
	"@/src/app/blog/category/[category]/[page]/page"
);
const { CategoryPage } = await import(
	"@/src/app/blog/category/[category]/page"
);

describe("CategoryPageWithPagination", () => {
	it("returns not found when the requested page is beyond the category range", async () => {
		await expect(
			CategoryPageWithPagination({
				params: Promise.resolve({ category: "development", page: "99" }),
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");
	});

	it("returns not found when the page is not a canonical positive integer", async () => {
		await expect(
			CategoryPageWithPagination({
				params: Promise.resolve({ category: "development", page: "1abc" }),
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");
	});

	it("returns not found for an unknown category", async () => {
		await expect(
			CategoryPageWithPagination({
				params: Promise.resolve({ category: "unknown", page: "1" }),
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");
	});

	it("generates exactly the category pages backed by published content", async () => {
		const posts = readPublishedBlogContent();
		const expected: { category: string; page: string }[] = [];

		for (const category of Object.values(BLOG_CATEGORIES)) {
			const count = posts.filter((post) =>
				post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
			).length;
			const pages = Math.ceil(count / BLOG_CONFIG.postsPerPage);
			for (let page = 1; page <= pages; page++) {
				expected.push({ category: category.slug, page: String(page) });
			}
		}

		expect(await generateStaticParams()).toEqual(expected);
	});

	it("redirects a known category base route to its first page", async () => {
		redirectMock.mockClear();

		await CategoryPage({
			params: Promise.resolve({ category: "development" }),
		});

		expect(redirectMock).toHaveBeenCalledWith("/blog/category/development/1");
	});
});
