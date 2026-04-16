import type { Metadata } from "next";
import Link from "next/link";
import { CategoryNavigation } from "@/src/components/blog/CategoryNavigation";
import { FeaturedPostCard } from "@/src/components/blog/FeaturedPostCard";
import { YearFilter } from "@/src/components/blog/YearFilter";
import { PostCard } from "@/src/components/post/PostCard";
import { PostGrid } from "@/src/components/post/PostGrid";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";
import { BLOG_UI } from "@/src/config/blog-ui";
import { AD_SLOTS } from "@/src/config/site";
import { getStaggerDelay } from "@/src/lib/animation";
import { getAllBlogPosts, getFeaturedPost } from "@/src/lib/blog";

export const metadata: Metadata = {
	title: "Blog",
	alternates: {
		canonical: "/blog",
	},
};

export const BlogPage = () => {
	const featuredPost = getFeaturedPost();
	const allPosts = getAllBlogPosts();
	const previousPosts = allPosts.slice(1);

	return (
		<StandardLayout>
			<div className="py-8 text-center max-w-4xl mx-auto">
				<FadeIn>
					<PageTitle>Blog</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						Welcome to my blog! Hope you will enjoy my tech posts and learn
						something new!
					</PageSubtitle>
				</FadeIn>

				<CategoryNavigation />
				<YearFilter />

				{/* Featured Post Section */}
				{featuredPost && (
					<section className="my-8 text-left">
						<FadeIn>
							<h2 className="text-2xl font-bold mb-4">
								{BLOG_UI.featured.sectionHeading}
							</h2>
						</FadeIn>
						<FadeIn delay={0.1}>
							<FeaturedPostCard
								title={featuredPost.frontmatter.title}
								description={featuredPost.frontmatter.description}
								href={`/blog/${featuredPost.slug}`}
								readingTime={featuredPost.readingTime}
								date={featuredPost.frontmatter.date}
								tags={featuredPost.frontmatter.tags}
							/>
						</FadeIn>
					</section>
				)}

				{/* Previous Posts Grid */}
				<section className="my-8 text-left">
					<FadeIn>
						<h2 className="text-2xl font-bold mb-4">
							{BLOG_UI.previousPosts.sectionHeading}
						</h2>
					</FadeIn>
					<PostGrid>
						{previousPosts.map((post, index) => (
							<FadeIn key={post.slug} delay={getStaggerDelay(index)}>
								<PostCard
									title={post.frontmatter.title}
									description={post.frontmatter.description}
									href={`/blog/${post.slug}`}
									readingTime={post.readingTime}
									date={post.frontmatter.date}
									tags={post.frontmatter.tags}
								/>
							</FadeIn>
						))}
					</PostGrid>

					<div className="flex justify-center mt-8">
						<Button variant="ghost" size="lg" asChild className="gap-2">
							<Link href="/blog/latest/1">
								{BLOG_UI.previousPosts.viewAllLink}
							</Link>
						</Button>
					</div>
				</section>

				<GoogleAds slotId={AD_SLOTS.blog} />
			</div>
		</StandardLayout>
	);
};

export default BlogPage;
