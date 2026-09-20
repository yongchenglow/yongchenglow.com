import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import Index from "@/src/app/page";
import { readPublishedBlogContent } from "./helpers/blog-content";

describe("Index", () => {
	it("shows the configured featured post", () => {
		const posts = readPublishedBlogContent().sort(
			(a, b) =>
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime(),
		);
		const featured =
			posts.find((post) => post.frontmatter.featured) ?? posts[0];

		render(<Index />);

		expect(
			screen.getByRole("link", {
				name: new RegExp(featured.frontmatter.title),
			}),
		).toHaveAttribute("href", `/blog/${featured.slug}`);
	});

	it("does not nest interactive controls inside links", () => {
		const { container } = render(<Index />);
		expect(container.querySelector("a button")).toBeNull();
	});
});
