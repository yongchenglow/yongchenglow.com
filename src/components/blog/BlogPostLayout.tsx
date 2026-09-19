"use client";

import { AdSlot } from "@/src/components/ads/AdSlot";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";
import { BlogNavigation } from "@/src/components/blog/BlogNavigation";
import { ReadingProgress } from "@/src/components/blog/ReadingProgress";
import { TableOfContents } from "@/src/components/blog/TableOfContents";
import { PostContainer } from "@/src/components/post/PostContainer";
import { PostHeader } from "@/src/components/post/PostHeader";
import { PostMetadata } from "@/src/components/post/PostMetadata";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Badge } from "@/src/components/shared/ui/badge";
import { formatDate } from "@/src/lib/utils";
import type { BlogPost } from "@/src/types/blog";

interface BlogPostLayoutProps {
	post: BlogPost;
	children: React.ReactNode;
	previousPost?: BlogPost | null;
	nextPost?: BlogPost | null;
}

export const BlogPostLayout = ({
	post,
	children,
	previousPost,
	nextPost,
}: BlogPostLayoutProps) => {
	const { frontmatter, readingTime } = post;

	return (
		<StandardLayout>
			<ReadingProgress pageTitle={frontmatter.title} />
			<PostContainer className="max-w-[88rem] md:max-w-[88rem] lg:max-w-[88rem]">
				<div className="mx-auto max-w-3xl">
					<BlogBreadcrumb
						current={{
							label: frontmatter.title,
							href: `/blog/${post.slug}`,
						}}
						compactOnMobile
					/>

					{/* Header Section */}
					<PostHeader
						title={frontmatter.title}
						subtitle={frontmatter.subtitle}
					/>

					{/* Metadata Bar */}
					<div className="flex flex-wrap gap-2 justify-center items-center mb-4">
						<PostMetadata>
							Published: {formatDate(frontmatter.date)}
						</PostMetadata>
						{frontmatter.lastUpdated && (
							<PostMetadata>
								Updated: {formatDate(frontmatter.lastUpdated)}
							</PostMetadata>
						)}
						<PostMetadata>{readingTime}</PostMetadata>
					</div>

					{/* Tags */}
					{frontmatter.tags && frontmatter.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 justify-center mb-6">
							{frontmatter.tags.map((tag) => (
								<InternalLink key={tag} href={`/blog/tag/${tag}`}>
									<Badge variant="secondary">{tag}</Badge>
								</InternalLink>
							))}
						</div>
					)}

					{/* Expandable TOC below wide desktop */}
					<div className="xl:hidden mb-6">
						<TableOfContents variant="drawer" />
					</div>
				</div>

				{/* Symmetric rails keep the reading column centered in the viewport. */}
				<div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,48rem)_minmax(0,1fr)] xl:gap-x-8 xl:items-start">
					<div className="min-w-0 w-full max-w-3xl mx-auto xl:col-start-2">
						<article className="prose dark:prose-invert">{children}</article>

						{/* Advertisement */}
						<AdSlot placement="article-end" />

						{/* Blog Navigation */}
						<BlogNavigation previousPost={previousPost} nextPost={nextPost} />
					</div>

					{/* Sidebar TOC (wide desktop only) */}
					<aside className="hidden xl:block xl:col-start-3 xl:sticky xl:top-24 xl:self-start">
						<TableOfContents variant="sidebar" />
					</aside>
				</div>
			</PostContainer>
		</StandardLayout>
	);
};
