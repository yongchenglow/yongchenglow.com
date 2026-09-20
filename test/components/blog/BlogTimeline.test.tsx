import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { BlogTimeline } from "@/src/components/blog/BlogTimeline";
import type { BlogPost } from "@/src/types/blog";

const post = (slug: string, title: string, date: string): BlogPost => ({
	slug,
	frontmatter: {
		title,
		description: `${title} description`,
		date,
		author: "test",
		tags: ["product-management"],
	},
	content: "Body",
	readingTime: "2 min read",
	wordCount: 200,
});

describe("BlogTimeline", () => {
	it("renders a flat article list in the supplied order", () => {
		render(
			<BlogTimeline
				posts={[
					post("newer", "Newer article", "2026-09-19"),
					post("older", "Older article", "2022-03-02"),
				]}
			/>,
		);

		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/blog/newer");
		expect(links[1]).toHaveAttribute("href", "/blog/older");
		expect(screen.queryByRole("heading", { name: "2026" })).toBeNull();
		expect(screen.queryByRole("heading", { name: "2022" })).toBeNull();
	});
});
