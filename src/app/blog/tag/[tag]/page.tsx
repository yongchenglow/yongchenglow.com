import AnimatedGridItem from "@/src/components/blog/AnimatedGridItem";
import PostCard from "@/src/components/post/PostCard";
import PostGrid from "@/src/components/post/PostGrid";
import FadeIn from "@/src/components/shared/atoms/FadeIn";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { getAllBlogPosts, getBlogPostsByTag } from "@/src/lib/blog";

interface TagPageProps {
	params: Promise<{
		tag: string;
	}>;
}

export async function generateStaticParams() {
	const posts = getAllBlogPosts();
	const tags = new Set<string>();

	for (const post of posts) {
		for (const tag of post.frontmatter.tags ?? []) {
			tags.add(tag);
		}
	}

	return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag } = await params;
	const posts = getBlogPostsByTag(tag);

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<FadeIn>
					<PageTitle>Tag: {tag}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{posts.length} post{posts.length !== 1 ? "s" : ""} tagged with "
						{tag}"
					</PageSubtitle>
				</FadeIn>

				<PostGrid>
					{posts.map((post, index) => (
						<AnimatedGridItem key={post.slug} index={index}>
							<PostCard
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
						</AnimatedGridItem>
					))}
				</PostGrid>
			</div>
		</StandardLayout>
	);
}
