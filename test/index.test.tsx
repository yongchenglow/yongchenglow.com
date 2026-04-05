import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Index from "@/src/app/page";
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

vi.mock("@/src/lib/blog", () => ({
	getFeaturedPost: () => makePost(),
}));

describe("Index", () => {
	it("renders the homepage", () => {
		const { container } = render(<Index />);
		expect(container).toBeInTheDocument();
	});
});
