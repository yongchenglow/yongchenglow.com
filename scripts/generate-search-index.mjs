import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");
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
	const files = fs.readdirSync(BLOG_CONTENT_PATH);
	const posts = [];

	for (const file of files) {
		if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

		const slug = file.replace(/\.mdx?$/, "");
		const fullPath = path.join(BLOG_CONTENT_PATH, file);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const { data, content } = matter(fileContents);

		// Always skip drafts — this script runs as part of the production build
		if (data.draft) {
			continue;
		}

		const plainTextContent = stripMarkdown(content);

		posts.push({
			id: slug,
			title: data.title || "",
			subtitle: data.subtitle || "",
			description: data.description || "",
			content: plainTextContent,
			tags: data.tags || [],
			date: data.date || "",
			url: `/blog/${slug}`,
		});
	}

	return posts;
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
