"use client";

import FlexSearch from "flexsearch";
import { useCallback, useRef, useState } from "react";
import type { SearchResult, SerializedSearchIndex } from "@/src/types/search";

type FlexSearchDocument = InstanceType<typeof FlexSearch.Document>;

export function useSearch() {
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<SearchResult[]>([]);
	const indexRef = useRef<FlexSearchDocument | null>(null);
	const postsRef = useRef<SerializedSearchIndex["posts"]>({});

	const initializeIndex = useCallback(async () => {
		if (indexRef.current) return;

		try {
			setIsLoading(true);
			const response = await fetch("/search-index.json");
			const data: SerializedSearchIndex = await response.json();

			const index = new FlexSearch.Document({
				document: {
					id: "id",
					index: ["title", "subtitle", "description", "content", "tags"],
				},
			});

			for (const postId in data.posts) {
				// biome-ignore lint/suspicious/noExplicitAny: FlexSearch types are incompatible
				index.add(data.posts[postId] as any);
			}

			indexRef.current = index;
			postsRef.current = data.posts;
		} catch (error) {
			console.error("Failed to load search index:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const search = useCallback(
		async (query: string) => {
			if (!query.trim()) {
				setResults([]);
				return;
			}

			if (!indexRef.current) {
				await initializeIndex();
			}

			if (!indexRef.current) {
				console.error("Search index not available");
				return;
			}

			try {
				const searchResults = await indexRef.current.search(query, {
					limit: 10,
					enrich: true,
				});

				const postIds = new Set<string>();
				const mergedResults: SearchResult[] = [];

				// biome-ignore lint/suspicious/noExplicitAny: FlexSearch search results type is complex
				for (const fieldResults of searchResults as any[]) {
					if (!Array.isArray(fieldResults.result)) continue;

					for (const result of fieldResults.result) {
						const postId = result.id as string;
						if (postIds.has(postId)) continue;

						const post = postsRef.current[postId];
						if (!post) continue;

						postIds.add(postId);
						mergedResults.push({
							id: post.id,
							title: post.title,
							subtitle: post.subtitle,
							description: post.description,
							url: post.url,
							tags: post.tags,
							date: post.date,
						});
					}
				}

				setResults(mergedResults);
			} catch (error) {
				console.error("Search failed:", error);
				setResults([]);
			}
		},
		[initializeIndex],
	);

	const clearResults = useCallback(() => {
		setResults([]);
	}, []);

	return {
		search,
		results,
		isLoading,
		clearResults,
		initializeIndex,
	};
}
