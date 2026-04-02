"use client";

import { ArrowRight } from "lucide-react";
import ArticleCard from "@/src/components/article/ArticleCard";
import FadeIn from "@/src/components/shared/atoms/FadeIn";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import Section from "@/src/components/shared/molecules/Section";
import { Button } from "@/src/components/shared/ui/button";
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
					<FadeIn>
						<ArticleCard
							title={post.frontmatter.title}
							description={post.frontmatter.description}
							href={`/blog/${post.slug}`}
							readingTime={post.readingTime}
							date={post.frontmatter.date}
							tags={post.frontmatter.tags}
						/>
					</FadeIn>
				</div>
				<FadeIn delay={0.2}>
					<div className="mt-6 flex justify-center">
						<InternalLink href="/blog">
							<Button variant="ghost" size="sm" className="gap-2">
								View all articles
								<ArrowRight className="h-4 w-4" />
							</Button>
						</InternalLink>
					</div>
				</FadeIn>
			</Section>
		</div>
	);
}
