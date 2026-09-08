"use client";

import { ArrowRight } from "lucide-react";
import { PostCard } from "@/src/components/post/PostCard";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Section } from "@/src/components/shared/molecules/Section";
import { Button } from "@/src/components/shared/ui/button";
import type { BlogPost } from "@/src/types/blog";

interface LatestPostsSectionProps {
	post: BlogPost | null;
}

export const LatestPostsSection = ({ post }: LatestPostsSectionProps) => {
	if (!post) return null;

	return (
		<div className="py-12 text-center">
			<Section title="Latest Tech Posts">
				<div className="grid grid-cols-12">
					<FadeIn className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-6 lg:col-start-4 w-full">
						<PostCard
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
						<Button variant="ghost" size="sm" className="gap-2" asChild>
							<InternalLink href="/blog">
								View all posts
								<ArrowRight className="h-4 w-4" />
							</InternalLink>
						</Button>
					</div>
				</FadeIn>
			</Section>
		</div>
	);
};
