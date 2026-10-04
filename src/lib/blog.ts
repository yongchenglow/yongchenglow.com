import matter from "gray-matter";
import { cache } from "react";
import readingTime from "reading-time";
import { AD_MID_ARTICLE_MIN_WORDS } from "@/src/config/ads";
import { BLOG_CATEGORIES, BLOG_CONFIG } from "@/src/config/blog";
import {
	BLOG_POST_FILENAME_PATTERN,
	BLOG_SLUG_PATTERN,
} from "@/src/config/blog-content";
import { BlogFrontmatterSchema } from "@/src/content/schema";
import { type ContentSource, fsContentSource } from "@/src/lib/blog-source";
import type { BlogPost, Category, PaginationResult } from "@/src/types/blog";

/**
 * Slugs map directly onto filenames under `content/blog`, so anything outside
 * this alphabet (path separators, `..`, URL escapes) must never reach
 * `path.join`.
 */
/** Thrown when a slug is well-formed but no matching content file exists. */
export class BlogPostNotFoundError extends Error {
	readonly slug: string;

	constructor(slug: string) {
		super(`Blog post not found: "${slug}"`);
		this.name = "BlogPostNotFoundError";
		this.slug = slug;
	}
}

/** Thrown when a slug could not safely be turned into a content file path. */
export class InvalidBlogSlugError extends Error {
	readonly slug: string;

	constructor(slug: string) {
		super(
			`Invalid blog slug: "${slug}". Slugs must match ${BLOG_SLUG_PATTERN.source}.`,
		);
		this.name = "InvalidBlogSlugError";
		this.slug = slug;
	}
}

/**
 * Thrown when a post's frontmatter does not satisfy `BlogFrontmatterSchema`.
 * Content errors must fail loudly at build time rather than surfacing as a
 * confusing render crash deep in a component.
 */
export class BlogFrontmatterError extends Error {
	readonly slug: string;

	constructor(slug: string, file: string, issues: string) {
		super(`Invalid frontmatter in ${file}:\n${issues}`);
		this.name = "BlogFrontmatterError";
		this.slug = slug;
	}
}

const assertValidSlug = (slug: string): void => {
	if (!BLOG_SLUG_PATTERN.test(slug)) throw new InvalidBlogSlugError(slug);
};

/**
 * The blog content module: one interface for reading, validating, and querying
 * posts, backed by a `ContentSource`.
 */
export interface BlogRepository {
	getAllBlogSlugs(): string[];
	getBlogPost(slug: string): BlogPost;
	getAllBlogPosts(includesDrafts?: boolean): BlogPost[];
	getFeaturedPost(): BlogPost | null;
	getBlogPostsByTag(tag: string): BlogPost[];
	getBlogPostNavigation(currentSlug: string): {
		previous: BlogPost | null;
		next: BlogPost | null;
	};
	getAllCategories(): Category[];
	getCategoryMetadata(categorySlug: string): Category | null;
	getBlogPostsByCategory(categorySlug: string): BlogPost[];
	getCategoryPostCounts(): Record<string, number>;
	getPaginatedPosts(
		page: number,
		postsPerPage?: number,
	): PaginationResult<BlogPost>;
	getPaginatedPostsByCategory(
		categorySlug: string,
		page: number,
		postsPerPage?: number,
	): PaginationResult<BlogPost>;
}

