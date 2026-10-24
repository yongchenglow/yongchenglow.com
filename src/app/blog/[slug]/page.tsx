import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { AdSlot } from "@/src/components/ads/AdSlot";
import { BlogPostLayout } from "@/src/components/blog/BlogPostLayout";
import { MdxImage, MdxLink } from "@/src/components/blog/MdxImage";
import { useMDXComponents } from "@/src/components/mdx/MDXComponents";
import { JsonLd } from "@/src/components/seo/JsonLd";
import {
	BlogFrontmatterError,
	blog,
	splitContentForMidAd,
} from "@/src/lib/blog";
import { getArticleSchema, getPostMetadata } from "@/src/lib/post-metadata";
import type { BlogPost } from "@/src/types/blog";

/**
 * Both halves of a mid-article split render through the same pipeline, so the
 * options live here: adding a plugin in one branch and forgetting the other
 * would render the two halves of one post differently.
 */
type MdxOptions = NonNullable<ComponentProps<typeof MDXRemote>["options"]>;

const MDX_OPTIONS: MdxOptions = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
	},
};

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Generate static params for all blog posts
export const generateStaticParams = async () => {
	const slugs = blog.getAllBlogSlugs();
	return slugs.map((slug) => ({ slug }));
};

/**
 * Posts are files on disk, fixed at build time, so `generateStaticParams`
 * already enumerates every valid slug. Rendering unlisted slugs on demand only
 * produces 404s by a slower path, and each attempt makes the server write a
 * prerender entry to `.next/server/app`, which fails under a read-only root
 * filesystem in production.
 */
export const dynamicParams = false;

// Generate metadata for SEO
export const generateMetadata = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;

	try {
		return getPostMetadata(blog.getBlogPost(slug));
	} catch (error) {
		// Content errors are authoring mistakes, not missing pages: a slug that
		// does not resolve is a 404, but invalid frontmatter must fail the build.
		if (error instanceof BlogFrontmatterError) throw error;

		return {
			title: "Post Not Found",
		};
	}
};

export const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;
	let post: BlogPost;

	try {
		post = blog.getBlogPost(slug);
	} catch (error) {
		if (error instanceof BlogFrontmatterError) throw error;
		notFound();
	}

	const { previous, next } = blog.getBlogPostNavigation(slug);

	const articleSchema = getArticleSchema(post);

	const mdxComponents = useMDXComponents({
		img: MdxImage,
		a: MdxLink,
	});

	const { before, after } = splitContentForMidAd(post.content, post.wordCount);

	return (
		<BlogPostLayout post={post} previousPost={previous} nextPost={next}>
			<JsonLd data={articleSchema} />
			<MDXRemote
				source={before}
				components={mdxComponents}
				options={MDX_OPTIONS}
			/>
			{after && (
				<>
					<AdSlot placement="article-mid" />
					<MDXRemote
						source={after}
						components={mdxComponents}
						options={MDX_OPTIONS}
					/>
				</>
			)}
		</BlogPostLayout>
	);
};

export default BlogPostPage;
