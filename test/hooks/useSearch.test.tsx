import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { act, renderHook } from "@testing-library/react";
import { useSearch } from "@/src/hooks/useSearch";
import { vi } from "../bun-test-utils";

const originalFetch = globalThis.fetch;

const searchablePost = (
	id: string,
	overrides: Partial<{
		title: string;
		description: string;
		content: string;
	}> = {},
) => ({
	id,
	title: overrides.title ?? `Title ${id}`,
	subtitle: "",
	description: overrides.description ?? `Description ${id}`,
	content: overrides.content ?? "",
	tags: [],
	date: "2026-09-19",
	url: `/blog/${id}`,
});

beforeEach(() => {
	globalThis.fetch = vi.fn() as unknown as typeof globalThis.fetch;
});

afterEach(() => {
	globalThis.fetch = originalFetch;
	vi.restoreAllMocks();
});

describe("useSearch", () => {
	it("returns a post only once when it matches multiple fields", async () => {
		vi.mocked(globalThis.fetch).mockResolvedValue({
			ok: true,
			json: async () => ({
				posts: {
					one: searchablePost("one", {
						title: "Shared phrase",
						description: "Shared phrase",
					}),
				},
				timestamp: 1,
			}),
		} as Response);
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.search("shared");
		});

		expect(result.current.results.map((post) => post.id)).toEqual(["one"]);
	});

	it("limits the merged results across all indexed fields", async () => {
		const posts = Object.fromEntries([
			...Array.from({ length: 10 }, (_, index) => {
				const id = `title-${index}`;
				return [id, searchablePost(id, { title: "Needle" })];
			}),
			...Array.from({ length: 10 }, (_, index) => {
				const id = `description-${index}`;
				return [id, searchablePost(id, { description: "Needle" })];
			}),
		]);
		vi.mocked(globalThis.fetch).mockResolvedValue({
			ok: true,
			json: async () => ({ posts, timestamp: 1 }),
		} as Response);
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.search("needle");
		});

		expect(result.current.results).toHaveLength(10);
	});

	it("clears results for an empty query without fetching again", async () => {
		vi.mocked(globalThis.fetch).mockResolvedValue({
			ok: true,
			json: async () => ({
				posts: { one: searchablePost("one", { title: "Needle" }) },
				timestamp: 1,
			}),
		} as Response);
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.search("needle");
			await result.current.search("   ");
		});

		expect(result.current.results).toEqual([]);
		expect(globalThis.fetch).toHaveBeenCalledTimes(1);
	});

	it("recovers when loading the search index succeeds on retry", async () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		vi.mocked(globalThis.fetch)
			.mockRejectedValueOnce(new Error("offline"))
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					posts: { one: searchablePost("one", { title: "Needle" }) },
					timestamp: 1,
				}),
			} as Response);
		const { result } = renderHook(() => useSearch());

		await act(async () => {
			await result.current.initializeIndex();
		});
		expect(result.current.isLoading).toBe(false);

		await act(async () => {
			await result.current.search("needle");
		});

		expect(result.current.results.map((post) => post.id)).toEqual(["one"]);
		expect(globalThis.fetch).toHaveBeenCalledTimes(2);
		expect(consoleError).toHaveBeenCalled();
	});
});