export const createBlogRepository = (source: ContentSource): BlogRepository => {
	const assertValidSlugAndResolveFile = (slug: string): string => {
		assertValidSlug(slug);
		const file = loadFiles().find(
			(candidate) => candidate.replace(/\.mdx?$/, "") === slug,
		);
		if (file === undefined) throw new BlogPostNotFoundError(slug);
		return file;
	};

	const parsePost = (slug: string): BlogPost => {
		const file = assertValidSlugAndResolveFile(slug);
		const { data, content } = matter(source.readFile(file));

		const parsed = BlogFrontmatterSchema.safeParse(data);
		if (!parsed.success) {
			const issues = parsed.error.issues
				.map((issue) => {
					const at = issue.path.length > 0 ? issue.path.join(".") : "(root)";
					return `  - ${at}: ${issue.message}`;
				})
				.join("\n");
			throw new BlogFrontmatterError(slug, file, issues);
		}
		const frontmatter = parsed.data;

		// Calculate reading time
		const { text: readingTimeText, words: wordCount } = readingTime(content);

		// Extract excerpt (first paragraph)
		const excerpt = content.split("\n\n")[0].substring(0, 200);

		return {
			slug,
			frontmatter,
			content,
			readingTime: readingTimeText,
			wordCount,
			excerpt,
		};
	};

	/**
	 * Parsed content is memoized for the lifetime of the repository.
	 *
	 * Blog content is static: files are fixed at build time and never mutated at
	 * runtime, so results are cached for the life of the process. `cache()`
	 * alone is not sufficient here — it only dedupes within a single React
	 * render pass, and the hottest callers (route handlers, `sitemap.ts`) run
	 * outside one, where it is a no-op. Development skips the cache so edits to
	 * a post show up without restarting the server.
	 */
	let files: string[] | undefined;
	let posts: Map<string, BlogPost> | undefined;

	const readFiles = (): string[] =>
		source.listFiles().filter((file) => BLOG_POST_FILENAME_PATTERN.test(file));

	const loadFiles = (): string[] => {
		if (process.env.NODE_ENV === "development") return readFiles();
		if (files === undefined) files = readFiles();
		return files;
	};

	const loadSlugs = (): string[] =>
		loadFiles().map((file) => file.replace(/\.mdx?$/, ""));

	const loadPost = (slug: string): BlogPost => {
		if (process.env.NODE_ENV === "development") return parsePost(slug);

		if (posts === undefined) posts = new Map();

		const cached = posts.get(slug);
		if (cached !== undefined) return cached;

		const post = parsePost(slug);
		posts.set(slug, post);
		return post;
	};

	const getAllBlogSlugs = cache((): string[] => loadSlugs());

	const getBlogPost = cache((slug: string): BlogPost => loadPost(slug));

	const getAllBlogPosts = cache((includesDrafts = false): BlogPost[] =>
		loadSlugs()
			.map((slug) => loadPost(slug))
			.filter((post) => includesDrafts || !post.frontmatter.draft)
			.sort((a, b) => {
				// Sort by date descending (newest first)
				return (
					new Date(b.frontmatter.date).getTime() -
					new Date(a.frontmatter.date).getTime()
				);
			}),
	);

	const getFeaturedPost = (): BlogPost | null => {
		const posts = getAllBlogPosts();
		return posts.find((post) => post.frontmatter.featured) || posts[0] || null;
	};

	const getBlogPostsByTag = (tag: string): BlogPost[] => {
		const posts = getAllBlogPosts();
		return posts.filter((post) => post.frontmatter.tags?.includes(tag));
	};

	const getBlogPostNavigation = (
		currentSlug: string,
	): {
		previous: BlogPost | null;
		next: BlogPost | null;
	} => {
		const allPosts = getAllBlogPosts();
		const currentIndex = allPosts.findIndex(
			(post) => post.slug === currentSlug,
		);
		if (currentIndex === -1) return { previous: null, next: null };

		// Posts are sorted newest-first, while navigation follows publication order.
		// The previous post is older (a higher index), and the next post is newer.
		return {
			previous:
				currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
			next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
		};
	};

	// Category Functions
	const getAllCategories = (): Category[] => Object.values(BLOG_CATEGORIES);

	const getCategoryMetadata = (categorySlug: string): Category | null =>
		BLOG_CATEGORIES[categorySlug] || null;

	const isInCategory = (post: BlogPost, category: Category): boolean =>
		post.frontmatter.tags?.some((tag) => category.tags.includes(tag)) ?? false;

	const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
		const category = getCategoryMetadata(categorySlug);
		if (!category) return [];

		return getAllBlogPosts().filter((post) => isInCategory(post, category));
	};

	const getCategoryPostCounts = (): Record<string, number> => {
		const counts: Record<string, number> = {};
		const allPosts = getAllBlogPosts();

		for (const category of getAllCategories()) {
			counts[category.slug] = allPosts.filter((post) =>
				isInCategory(post, category),
			).length;
		}

		return counts;
	};

	// Pagination Functions
	const paginate = (
		posts: BlogPost[],
		page: number,
		postsPerPage: number,
	): PaginationResult<BlogPost> => {
		const totalItems = posts.length;
		const totalPages = Math.ceil(totalItems / postsPerPage);

		// Validate and clamp page number
		const currentPage = Math.max(1, Math.min(page, totalPages || 1));

		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;

		return {
			items: posts.slice(startIndex, endIndex),
			currentPage,
			totalPages,
			totalItems,
			hasNextPage: currentPage < totalPages,
			hasPreviousPage: currentPage > 1,
		};
	};

	const getPaginatedPosts = (
		page: number,
		postsPerPage: number = BLOG_CONFIG.postsPerPage,
	): PaginationResult<BlogPost> =>
		paginate(getAllBlogPosts(), page, postsPerPage);

	const getPaginatedPostsByCategory = (
		categorySlug: string,
		page: number,
		postsPerPage: number = BLOG_CONFIG.postsPerPage,
	): PaginationResult<BlogPost> =>
		paginate(getBlogPostsByCategory(categorySlug), page, postsPerPage);

	return {
		getAllBlogSlugs,
		getBlogPost,
		getAllBlogPosts,
		getFeaturedPost,
		getBlogPostsByTag,
		getBlogPostNavigation,
		getAllCategories,
		getCategoryMetadata,
		getBlogPostsByCategory,
		getCategoryPostCounts,
		getPaginatedPosts,
		getPaginatedPostsByCategory,
	};
};

/**
 * Blog content is static at build time, so reads are served from the filesystem
 * adapter and memoized. Tests build their own repository over
 * `inMemoryContentSource` instead of swapping filesystem fixtures.
 */
export const blog: BlogRepository = createBlogRepository(fsContentSource);

/**
 * Splits post content at the first top-level section break past the midpoint,
 * so a mid-article ad lands between sections rather than inside a thought.
 *
 * Headings inside fenced code blocks are ignored — a `#` comment in a shell
 * snippet is not a section break. Returns a single part when the post is too
 * short to warrant the break, or when it has no usable heading.
 */
export const splitContentForMidAd = (
	content: string,
	wordCount: number,
): { before: string; after: string | null } => {
	if (wordCount < AD_MID_ARTICLE_MIN_WORDS) {
		return { before: content, after: null };
	}

	const lines = content.split("\n");
	const midpoint = Math.floor(lines.length / 2);

	let inCodeFence = false;
	let splitIndex = -1;

	for (let index = 0; index < lines.length; index++) {
		if (lines[index].startsWith("```")) {
			inCodeFence = !inCodeFence;
			continue;
		}
		if (inCodeFence) continue;
		if (index >= midpoint && /^##\s/.test(lines[index])) {
			splitIndex = index;
			break;
		}
	}

	if (splitIndex === -1) {
		return { before: content, after: null };
	}

	return {
		before: lines.slice(0, splitIndex).join("\n"),
		after: lines.slice(splitIndex).join("\n"),
	};
};
