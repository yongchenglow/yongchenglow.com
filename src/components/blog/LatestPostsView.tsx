"use client";

import { useState } from "react";
import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
import InfiniteScroll from "@/src/components/blog/InfiniteScroll";
import Pagination from "@/src/components/blog/Pagination";
import { Button } from "@/src/components/shared/ui/button";
import type { BlogPost, PaginationResult } from "@/src/types/blog";

interface LatestPostsViewProps {
	paginationResult: PaginationResult<BlogPost>;
	baseUrl: string;
}

export default function LatestPostsView({
	paginationResult,
	baseUrl,
}: LatestPostsViewProps) {
	const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

	const loadMorePosts = async (page: number): Promise<BlogPost[]> => {
		const response = await fetch(`/api/blog/latest?page=${page}`);
		if (!response.ok) {
			throw new Error("Failed to fetch posts");
		}
		const data: PaginationResult<BlogPost> = await response.json();
		return data.items;
	};

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

			<ArticleGrid>
				{useInfiniteScroll ? (
					<InfiniteScroll
						initialPosts={paginationResult.items}
						currentPage={paginationResult.currentPage}
						totalPages={paginationResult.totalPages}
						baseUrl={baseUrl}
						loadMorePosts={loadMorePosts}
					/>
				) : (
					paginationResult.items.map((post) => (
						<div
							key={post.slug}
							className="w-full md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
						>
							<ArticleCard
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
						</div>
					))
				)}
			</ArticleGrid>

			{!useInfiniteScroll && (
				<Pagination
					currentPage={paginationResult.currentPage}
					totalPages={paginationResult.totalPages}
					baseUrl={baseUrl}
				/>
			)}
		</>
	);
}
