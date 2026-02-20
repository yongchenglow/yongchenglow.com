import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import BlogPostLayout from "@/src/components/blog/BlogPostLayout";
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
export async function generateStaticParams() {
	const slugs = getAllBlogSlugs();
	return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params;
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
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	let post: BlogPost;

	try {
		post = getBlogPost(slug);
	} catch {
		notFound();
	}

	const { previous, next } = getBlogPostNavigation(slug);

	const mdxOptions = {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: "wrap" }],
			],
		},
	};

	return (
		<BlogPostLayout post={post} previousPost={previous} nextPost={next}>
			{/* @ts-expect-error - rehype plugin types are incompatible */}
			<MDXRemote source={post.content} options={mdxOptions} />
		</BlogPostLayout>
	);
}
