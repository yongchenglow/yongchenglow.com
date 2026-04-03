"use client";

import BlogBackButton from "@/src/components/blog/BlogBackButton";
import BlogNavigation from "@/src/components/blog/BlogNavigation";
import ReadingProgress from "@/src/components/blog/ReadingProgress";
import TableOfContents from "@/src/components/blog/TableOfContents";
import PostContainer from "@/src/components/post/PostContainer";
import PostHeader from "@/src/components/post/PostHeader";
import PostMetadata from "@/src/components/post/PostMetadata";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Badge } from "@/src/components/shared/ui/badge";
import type { BlogPost } from "@/src/types/blog";

interface BlogPostLayoutProps {
	post: BlogPost;
	children: React.ReactNode;
	previousPost?: BlogPost | null;
	nextPost?: BlogPost | null;
}

export default function BlogPostLayout({
	post,
	children,
	previousPost,
	nextPost,
}: BlogPostLayoutProps) {
	const { frontmatter, readingTime } = post;

	return (
		<StandardLayout>
			<ReadingProgress />
			<PostContainer>
				{/* Back Button */}
				<BlogBackButton />

				{/* Header Section */}
				<PostHeader title={frontmatter.title} subtitle={frontmatter.subtitle} />

				{/* Metadata Bar */}
				<div className="flex flex-wrap gap-2 justify-center items-center mb-4">
					<PostMetadata>
						Published: {new Date(frontmatter.date).toLocaleDateString()}
					</PostMetadata>
					{frontmatter.lastUpdated && (
						<PostMetadata>
							Updated: {new Date(frontmatter.lastUpdated).toLocaleDateString()}
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

				{/* Mobile TOC */}
				<div className="lg:hidden mb-6">
					<TableOfContents variant="inline" />
				</div>

				{/* Two-column layout on large screens */}
				<div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12 lg:items-start">
					{/* Main Content */}
					<div>
						<article className="prose dark:prose-invert">{children}</article>

						{/* Blog Navigation */}
						<BlogNavigation previousPost={previousPost} nextPost={nextPost} />

						{/* Google Ads */}
						{frontmatter.adsSlotId && (
							<GoogleAds slotId={frontmatter.adsSlotId} />
						)}
					</div>

					{/* Sidebar TOC (desktop only) */}
					<aside className="hidden lg:block sticky top-24">
						<TableOfContents variant="sidebar" />
					</aside>
				</div>
			</PostContainer>
		</StandardLayout>
	);
}
