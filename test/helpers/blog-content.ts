import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { BLOG_POST_FILENAME_PATTERN } from "@/src/config/blog-content";
import { BlogFrontmatterSchema } from "@/src/content/schema";

const blogDirectory = join(process.cwd(), "content/blog");

export const readBlogContent = () =>
	readdirSync(blogDirectory)
		.filter((file) => BLOG_POST_FILENAME_PATTERN.test(file))
		.map((file) => {
			const slug = file.replace(/\.mdx?$/, "");
			const source = readFileSync(join(blogDirectory, file), "utf8");
			const { data, content } = matter(source);

			return {
				slug,
				frontmatter: BlogFrontmatterSchema.parse(data),
				content,
			};
		});

export const readPublishedBlogContent = () =>
	readBlogContent().filter((post) => !post.frontmatter.draft);
