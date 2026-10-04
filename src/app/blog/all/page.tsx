import type { Metadata } from "next";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";
import { BlogTimeline } from "@/src/components/blog/BlogTimeline";
import { PostContainer } from "@/src/components/post/PostContainer";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_UI } from "@/src/config/blog-ui";
import { blog } from "@/src/lib/blog";
import { postCountText } from "@/src/lib/blog-listing";

export const metadata: Metadata = {
	title: BLOG_UI.allPosts.pageHeading,
	alternates: {
		canonical: "/blog/all",
	},
};

export const AllPostsPage = () => {
	const posts = blog.getAllBlogPosts();

	return (
		<StandardLayout>
			<PostContainer>
				<BlogBreadcrumb
					current={{ label: BLOG_UI.allPosts.pageHeading, href: "/blog/all" }}
				/>
				<div className="text-center">
					<FadeIn>
						<PageTitle>{BLOG_UI.allPosts.pageHeading}</PageTitle>
					</FadeIn>
					<FadeIn delay={0.1}>
						<PageSubtitle>{postCountText(posts.length)}</PageSubtitle>
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
