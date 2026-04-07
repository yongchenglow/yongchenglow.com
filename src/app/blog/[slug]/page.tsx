import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BlogPostLayout } from "@/src/components/blog/BlogPostLayout";
import { MdxImage, MdxLink } from "@/src/components/blog/MdxImage";
import {
	getAllBlogSlugs,
	getBlogPost,
	getBlogPostNavigation,
} from "@/src/lib/blog";
import type { BlogPost } from "@/src/types/blog";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Generate static params for all blog posts
export const generateStaticParams = async () => {
	const slugs = getAllBlogSlugs();
	return slugs.map((slug) => ({ slug }));
};

// Generate metadata for SEO
export const generateMetadata = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;

	try {
		const post = getBlogPost(slug);

		if (!post) {
			return {
				title: "Post Not Found",
			};
		}

		return {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			openGraph: {
				title: post.frontmatter.title,
				description: post.frontmatter.description,
				type: "article",
				publishedTime: post.frontmatter.date,
				modifiedTime: post.frontmatter.lastUpdated,
				images: post.frontmatter.image ? [post.frontmatter.image] : [],
			},
		};
	} catch {
		return {
			title: "Post Not Found",
		};
	}
};

export const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;
	let post: BlogPost;

	try {
		post = getBlogPost(slug);
	} catch {
		notFound();
	}

	const { previous, next } = getBlogPostNavigation(slug);

	return (
		<BlogPostLayout post={post} previousPost={previous} nextPost={next}>
			<MDXRemote
				source={post.content}
				components={{
					img: MdxImage,
					a: MdxLink,
				}}
				options={{
					mdxOptions: {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [
							rehypeSlug,
							[rehypeAutolinkHeadings, { behavior: "wrap" }],
						],
					},
				}}
			/>
		</BlogPostLayout>
	);
};

export default BlogPostPage;
