import Link from "next/link";
import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
import CategoryNavigation from "@/src/components/blog/CategoryNavigation";
import YearFilter from "@/src/components/blog/YearFilter";
import SearchTrigger from "@/src/components/search/SearchTrigger";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";
import { getAllBlogPosts, getFeaturedPost } from "@/src/lib/blog";

export default function BlogPage() {
	const featuredPost = getFeaturedPost();
	const allPosts = getAllBlogPosts();
	const previousPosts = allPosts.slice(1);

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<PageTitle>Blog</PageTitle>
				<PageSubtitle>
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something!
				</PageSubtitle>

				<div className="my-6">
					<SearchTrigger />
				</div>

				<CategoryNavigation />
				<YearFilter />

				{/* Featured Article Section */}
				{featuredPost && (
					<section className="my-8">
						<h2 className="text-2xl font-bold mb-4">Latest Article</h2>
						<div className="flex justify-center">
							<ArticleCard
								title={featuredPost.frontmatter.title}
								description={featuredPost.frontmatter.description}
								href={`/blog/${featuredPost.slug}`}
								readingTime={featuredPost.readingTime}
								date={featuredPost.frontmatter.date}
								tags={featuredPost.frontmatter.tags}
							/>
						</div>
					</section>
				)}

				{/* Previous Articles Grid */}
				<section className="my-8">
					<h2 className="text-2xl font-bold mb-4">Previous Articles</h2>
					<ArticleGrid>
						{previousPosts.map((post) => (
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

					<div className="flex justify-center mt-8">
						<Button variant="outline" size="lg" asChild>
							<Link href="/blog/latest/1">View All Posts</Link>
						</Button>
					</div>
				</section>

				<GoogleAds slotId="9667543473" />
			</div>
		</StandardLayout>
	);
}
