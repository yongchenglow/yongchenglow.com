import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
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
				<PageTitle>Tag: {tag}</PageTitle>
				<PageSubtitle>
					{posts.length} article{posts.length !== 1 ? "s" : ""} tagged with "
					{tag}"
				</PageSubtitle>

				<ArticleGrid>
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
				</ArticleGrid>
			</div>
		</StandardLayout>
	);
}
