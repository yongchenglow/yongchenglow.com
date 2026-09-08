import type { z } from "zod";
import type { BlogFrontmatterSchema } from "@/src/content/schema";

/**
 * Derived from `BlogFrontmatterSchema` so the runtime validation and the
 * compile-time type cannot drift apart.
 */
type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export interface BlogPost {
	slug: string;
	frontmatter: BlogFrontmatter;
	content: string;
	readingTime: string;
	wordCount: number;
	excerpt?: string;
}

export interface Category {
	slug: string;
	label: string;
	tags: string[];
	description: string;
}

export interface PaginationResult<T> {
	items: T[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
