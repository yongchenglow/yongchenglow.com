"use client";

import ArticleContainer from "@/src/components/article/ArticleContainer";
import ArticleHeader from "@/src/components/article/ArticleHeader";
import ArticleMetadata from "@/src/components/article/ArticleMetadata";
import TableOfContents from "@/src/components/blog/TableOfContents";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Badge } from "@/src/components/shared/ui/badge";
import type { BlogPost } from "@/src/types/blog";

interface BlogPostLayoutProps {
	post: BlogPost;
	children: React.ReactNode;
}

export default function BlogPostLayout({
	post,
	children,
}: BlogPostLayoutProps) {
	const { frontmatter, readingTime } = post;

	return (
		<StandardLayout>
			<ArticleContainer>
				{/* Header Section */}
				<ArticleHeader
					title={frontmatter.title}
					subtitle={frontmatter.subtitle}
				/>

				{/* Metadata Bar */}
				<div className="flex flex-wrap gap-2 justify-center items-center mb-6">
					<ArticleMetadata>
						Published: {new Date(frontmatter.date).toLocaleDateString()}
					</ArticleMetadata>
					{frontmatter.lastUpdated && (
						<ArticleMetadata>
							Updated: {new Date(frontmatter.lastUpdated).toLocaleDateString()}
						</ArticleMetadata>
					)}
					<ArticleMetadata>{readingTime}</ArticleMetadata>
				</div>

				{/* Tags */}
				{frontmatter.tags && frontmatter.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 justify-center mb-6">
						{frontmatter.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				)}

				{/* Table of Contents */}
				<TableOfContents />

				{/* Main Content */}
				<article className="prose dark:prose-invert max-w-4xl mx-auto">
					{children}
				</article>

				{/* Google Ads */}
				{frontmatter.adsSlotId && <GoogleAds slotId={frontmatter.adsSlotId} />}
			</ArticleContainer>
		</StandardLayout>
	);
}
