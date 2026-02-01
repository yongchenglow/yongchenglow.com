import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPost } from "@/src/types/blog";

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");

export function getAllBlogSlugs(): string[] {
	const files = fs.readdirSync(BLOG_CONTENT_PATH);
	return files
		.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
		.map((file) => file.replace(/\.mdx?$/, ""));
}

export function getBlogPost(slug: string): BlogPost {
	const fullPath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const { data, content } = matter(fileContents);
	const frontmatter = data as BlogFrontmatter;

	// Calculate reading time
	const { text: readingTimeText } = readingTime(content);

	// Extract excerpt (first paragraph)
	const excerpt = content.split("\n\n")[0].substring(0, 200);

	return {
		slug,
		frontmatter,
		content,
		readingTime: readingTimeText,
		excerpt,
	};
}

export function getAllBlogPosts(includesDrafts = false): BlogPost[] {
	const slugs = getAllBlogSlugs();
	const posts = slugs
		.map((slug) => getBlogPost(slug))
		.filter((post) => includesDrafts || !post.frontmatter.draft)
		.sort((a, b) => {
			// Sort by date descending (newest first)
			return (
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime()
			);
		});

	return posts;
}

export function getFeaturedPost(): BlogPost | null {
	const posts = getAllBlogPosts();
	return posts.find((post) => post.frontmatter.featured) || posts[0] || null;
}
