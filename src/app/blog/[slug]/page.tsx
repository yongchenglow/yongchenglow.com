import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BlogPostLayout } from "@/src/components/blog/BlogPostLayout";
import { MdxImage, MdxLink } from "@/src/components/blog/MdxImage";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { SITE_AUTHOR, SITE_URL } from "@/src/config/site";
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

		const ogImage =
			post.frontmatter.image ??
			`/og?title=${encodeURIComponent(post.frontmatter.title)}&tags=${encodeURIComponent((post.frontmatter.tags ?? []).join(","))}`;

		return {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			alternates: {
				canonical: `/blog/${slug}`,
			},
			openGraph: {
				title: post.frontmatter.title,
				description: post.frontmatter.description,
				type: "article",
				publishedTime: post.frontmatter.date,
				modifiedTime: post.frontmatter.lastUpdated,
				images: [ogImage],
			},
			twitter: {
				card: "summary_large_image",
				images: [ogImage],
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

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.frontmatter.title,
		description: post.frontmatter.description,
		datePublished: `${post.frontmatter.date}T00:00:00+08:00`,
		dateModified: `${post.frontmatter.lastUpdated ?? post.frontmatter.date}T00:00:00+08:00`,
		url: `${SITE_URL}/blog/${slug}`,
		image: {
			"@type": "ImageObject",
			url: post.frontmatter.image ?? `${SITE_URL}${SITE_AUTHOR.image}`,
			width: 1200,
			height: 630,
		},
		author: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_AUTHOR.url,
		},
		publisher: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL,
		},
	};

	const breadcrumbSchema = {
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
				name: post.frontmatter.title,
				item: `${SITE_URL}/blog/${slug}`,
			},
		],
	};

	return (
		<BlogPostLayout post={post} previousPost={previous} nextPost={next}>
			<JsonLd data={articleSchema} />
			<JsonLd data={breadcrumbSchema} />
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
