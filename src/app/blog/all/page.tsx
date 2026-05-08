import type { Metadata } from "next";
import { BlogTimeline } from "@/src/components/blog/BlogTimeline";
import { PostContainer } from "@/src/components/post/PostContainer";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_UI } from "@/src/config/blog-ui";
import { SITE_URL } from "@/src/config/site";
import { getAllBlogPosts } from "@/src/lib/blog";

export const metadata: Metadata = {
	title: BLOG_UI.featured.pageHeading,
	alternates: {
		canonical: "/blog/all",
	},
};

export const AllPostsPage = () => {
	const posts = getAllBlogPosts();

	return (
		<StandardLayout>
			<PostContainer>
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: SITE_URL,
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Blog",
								item: `${SITE_URL}/blog`,
							},
							{
								"@type": "ListItem",
								position: 3,
								name: BLOG_UI.featured.pageHeading,
								item: `${SITE_URL}/blog/all`,
							},
						],
					}}
				/>
				<div className="text-center">
					<FadeIn>
						<PageTitle>{BLOG_UI.featured.pageHeading}</PageTitle>
					</FadeIn>
					<FadeIn delay={0.1}>
						<PageSubtitle>
							{posts.length} {posts.length === 1 ? "post" : "posts"}
						</PageSubtitle>
					</FadeIn>
				</div>

				<div className="mt-8">
					<BlogTimeline posts={posts} />
				</div>
			</PostContainer>
		</StandardLayout>
	);
};

export default AllPostsPage;
