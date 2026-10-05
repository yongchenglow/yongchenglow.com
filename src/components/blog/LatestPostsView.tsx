"use client";

import { useCallback, useState } from "react";
import { InfiniteScroll } from "@/src/components/blog/InfiniteScroll";
import { Pagination } from "@/src/components/blog/Pagination";
import { PostCard } from "@/src/components/post/PostCard";
import { PostGrid } from "@/src/components/post/PostGrid";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { Button } from "@/src/components/shared/ui/button";
import { getStaggerDelay } from "@/src/lib/animation";
import type { BlogPost, PaginationResult } from "@/src/types/blog";

interface LatestPostsViewProps {
	paginationResult: PaginationResult<BlogPost>;
	/** Page URLs, with the page number appended: `/blog/all/` + 2. */
	baseUrl: string;
	/** The JSON endpoint for the same scope, without a page param. */
	apiUrl: string;
}

const withPageParam = (apiUrl: string, page: number): string =>
	`${apiUrl}${apiUrl.includes("?") ? "&" : "?"}page=${page}`;

export const LatestPostsView = ({
	paginationResult,
	baseUrl,
	apiUrl,
}: LatestPostsViewProps) => {
	const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

	const loadMorePosts = useCallback(
		async (page: number): Promise<BlogPost[]> => {
			const response = await fetch(withPageParam(apiUrl, page));
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data: PaginationResult<BlogPost> = await response.json();
			return data.items;
		},
		[apiUrl],
	);

	return (
		<>
			{/* Toggle Button */}
			{paginationResult.totalPages > 1 && (
				<div className="flex justify-center mb-6">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setUseInfiniteScroll(!useInfiniteScroll)}
					>
						{useInfiniteScroll
							? "Switch to Pagination"
							: "Switch to Infinite Scroll"}
					</Button>
				</div>
			)}

			<PostGrid>
				{useInfiniteScroll ? (
					<InfiniteScroll
						initialPosts={paginationResult.items}
						currentPage={paginationResult.currentPage}
						totalPages={paginationResult.totalPages}
						baseUrl={baseUrl}
						loadMorePosts={loadMorePosts}
					/>
				) : (
					paginationResult.items.map((post, index) => (
						<FadeIn
							key={post.slug}
							delay={getStaggerDelay(index)}
							className="w-full md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
						>
							<PostCard post={post} />
						</FadeIn>
					))
				)}
			</PostGrid>

			{!useInfiniteScroll && (
				<Pagination
					currentPage={paginationResult.currentPage}
					totalPages={paginationResult.totalPages}
					baseUrl={baseUrl}
				/>
			)}
		</>
	);
};
