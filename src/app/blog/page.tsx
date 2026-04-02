import Link from "next/link";
import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
import CategoryNavigation from "@/src/components/blog/CategoryNavigation";
import FeaturedPostCard from "@/src/components/blog/FeaturedPostCard";
import YearFilter from "@/src/components/blog/YearFilter";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";
import { Separator } from "@/src/components/shared/ui/separator";
import { getAllBlogPosts, getFeaturedPost } from "@/src/lib/blog";

export default function BlogPage() {
	const featuredPost = getFeaturedPost();
	const allPosts = getAllBlogPosts();
	const previousPosts = allPosts.slice(1);

	return (
		<StandardLayout>
			<div className="py-8 text-center">
				<PageTitle>Blog</PageTitle>
				<PageSubtitle>
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something new!
				</PageSubtitle>

				<CategoryNavigation />
				<YearFilter />

				<Separator className="my-8" />

				{/* Featured Article Section */}
				{featuredPost && (
					<section className="my-8 text-left">
						<h2 className="text-2xl font-bold mb-4">Latest Article</h2>
						<FeaturedPostCard
							title={featuredPost.frontmatter.title}
							description={featuredPost.frontmatter.description}
							href={`/blog/${featuredPost.slug}`}
							readingTime={featuredPost.readingTime}
							date={featuredPost.frontmatter.date}
							tags={featuredPost.frontmatter.tags}
						/>
					</section>
				)}

				<Separator className="my-8" />

				{/* Previous Articles Grid */}
				<section className="my-8 text-left">
					<h2 className="text-2xl font-bold mb-4">Previous Articles</h2>
					<ArticleGrid>
						{previousPosts.map((post) => (
							<ArticleCard
								key={post.slug}
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
						))}
					</ArticleGrid>

					<div className="flex justify-center mt-8">
						<Button variant="ghost" size="lg" asChild className="gap-2">
							<Link href="/blog/latest/1">View All Posts →</Link>
						</Button>
					</div>
				</section>

				<GoogleAds slotId="9667543473" />
			</div>
		</StandardLayout>
	);
}
