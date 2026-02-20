"use client";

import ArticleCard from "@/src/components/article/ArticleCard";
import Section from "@/src/components/shared/molecules/Section";
import type { BlogPost } from "@/src/types/blog";

interface LatestArticlesSectionProps {
	post: BlogPost | null;
}

export default function LatestArticlesSection({
	post,
}: LatestArticlesSectionProps) {
	if (!post) return null;

	return (
		<div className="py-12 text-center">
			<Section title="Latest Tech Articles">
				<div className="flex justify-center">
					<ArticleCard
						title={post.frontmatter.title}
						description={post.frontmatter.description}
						href={`/blog/${post.slug}`}
						readingTime={post.readingTime}
						date={post.frontmatter.date}
						tags={post.frontmatter.tags}
					/>
				</div>
			</Section>
		</div>
	);
}
