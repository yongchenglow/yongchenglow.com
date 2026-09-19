import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { BlogPage } from "@/src/app/blog/page";
import { readPublishedBlogContent } from "../../helpers/blog-content";

describe("BlogPage", () => {
	it("shows the featured post once followed by the four newest other posts", () => {
		const posts = readPublishedBlogContent().sort(
			(a, b) =>
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime(),
		);
		const featured =
			posts.find((post) => post.frontmatter.featured) ?? posts[0];
		const expectedHrefs = [
			`/blog/${featured.slug}`,
			...posts
				.filter((post) => post.slug !== featured.slug)
				.slice(0, 4)
				.map((post) => `/blog/${post.slug}`),
		];
		const postHrefs = new Set(posts.map((post) => `/blog/${post.slug}`));

		const { container } = render(<BlogPage />);
		const actualHrefs = Array.from(container.querySelectorAll("a"))
			.map((link) => link.getAttribute("href"))
			.filter((href): href is string => href !== null && postHrefs.has(href));

		expect(actualHrefs).toEqual(expectedHrefs);
	});
});
