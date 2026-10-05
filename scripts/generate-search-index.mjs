import fs from "node:fs";
import path from "node:path";
import { createBlogRepository } from "../src/lib/blog.ts";
import { fsContentSource } from "../src/lib/blog-source.ts";

const OUTPUT_PATH = path.join(process.cwd(), "public/search-index.json");

function stripMarkdown(content) {
	return (
		content
			// Remove MDX component tags
			.replace(/<[^>]+>/g, "")
			// Remove markdown images
			.replace(/!\[.*?\]\(.*?\)/g, "")
			// Remove markdown links but keep text
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			// Remove code blocks
			.replace(/```[\s\S]*?```/g, "")
			// Remove inline code
			.replace(/`([^`]+)`/g, "$1")
			// Remove markdown headings
			.replace(/^#{1,6}\s+/gm, "")
			// Remove bold/italic
			.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
			// Collapse multiple whitespace
			.replace(/\s+/g, " ")
			.trim()
	);
}

function getAllSearchablePosts() {
	// Posts come from the blog module, so the index and the site agree on
	// slugs, frontmatter, and which posts are drafts.
	const { getAllBlogPosts } = createBlogRepository(fsContentSource);

	return getAllBlogPosts().map((post) => ({
		id: post.slug,
		title: post.frontmatter.title,
		subtitle: post.frontmatter.subtitle ?? "",
		description: post.frontmatter.description,
		content: stripMarkdown(post.content),
		tags: post.frontmatter.tags ?? [],
		date: post.frontmatter.date,
		url: `/blog/${post.slug}`,
	}));
}

function generateSearchIndex() {
	console.log("Generating search index...");

	const posts = getAllSearchablePosts();
	console.log(`Found ${posts.length} blog posts`);

	const postsData = {};
	for (const post of posts) {
		postsData[post.id] = post;
	}

	const searchBundle = {
		posts: postsData,
		timestamp: Date.now(),
	};

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(searchBundle), "utf8");

	const fileSizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(2);
	console.log(`Search index generated: ${fileSizeKB} KB`);
	console.log(`Output: ${OUTPUT_PATH}`);
}

try {
	generateSearchIndex();
} catch (err) {
	console.error("Failed to generate search index:", err);
	process.exit(1);
}
