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
	baseUrl: string;
}

export const LatestPostsView = ({
	paginationResult,
	baseUrl,
}: LatestPostsViewProps) => {
	const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

	const loadMorePosts = useCallback(
		async (page: number): Promise<BlogPost[]> => {
			const response = await fetch(`${baseUrl}${page}`);
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data: PaginationResult<BlogPost> = await response.json();
			return data.items;
		},
		[baseUrl],
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
							<PostCard
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
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
