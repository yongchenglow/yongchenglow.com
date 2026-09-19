import { describe, expect, it } from "bun:test";
import {
	generateMetadata,
	generateStaticParams,
} from "@/src/app/blog/tag/[tag]/page";
import { readPublishedBlogContent } from "../../helpers/blog-content";

describe("tag pages", () => {
	it("generates one route for every distinct published tag", async () => {
		const expectedTags = Array.from(
			new Set(
				readPublishedBlogContent().flatMap(
					(post) => post.frontmatter.tags ?? [],
				),
			),
		).sort();
		const actualTags = (await generateStaticParams())
			.map(({ tag }) => tag)
			.sort();

		expect(actualTags).toEqual(expectedTags);
	});

	it("percent-encodes the canonical URL for a tag", async () => {
		const metadata = await generateMetadata({
			params: Promise.resolve({ tag: "product management" }),
		});

		expect(metadata.alternates.canonical).toBe(
			"/blog/tag/product%20management",
		);
	});
});
