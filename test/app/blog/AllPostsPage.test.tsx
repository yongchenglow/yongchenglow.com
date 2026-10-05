import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { readPublishedBlogContent } from "../../helpers/blog-content";
import { redirectMock } from "../../navigation-mocks";

const { AllPostsPage: AllPostsIndexPage } = await import(
	"@/src/app/blog/all/page"
);
const { AllPostsPage, generateStaticParams } = await import(
	"@/src/app/blog/all/[page]/page"
);

describe("the archive index", () => {
	it("redirects to the first page", async () => {
		redirectMock.mockClear();

		await AllPostsIndexPage();

		expect(redirectMock).toHaveBeenCalledWith("/blog/all/1");
	});
});

describe("an archive page", () => {
	it("generates one route per page of published posts", async () => {
		const count = readPublishedBlogContent().length;
		const params = await generateStaticParams();

		expect(params).toHaveLength(Math.max(1, Math.ceil(count / 12)));
		expect(params[0]).toEqual({ page: "1" });
	});

	it("renders the archive heading and a card per post on the page", async () => {
		const posts = readPublishedBlogContent();
		render(await AllPostsPage({ params: Promise.resolve({ page: "1" }) }));

		expect(screen.getByRole("heading", { name: "All Posts" })).toBeDefined();
		expect(
			screen.getByText(`Showing ${posts.length} of ${posts.length} posts`),
		).toBeDefined();

		const postLinks = screen
			.getAllByRole("link")
			.map((link) => link.getAttribute("href"))
			.filter((href): href is string => href?.startsWith("/blog/") ?? false);

		expect(postLinks).toEqual(
			posts
				.sort(
					(a, b) =>
						new Date(b.frontmatter.date).getTime() -
						new Date(a.frontmatter.date).getTime(),
				)
				.map((post) => `/blog/${post.slug}`),
		);
	});
});
