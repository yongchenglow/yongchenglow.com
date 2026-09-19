import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sitemap from "@/src/app/sitemap";
import { BLOG_CATEGORIES, BLOG_CONFIG } from "@/src/config/blog";
import { SITE_URL } from "@/src/config/site";
import {
	getAllBlogPosts,
	getBlogPostsByCategory,
	getCategoryPostCounts,
} from "@/src/lib/blog";
import type { SerializedSearchIndex } from "@/src/types/search";
import { readPublishedBlogContent } from "./helpers/blog-content";

const repositoryRoot = process.cwd();
const generatedIndexRoot = mkdtempSync(join(tmpdir(), "blog-search-index-"));
let generatedSearchIndex: SerializedSearchIndex;

beforeAll(() => {
	cpSync(
		join(repositoryRoot, "content/blog"),
		join(generatedIndexRoot, "content/blog"),
		{ recursive: true },
	);
	mkdirSync(join(generatedIndexRoot, "public"));

	const generation = Bun.spawnSync({
		cmd: ["bun", join(repositoryRoot, "scripts/generate-search-index.mjs")],
		cwd: generatedIndexRoot,
		stdout: "pipe",
		stderr: "pipe",
	});
	if (generation.exitCode !== 0) {
		throw new Error(generation.stderr.toString());
	}

	generatedSearchIndex = JSON.parse(
		readFileSync(join(generatedIndexRoot, "public/search-index.json"), "utf8"),
	) as SerializedSearchIndex;
});

afterAll(() => {
	rmSync(generatedIndexRoot, { recursive: true, force: true });
});

describe("published blog contracts", () => {
	it("uses the published content files as the complete public post set", () => {
		const expectedSlugs = readPublishedBlogContent()
			.map((post) => post.slug)
			.sort();
		const actualSlugs = getAllBlogPosts()
			.map((post) => post.slug)
			.sort();

		expect(actualSlugs).toEqual(expectedSlugs);
	});

	it("keeps category collections and displayed counts aligned with content", () => {
		const posts = readPublishedBlogContent();
		const actualCounts = getCategoryPostCounts();

		for (const category of Object.values(BLOG_CATEGORIES)) {
			const expectedSlugs = posts
				.filter((post) =>
					post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
				)
				.map((post) => post.slug)
				.sort();
			const actualSlugs = getBlogPostsByCategory(category.slug)
				.map((post) => post.slug)
				.sort();

			expect(actualSlugs, category.slug).toEqual(expectedSlugs);
			expect(actualCounts[category.slug], category.slug).toBe(
				expectedSlugs.length,
			);
		}
	});

	it("keeps the generated search index identical to published content", () => {
		const publishedPosts = readPublishedBlogContent();

		expect(Object.keys(generatedSearchIndex.posts).sort()).toEqual(
			publishedPosts.map((post) => post.slug).sort(),
		);

		for (const post of publishedPosts) {
			expect(generatedSearchIndex.posts[post.slug]).toMatchObject({
				id: post.slug,
				title: post.frontmatter.title,
				subtitle: post.frontmatter.subtitle ?? "",
				description: post.frontmatter.description,
				tags: post.frontmatter.tags ?? [],
				date: post.frontmatter.date,
				url: `/blog/${post.slug}`,
			});
		}
	});

	it("publishes exactly the expected sitemap routes without duplicates", () => {
		const posts = readPublishedBlogContent();
		const expectedUrls = [SITE_URL, `${SITE_URL}/about`, `${SITE_URL}/blog`];

		expectedUrls.push(...posts.map((post) => `${SITE_URL}/blog/${post.slug}`));
		if (posts.length > 0) expectedUrls.push(`${SITE_URL}/blog/all`);

		for (const category of Object.values(BLOG_CATEGORIES)) {
			const postCount = posts.filter((post) =>
				post.frontmatter.tags?.some((tag) => category.tags.includes(tag)),
			).length;
			const pageCount = Math.ceil(postCount / BLOG_CONFIG.postsPerPage);
			for (let page = 1; page <= pageCount; page++) {
				expectedUrls.push(`${SITE_URL}/blog/category/${category.slug}/${page}`);
			}
		}

		const tags = new Set(posts.flatMap((post) => post.frontmatter.tags ?? []));
		expectedUrls.push(
			...Array.from(
				tags,
				(tag) => `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
			),
		);

		const actualUrls = sitemap().map((entry) => entry.url);
		expect(actualUrls.sort()).toEqual(expectedUrls.sort());
		expect(new Set(actualUrls).size).toBe(actualUrls.length);
	});
});
