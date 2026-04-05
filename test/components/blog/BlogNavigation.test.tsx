import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogNavigation from "@/src/components/blog/BlogNavigation";
import type { BlogPost } from "@/src/types/blog";

// Helper to create a test BlogPost
const makePost = (overrides: Partial<BlogPost> = {}): BlogPost => ({
	slug: "test-post",
	frontmatter: {
		title: "Test Post",
		description: "A test post description",
		date: "2024-01-01",
		author: "Test Author",
		tags: ["test"],
		...overrides.frontmatter,
	},
	content: "Test content",
	readingTime: "1 min read",
	excerpt: "Test excerpt",
	...overrides,
});

describe("BlogNavigation", () => {
	it("renders nothing when both previous and next are null", () => {
		const { container } = render(
			<BlogNavigation previousPost={null} nextPost={null} />,
		);
		const nav = container.querySelector("nav");
		expect(nav?.querySelector("a")).not.toBeInTheDocument();
	});

	it("renders previous link with correct href", () => {
		const previousPost = makePost({
			slug: "previous-post",
			frontmatter: { title: "Previous Post" },
		});
		render(<BlogNavigation previousPost={previousPost} nextPost={null} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/blog/previous-post");
	});

	it("renders next link with correct href", () => {
		const nextPost = makePost({
			slug: "next-post",
			frontmatter: { title: "Next Post" },
		});
		render(<BlogNavigation previousPost={null} nextPost={nextPost} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/blog/next-post");
	});

	it("renders both links when both provided", () => {
		const previousPost = makePost({
			slug: "previous-post",
			frontmatter: { title: "Previous Post" },
		});
		const nextPost = makePost({
			slug: "next-post",
			frontmatter: { title: "Next Post" },
		});
		render(
			<BlogNavigation previousPost={previousPost} nextPost={nextPost} />,
		);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/blog/previous-post");
		expect(links[1]).toHaveAttribute("href", "/blog/next-post");
	});

	it("renders 'Previous' label for previous post", () => {
		const previousPost = makePost({
			slug: "previous-post",
			frontmatter: { title: "Previous Post" },
		});
		render(<BlogNavigation previousPost={previousPost} nextPost={null} />);
		expect(screen.getByText("Previous")).toBeInTheDocument();
	});

	it("renders 'Next' label for next post", () => {
		const nextPost = makePost({
			slug: "next-post",
			frontmatter: { title: "Next Post" },
		});
		render(<BlogNavigation previousPost={null} nextPost={nextPost} />);
		expect(screen.getByText("Next")).toBeInTheDocument();
	});
});
