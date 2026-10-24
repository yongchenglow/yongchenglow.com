import { describe, expect, it } from "bun:test";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { InfiniteScroll } from "@/src/components/blog/InfiniteScroll";
import { LatestPostsView } from "@/src/components/blog/LatestPostsView";
import type { BlogPost } from "@/src/types/blog";
import { vi } from "../../bun-test-utils";

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
		wordCount: 500,
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
				baseUrl="/blog/all/"
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
				baseUrl="/blog/all/"
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
				baseUrl="/blog/all/"
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
				baseUrl="/blog/all/"
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
				baseUrl="/blog/all/"
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
				baseUrl="/blog/all/"
				loadMorePosts={loadMorePosts}
			/>,
		);

		window.history.replaceState(null, "", "/blog/all/1");

		// Verify initial post is rendered
		expect(screen.getByText("Initial Post")).toBeInTheDocument();

		// Wait for the captured callback to be set (observer created)
		await waitFor(() => {
			expect(capturedCallback).not.toBeNull();
		});

		// Fire the observer callback with isIntersecting: true
		await act(async () => {
			(
				capturedCallback as unknown as (
					entries: IntersectionObserverEntry[],
				) => void
			)([{ isIntersecting: true } as IntersectionObserverEntry]);
		});

		// Wait for loadMorePosts to be called and new posts to render
		await waitFor(() => {
			expect(loadMorePosts).toHaveBeenCalledWith(2);
		});

		await waitFor(() => {
			expect(screen.getByText("Loaded Post 1")).toBeInTheDocument();
			expect(screen.getByText("Loaded Post 2")).toBeInTheDocument();
		});

		expect(window.location.pathname).toBe("/blog/all/2");
		expect(screen.getByText("Initial Post")).toBeInTheDocument();

		// Restore original IntersectionObserver
		window.IntersectionObserver = OriginalObserver;
	});
});

describe("LatestPostsView infinite scrolling", () => {
	it("keeps loaded posts and restores the pagination URL when switching modes", async () => {
		let onIntersect: IntersectionObserverCallback;
		const OriginalObserver = window.IntersectionObserver;
		const originalUrl = window.location.href;
		window.IntersectionObserver = class {
			constructor(callback: IntersectionObserverCallback) {
				onIntersect = callback;
			}
			observe() {}
			unobserve() {}
			disconnect() {}
		} as unknown as typeof IntersectionObserver;
		const fetchMock = vi
			.spyOn(globalThis, "fetch")
			.mockResolvedValue(
				Response.json({ items: [makePost("loaded", "Loaded Post")] }),
			);
		try {
			window.history.replaceState(null, "", "/blog/all/1");
			render(
				<LatestPostsView
					paginationResult={{
						items: [makePost("initial", "Initial Post")],
						currentPage: 1,
						totalPages: 2,
						totalItems: 2,
						hasNextPage: true,
						hasPreviousPage: false,
					}}
					baseUrl="/blog/all/"
					apiUrl="/api/blog/latest"
				/>,
			);
			fireEvent.click(
				screen.getByRole("button", { name: "Switch to Infinite Scroll" }),
			);
			await act(async () => {
				onIntersect(
					[{ isIntersecting: true } as IntersectionObserverEntry],
					{} as IntersectionObserver,
				);
			});
			expect(fetchMock).toHaveBeenCalledWith("/api/blog/latest?page=2");
			expect(window.location.pathname).toBe("/blog/all/2");
			expect(screen.getByText("Initial Post")).toBeInTheDocument();
			expect(screen.getByText("Loaded Post")).toBeInTheDocument();
			fireEvent.click(
				screen.getByRole("button", { name: "Switch to Pagination" }),
			);
			expect(window.location.pathname).toBe("/blog/all/1");
			expect(screen.getByText("Initial Post")).toBeInTheDocument();
			expect(screen.queryByText("Loaded Post")).not.toBeInTheDocument();
		} finally {
			fetchMock.mockRestore();
			window.IntersectionObserver = OriginalObserver;
			window.history.replaceState(null, "", originalUrl);
		}
	});
});
