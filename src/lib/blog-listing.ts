import { BLOG_CONFIG } from "@/src/config/blog";
import { BLOG_UI } from "@/src/config/blog-ui";
import { blog } from "@/src/lib/blog";
import type { BlogPost, PaginationResult } from "@/src/types/blog";

/** Which collection of posts a listing page is showing. */
export type ListingScope =
	| { kind: "all" }
	| { kind: "category"; slug: string }
	| { kind: "tag"; slug: string };

const PAGE_PARAM_PATTERN = /^[1-9]\d*$/;

/**
 * A page number as it arrives from a route param or a query string, or `null`
 * when it is not a canonical positive integer. Callers treat `null` as a
 * missing page: 404 for a route, 400 for an API.
 */
export const parsePage = (raw: string | null | undefined): number | null => {
	if (raw === null || raw === undefined || !PAGE_PARAM_PATTERN.test(raw)) {
		return null;
	}
	return Number.parseInt(raw, 10);
};

export const getListingPosts = (scope: ListingScope): BlogPost[] => {
	if (scope.kind === "category") {
		return blog.getBlogPostsByCategory(scope.slug);
	}
	if (scope.kind === "tag") return blog.getBlogPostsByTag(scope.slug);
	return blog.getAllBlogPosts();
};

/**
 * The URL prefix that pagination and infinite scroll append a page number to.
 * One owner, so a route, its links, and the API path it fetches cannot
 * disagree.
 */
export const getListingBaseUrl = (scope: ListingScope): string => {
	if (scope.kind === "category") return `/blog/category/${scope.slug}/`;
	if (scope.kind === "tag")
		return `/blog/tag/${encodeURIComponent(scope.slug)}/`;
	return "/blog/all/";
};

/**
 * The API path that returns the same pages as JSON, or `null` for a scope that
 * renders every post on one page and needs no API.
 */
export const getListingApiUrl = (scope: ListingScope): string | null => {
	if (scope.kind === "all") return "/api/blog/latest";
	if (scope.kind === "category") {
		return `/api/blog/category?category=${encodeURIComponent(scope.slug)}`;
	}
	return null;
};

/** How many pages a scope spans, at the configured page size. */
export const getListingPageCount = (scope: ListingScope): number =>
	Math.ceil(getListingPosts(scope).length / BLOG_CONFIG.postsPerPage);

/** One page of a scope, with the flags the pagination controls need. */
export const getListing = (
	scope: ListingScope,
	page: number,
): PaginationResult<BlogPost> => paginatePosts(getListingPosts(scope), page);

export const paginatePosts = (
	posts: BlogPost[],
	page: number,
	postsPerPage: number = BLOG_CONFIG.postsPerPage,
): PaginationResult<BlogPost> => {
	const totalItems = posts.length;
	const totalPages = Math.ceil(totalItems / postsPerPage);

	// Clamp rather than reject: an API caller asking for page 99 gets the last
	// page, and the route layer 404s anything outside the generated range.
	const currentPage = Math.max(1, Math.min(page, totalPages || 1));
	const startIndex = (currentPage - 1) * postsPerPage;

	return {
		items: posts.slice(startIndex, startIndex + postsPerPage),
		currentPage,
		totalPages,
		totalItems,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
};

/** Every tag that at least one published post carries. */
export const getAllTags = (): string[] => {
	const tags = new Set<string>();
	for (const post of blog.getAllBlogPosts()) {
		for (const tag of post.frontmatter.tags ?? []) tags.add(tag);
	}
	return [...tags];
};

/** "3 posts" or "1 post". */
export const postCountText = (count: number): string =>
	BLOG_UI.count[count === 1 ? "post" : "posts"].replace(
		"{count}",
		String(count),
	);

/** The subtitle a paginated listing page renders under its title. */
export const paginationSummary = (
	result: PaginationResult<BlogPost>,
): string => {
	const showing = BLOG_UI.pagination.showingText
		.replace("{current}", String(result.items.length))
		.replace("{total}", String(result.totalItems));

	if (result.totalPages <= 1) return showing;

	return `${showing} (Page ${result.currentPage} of ${result.totalPages})`;
};
