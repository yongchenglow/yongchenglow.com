import { AnimatedGridItem } from "@/src/components/blog/AnimatedGridItem";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";
import { PostCard } from "@/src/components/post/PostCard";
import { PostGrid } from "@/src/components/post/PostGrid";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_UI } from "@/src/config/blog-ui";
import {
	getAllTags,
	getListingPosts,
	postCountText,
} from "@/src/lib/blog-listing";

export const generateMetadata = async ({ params }: TagPageProps) => {
	const { tag } = await params;
	return {
		title: `Tag: ${tag}`,
		alternates: {
			canonical: `/blog/tag/${encodeURIComponent(tag)}`,
		},
	};
};

interface TagPageProps {
	params: Promise<{
		tag: string;
	}>;
}

export const generateStaticParams = async () => {
	return getAllTags().map((tag) => ({ tag }));
};

/**
 * Tags come from post frontmatter, so the list above is exhaustive. Without
 * this, any arbitrary tag renders a live "0 posts" page, which invites
 * crawlers into unbounded thin pages and makes the server attempt a prerender
 * write that a read-only root filesystem rejects. Unknown tags now 404.
 */
export const dynamicParams = false;

export const TagPage = async ({ params }: TagPageProps) => {
	const { tag } = await params;
	const posts = getListingPosts({ kind: "tag", slug: tag });

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<BlogBreadcrumb
					current={{
						label: `${BLOG_UI.breadcrumbs.tagPrefix} ${tag}`,
						href: `/blog/tag/${encodeURIComponent(tag)}`,
					}}
				/>
				<FadeIn>
					<PageTitle>
						{BLOG_UI.breadcrumbs.tagPrefix} {tag}
					</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{postCountText(posts.length)} tagged with "{tag}"
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
};

export default TagPage;
