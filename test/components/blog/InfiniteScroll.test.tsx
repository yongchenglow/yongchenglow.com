import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InfiniteScroll from "@/src/components/blog/InfiniteScroll";
import type { BlogPost } from "@/src/types/blog";

// Helper function to create test posts
function makePost(slug: string, title: string = "Test Post"): BlogPost {
	return {
		slug,
		frontmatter: {
			title,
			description: "A test post description",
			date: "2024-01-01",
			author: "Test Author",
			tags: ["test"],
		},
		content: "Test content",
		readingTime: "5 min read",
	};
}

describe("InfiniteScroll", () => {
	it("renders initial posts", () => {
		const initialPosts = [
			makePost("post-1", "First Post"),
			makePost("post-2", "Second Post"),
		];

		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);

		expect(screen.getByText("First Post")).toBeInTheDocument();
		expect(screen.getByText("Second Post")).toBeInTheDocument();
	});

	it('shows "Scroll for more" when hasMore is true', () => {
		const initialPosts = [makePost("post-1", "First Post")];

		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);

		expect(screen.getByText("Scroll for more")).toBeInTheDocument();
	});

	it('shows "No more posts to load" when on last page', () => {
		const initialPosts = [makePost("post-1", "First Post")];

		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={3}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);

		expect(screen.getByText("No more posts to load")).toBeInTheDocument();
	});

	it("no sentinel when already on last page", () => {
		const initialPosts = [makePost("post-1", "First Post")];

		// Test when totalPages === 1 (only one page)
		const { rerender } = render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={1}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);

		expect(screen.queryByText("Scroll for more")).not.toBeInTheDocument();
		expect(screen.getByText("No more posts to load")).toBeInTheDocument();

		// Test when currentPage === totalPages
		rerender(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={2}
				totalPages={2}
				baseUrl="/blog/latest/"
				loadMorePosts={vi.fn()}
			/>,
		);

		expect(screen.queryByText("Scroll for more")).not.toBeInTheDocument();
		expect(screen.getByText("No more posts to load")).toBeInTheDocument();
	});

	it("calls loadMorePosts when observer fires", async () => {
		const initialPosts = [makePost("post-1", "Initial Post")];
		const newPosts = [
			makePost("post-2", "Loaded Post 1"),
			makePost("post-3", "Loaded Post 2"),
		];
		const loadMorePosts = vi.fn().mockResolvedValue(newPosts);

		// Track created observers
		let capturedCallback:
			| ((entries: IntersectionObserverEntry[]) => void)
			| null = null;

		// Mock IntersectionObserver to capture callback
		const OriginalObserver = window.IntersectionObserver;
		window.IntersectionObserver = class MockIntersectionObserver {
			constructor(
				callback: (entries: IntersectionObserverEntry[]) => void,
				_options?: IntersectionObserverInit,
			) {
				capturedCallback = callback;
			}
			observe = vi.fn();
			unobserve = vi.fn();
			disconnect = vi.fn();
			// biome-ignore lint/suspicious/noExplicitAny: Mock class doesn't need full IntersectionObserver type
		} as any;

		render(
			<InfiniteScroll
				initialPosts={initialPosts}
				currentPage={1}
				totalPages={3}
				baseUrl="/blog/latest/"
				loadMorePosts={loadMorePosts}
			/>,
		);

		// Verify initial post is rendered
		expect(screen.getByText("Initial Post")).toBeInTheDocument();

		// Wait for the captured callback to be set (observer created)
		await waitFor(() => {
			expect(capturedCallback).not.toBeNull();
		});

		// Allow effects to run (sync refs)
		await new Promise((resolve) => setTimeout(resolve, 10));

		// Fire the observer callback with isIntersecting: true
		(
			capturedCallback as unknown as (
				entries: IntersectionObserverEntry[],
			) => void
		)([{ isIntersecting: true } as IntersectionObserverEntry]);

		// Wait for loadMorePosts to be called and new posts to render
		await waitFor(() => {
			expect(loadMorePosts).toHaveBeenCalledWith(2);
		});

		await waitFor(() => {
			expect(screen.getByText("Loaded Post 1")).toBeInTheDocument();
			expect(screen.getByText("Loaded Post 2")).toBeInTheDocument();
		});

		// Restore original IntersectionObserver
		window.IntersectionObserver = OriginalObserver;
	});
});
