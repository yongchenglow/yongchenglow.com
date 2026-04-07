import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BLOG_CATEGORIES, BLOG_CONFIG } from "@/src/config/blog";
import type {
	BlogFrontmatter,
	BlogPost,
	Category,
	PaginationResult,
} from "@/src/types/blog";

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");

export const getAllBlogSlugs = (): string[] => {
	const files = fs.readdirSync(BLOG_CONTENT_PATH);
	return files
		.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
		.map((file) => file.replace(/\.mdx?$/, ""));
};

export const getBlogPost = (slug: string): BlogPost => {
	const mdxPath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);
	const mdPath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
	const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
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
};

export const getAllBlogPosts = (includesDrafts = false): BlogPost[] => {
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
};

export const getFeaturedPost = (): BlogPost | null => {
	const posts = getAllBlogPosts();
	return posts.find((post) => post.frontmatter.featured) || posts[0] || null;
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
	const posts = getAllBlogPosts();
	return posts.filter((post) => post.frontmatter.tags?.includes(tag));
};

export const getBlogPostNavigation = (
	currentSlug: string,
): {
	previous: BlogPost | null;
	next: BlogPost | null;
} => {
	const allPosts = getAllBlogPosts();
	const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

	return {
		previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
		next:
			currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
	};
};

// Category Functions
export const getAllCategories = (): Category[] => {
	return Object.values(BLOG_CATEGORIES);
};

export const getCategoryMetadata = (categorySlug: string): Category | null => {
	return BLOG_CATEGORIES[categorySlug] || null;
};

export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
	const category = getCategoryMetadata(categorySlug);
	if (!category) return [];

	const posts = getAllBlogPosts();
	return posts.filter((post) =>
		post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
	);
};

export const getCategoryPostCounts = (): Record<string, number> => {
	const counts: Record<string, number> = {};
	const categories = getAllCategories();
	const allPosts = getAllBlogPosts();

	for (const category of categories) {
		counts[category.slug] = allPosts.filter((post) =>
			post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
		).length;
	}

	return counts;
};

// Year Functions
export const getAllPostYears = (): number[] => {
	const posts = getAllBlogPosts();
	const years = new Set<number>();

	for (const post of posts) {
		const year = new Date(post.frontmatter.date).getFullYear();
		years.add(year);
	}

	return Array.from(years).sort((a, b) => b - a); // Descending order
};

export const getBlogPostsByYear = (year: number): BlogPost[] => {
	const posts = getAllBlogPosts();
	return posts.filter((post) => {
		const postYear = new Date(post.frontmatter.date).getFullYear();
		return postYear === year;
	});
};

export const getYearPostCounts = (): Record<number, number> => {
	const counts: Record<number, number> = {};
	const years = getAllPostYears();
	const allPosts = getAllBlogPosts();

	for (const year of years) {
		counts[year] = allPosts.filter((post) => {
			const postYear = new Date(post.frontmatter.date).getFullYear();
			return postYear === year;
		}).length;
	}

	return counts;
};

// Pagination Functions
export const getPaginatedPosts = (
	page: number,
	postsPerPage: number = BLOG_CONFIG.postsPerPage,
): PaginationResult<BlogPost> => {
	const allPosts = getAllBlogPosts();
	const totalItems = allPosts.length;
	const totalPages = Math.ceil(totalItems / postsPerPage);

	// Validate and clamp page number
	const currentPage = Math.max(1, Math.min(page, totalPages || 1));

	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const items = allPosts.slice(startIndex, endIndex);

	return {
		items,
		currentPage,
		totalPages,
		totalItems,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
};

export const getPaginatedPostsByCategory = (
	categorySlug: string,
	page: number,
	postsPerPage: number = BLOG_CONFIG.postsPerPage,
): PaginationResult<BlogPost> => {
	const allPosts = getBlogPostsByCategory(categorySlug);
	const totalItems = allPosts.length;
	const totalPages = Math.ceil(totalItems / postsPerPage);

	const currentPage = Math.max(1, Math.min(page, totalPages || 1));

	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const items = allPosts.slice(startIndex, endIndex);

	return {
		items,
		currentPage,
		totalPages,
		totalItems,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
};

export const getPaginatedPostsByYear = (
	year: number,
	page: number,
	postsPerPage: number = BLOG_CONFIG.postsPerPage,
): PaginationResult<BlogPost> => {
	const allPosts = getBlogPostsByYear(year);
	const totalItems = allPosts.length;
	const totalPages = Math.ceil(totalItems / postsPerPage);

	const currentPage = Math.max(1, Math.min(page, totalPages || 1));

	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const items = allPosts.slice(startIndex, endIndex);

	return {
		items,
		currentPage,
		totalPages,
		totalItems,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
};
