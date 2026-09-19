import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AllPostsPage } from "@/src/app/blog/all/page";
import { readPublishedBlogContent } from "../../helpers/blog-content";

describe("AllPostsPage", () => {
	it("identifies itself as the complete archive and renders every post", () => {
		const publishedPosts = readPublishedBlogContent();
		render(<AllPostsPage />);

		expect(screen.getByRole("heading", { name: "All Posts" })).toBeDefined();
		expect(
			screen.getByText(
				`${publishedPosts.length} ${publishedPosts.length === 1 ? "post" : "posts"}`,
			),
		).toBeDefined();

		const archiveLinks = screen
			.getAllByRole("link")
			.map((link) => link.getAttribute("href"))
			.filter((href): href is string => href?.startsWith("/blog/") ?? false);
		expect(archiveLinks).toEqual(
			publishedPosts
				.sort(
					(a, b) =>
						new Date(b.frontmatter.date).getTime() -
						new Date(a.frontmatter.date).getTime(),
				)
				.map((post) => `/blog/${post.slug}`),
		);
	});
});
