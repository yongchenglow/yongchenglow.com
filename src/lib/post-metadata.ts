import { SITE_AUTHOR, SITE_TIMEZONE_OFFSET, SITE_URL } from "@/src/config/site";
import type { BlogPost } from "@/src/types/blog";

/** The host shown on the generated social card, derived from the site URL. */
export const SITE_HOST = new URL(SITE_URL).host;

const MAX_TITLE_LENGTH = 200;
const MAX_TAGS = 6;
const MAX_TAG_LENGTH = 32;

export const getPostHref = (slug: string): string => `/blog/${slug}`;

/**
 * The `/og` card for a post. The query string this builds is the same one
 * `parseOgCardRequest` reads back, so the producer and the card agree on the
 * limits without either file owning the format.
 */
export const getOgImagePath = (post: BlogPost): string => {
	if (post.frontmatter.image) return post.frontmatter.image;

	const tags = (post.frontmatter.tags ?? []).slice(0, MAX_TAGS);
	return `/og?title=${encodeURIComponent(
		post.frontmatter.title,
	)}&tags=${encodeURIComponent(tags.join(","))}`;
};

export interface OgCardContent {
	title: string;
	tags: string[];
}

/** What the social card renders, after truncation. */
export const parseOgCardRequest = (
	searchParams: URLSearchParams,
	fallbackTitle: string = SITE_AUTHOR.name,
): OgCardContent => ({
	title: (searchParams.get("title") ?? fallbackTitle).slice(
		0,
		MAX_TITLE_LENGTH,
	),
	tags: (searchParams.get("tags") ?? "")
		.split(",")
		.map((tag) => tag.trim().slice(0, MAX_TAG_LENGTH))
		.filter(Boolean)
		.slice(0, MAX_TAGS),
});

/** The Next.js metadata for a post page. */
export const getPostMetadata = (post: BlogPost) => {
	const ogImage = getOgImagePath(post);

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.description,
		alternates: { canonical: getPostHref(post.slug) },
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			type: "article" as const,
			publishedTime: post.frontmatter.date,
			modifiedTime: post.frontmatter.lastUpdated,
			images: [ogImage],
		},
		twitter: {
			card: "summary_large_image" as const,
			images: [ogImage],
		},
	};
};

const withTimezone = (date: string): string =>
	`${date}T00:00:00${SITE_TIMEZONE_OFFSET}`;

/** The `Article` JSON-LD for a post. */
export const getArticleSchema = (post: BlogPost) => {
	const { frontmatter } = post;

	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: frontmatter.title,
		description: frontmatter.description,
		datePublished: withTimezone(frontmatter.date),
		dateModified: withTimezone(frontmatter.lastUpdated ?? frontmatter.date),
		url: `${SITE_URL}${getPostHref(post.slug)}`,
		image: {
			"@type": "ImageObject",
			url: frontmatter.image ?? `${SITE_URL}${SITE_AUTHOR.image}`,
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
};
