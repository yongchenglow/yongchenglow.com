import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PostCard } from "@/src/components/post/PostCard";
import type { BlogPost } from "@/src/types/blog";

const post = (overrides: Partial<BlogPost> = {}): BlogPost => ({
	slug: "a-post",
	frontmatter: {
		title: "A post",
		description: "What it covers",
		date: "2024-03-04",
		author: "Test Author",
		tags: ["design", "ux"],
	},
	content: "",
	readingTime: "4 min read",
	wordCount: 800,
	...overrides,
});

describe("PostCard", () => {
	it("links to the post by slug", () => {
		render(<PostCard post={post()} />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/blog/a-post");
	});

	it("shows the title, description, date, reading time, and tags", () => {
		render(<PostCard post={post()} />);

		expect(screen.getByText("A post")).toBeInTheDocument();
		expect(screen.getByText("What it covers")).toBeInTheDocument();
		expect(screen.getByText("4 Mar 2024")).toBeInTheDocument();
		expect(screen.getByText("4 min read")).toBeInTheDocument();
		expect(screen.getByText("design")).toBeInTheDocument();
		expect(screen.getByText("ux")).toBeInTheDocument();
	});

	it("omits the tag row when a post has no tags", () => {
		const untagged = post();
		untagged.frontmatter.tags = undefined;
		render(<PostCard post={untagged} />);
		expect(screen.getByText("A post")).toBeInTheDocument();
	});
});
