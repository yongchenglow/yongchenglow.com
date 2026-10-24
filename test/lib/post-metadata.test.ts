import { describe, expect, it } from "bun:test";
import { SITE_AUTHOR, SITE_URL } from "@/src/config/site";
import {
	getArticleSchema,
	getOgImagePath,
	getPostHref,
	getPostMetadata,
	parseOgCardRequest,
	SITE_HOST,
} from "@/src/lib/post-metadata";
import type { BlogPost } from "@/src/types/blog";

const post = (overrides: Partial<BlogPost> = {}): BlogPost => ({
	slug: "a-post",
	frontmatter: {
		title: "A post",
		description: "What it covers",
		date: "2024-03-04",
		author: "Test Author",
		tags: ["design", "ux"],
	},
	content: "",
	readingTime: "4 min read",
	wordCount: 800,
	...overrides,
});

const roundTrip = (path: string) => {
	const url = new URL(path, SITE_URL);
	return parseOgCardRequest(url.searchParams);
};

describe("getPostHref", () => {
	it("builds one shape", () => {
		expect(getPostHref("a-post")).toBe("/blog/a-post");
	});
});

describe("getOgImagePath and parseOgCardRequest", () => {
	it("round-trips the title and tags it just encoded", () => {
		const card = roundTrip(getOgImagePath(post()));
		expect(card.title).toBe("A post");
		expect(card.tags).toEqual(["design", "ux"]);
	});

	it("prefers a frontmatter image over the generated card", () => {
		const withImage = post();
		withImage.frontmatter.image = "/img/cover.png";
		expect(getOgImagePath(withImage)).toBe("/img/cover.png");
	});

	it("survives titles and tags with characters that need escaping", () => {
		const awkward = post();
		awkward.frontmatter.title = "Ship it: 100% & <done>";
		awkward.frontmatter.tags = ["a b", "c#"];

		const card = roundTrip(getOgImagePath(awkward));
		expect(card.title).toBe("Ship it: 100% & <done>");
		expect(card.tags).toEqual(["a b", "c#"]);
	});

	it("cannot carry a comma inside a tag: the card format joins them with commas", () => {
		const commaTag = post();
		commaTag.frontmatter.tags = ["c,d"];

		expect(roundTrip(getOgImagePath(commaTag)).tags).toEqual(["c", "d"]);
	});

	it("caps the title, the tag count, and each tag", () => {
		const card = parseOgCardRequest(
			new URLSearchParams({
				title: "t".repeat(500),
				tags: Array.from(
					{ length: 20 },
					(_, i) => `${"x".repeat(60)}-${i}`,
				).join(","),
			}),
		);

		expect(card.title).toHaveLength(200);
		expect(card.tags).toHaveLength(6);
		expect(card.tags[0]).toHaveLength(32);
	});

	it("falls back to the author name when no title is given", () => {
		expect(parseOgCardRequest(new URLSearchParams()).title).toBe(
			SITE_AUTHOR.name,
		);
	});

	it("drops empty tag segments", () => {
		expect(parseOgCardRequest(new URLSearchParams("tags=a,,b, ")).tags).toEqual(
			["a", "b"],
		);
	});
});

describe("getPostMetadata", () => {
	it("canonicalises to the post href and shares one image with openGraph and twitter", () => {
		const metadata = getPostMetadata(post());
		const image = getOgImagePath(post());

		expect(metadata.alternates.canonical).toBe("/blog/a-post");
		expect(metadata.openGraph.images).toEqual([image]);
		expect(metadata.twitter.images).toEqual([image]);
		expect(metadata.openGraph.type).toBe("article");
	});

	it("carries the last-updated date as the modified time", () => {
		const updated = post();
		updated.frontmatter.lastUpdated = "2024-05-06";
		expect(getPostMetadata(updated).openGraph.modifiedTime).toBe("2024-05-06");
	});
});

describe("getArticleSchema", () => {
	it("stamps both dates with the site offset", () => {
		const schema = getArticleSchema(post());
		expect(schema.datePublished).toBe("2024-03-04T00:00:00+08:00");
		expect(schema.dateModified).toBe("2024-03-04T00:00:00+08:00");
	});

	it("prefers the last-updated date for dateModified", () => {
		const updated = post();
		updated.frontmatter.lastUpdated = "2024-05-06";
		expect(getArticleSchema(updated).dateModified).toBe(
			"2024-05-06T00:00:00+08:00",
		);
	});

	it("falls back to the author image for the article image", () => {
		expect(getArticleSchema(post()).image.url).toBe(
			`${SITE_URL}${SITE_AUTHOR.image}`,
		);
	});
});

describe("SITE_HOST", () => {
	it("comes from the site URL rather than a literal", () => {
		expect(SITE_HOST).toBe(new URL(SITE_URL).host);
	});
});
