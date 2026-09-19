import { describe, expect, it } from "bun:test";
import {
	readBlogContent,
	readPublishedBlogContent,
} from "../../helpers/blog-content";

const { generateMetadata, generateStaticParams } = await import(
	"@/src/app/blog/[slug]/page"
);

describe("blog post routes", () => {
	it("generates direct routes for every post, including drafts", async () => {
		const expectedSlugs = readBlogContent()
			.map((post) => post.slug)
			.sort();
		const actualSlugs = (await generateStaticParams())
			.map(({ slug }) => slug)
			.sort();

		expect(actualSlugs).toEqual(expectedSlugs);
	});

	it("builds metadata from the requested post", async () => {
		const post = readPublishedBlogContent()[0];
		const metadata = await generateMetadata({
			params: Promise.resolve({ slug: post.slug }),
		});

		expect(metadata).toMatchObject({
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			alternates: { canonical: `/blog/${post.slug}` },
			openGraph: {
				title: post.frontmatter.title,
				description: post.frontmatter.description,
				publishedTime: post.frontmatter.date,
			},
		});
	});

	it("returns not-found metadata for a missing post", async () => {
		const metadata = await generateMetadata({
			params: Promise.resolve({ slug: "missing-post" }),
		});

		expect(metadata).toEqual({ title: "Post Not Found" });
	});
});
