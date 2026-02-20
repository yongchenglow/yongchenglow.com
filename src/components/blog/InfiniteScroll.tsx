"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ArticleCard from "@/src/components/article/ArticleCard";
import type { BlogPost } from "@/src/types/blog";

interface InfiniteScrollProps {
	initialPosts: BlogPost[];
	currentPage: number;
	totalPages: number;
	baseUrl: string;
	loadMorePosts: (page: number) => Promise<BlogPost[]>;
}

export default function InfiniteScroll({
	initialPosts,
	currentPage,
	totalPages,
	baseUrl,
	loadMorePosts,
}: InfiniteScrollProps) {
	const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
	const [page, setPage] = useState(currentPage);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(currentPage < totalPages);
	const observerTarget = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		const nextPage = page + 1;

		try {
			const newPosts = await loadMorePosts(nextPage);
			setPosts((prev) => [...prev, ...newPosts]);
			setPage(nextPage);
			setHasMore(nextPage < totalPages);

			// Update URL without full page reload
			router.replace(`${baseUrl}${nextPage}`, { scroll: false });
		} catch (error) {
			console.error("Failed to load more posts:", error);
		} finally {
			setIsLoading(false);
		}
	}, [page, hasMore, isLoading, totalPages, baseUrl, router, loadMorePosts]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMore();
				}
			},
			{ threshold: 0.1 },
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [hasMore, isLoading, loadMore]);

	return (
		<>
			{posts.map((post) => (
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
			))}

			{/* Intersection Observer Target */}
			{hasMore && (
				<div
					ref={observerTarget}
					className="w-full col-span-full flex justify-center py-8"
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
							<span className="text-sm text-muted-foreground">
								Loading more posts...
							</span>
						</div>
					) : (
						<span className="text-sm text-muted-foreground">
							Scroll for more
						</span>
					)}
				</div>
			)}

			{!hasMore && posts.length > 0 && (
				<div className="w-full col-span-full text-center py-8">
					<span className="text-sm text-muted-foreground">
						No more posts to load
					</span>
				</div>
			)}
		</>
	);
}
