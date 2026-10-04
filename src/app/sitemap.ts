import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/config/site";
import { blog } from "@/src/lib/blog";
import { getAllTags, getListingPageCount } from "@/src/lib/blog-listing";

const sitemap = (): MetadataRoute.Sitemap => {
	const entries: MetadataRoute.Sitemap = [];

	// Static pages
	entries.push(
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${SITE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
	);

	// Blog posts
	const posts = blog.getAllBlogPosts();
	for (const post of posts) {
		entries.push({
			url: `${SITE_URL}/blog/${post.slug}`,
			lastModified: new Date(
				post.frontmatter.lastUpdated ?? post.frontmatter.date,
			),
			changeFrequency: "monthly",
			priority: 0.7,
		});
	}

	// All posts archive (timeline)
	if (posts.length > 0) {
		entries.push({
			url: `${SITE_URL}/blog/all`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		});
	}

	// Category paginated pages
	const categories = blog.getAllCategories();
	for (const category of categories) {
		const totalCategoryPages = getListingPageCount({
			kind: "category",
			slug: category.slug,
		});
		for (let i = 1; i <= totalCategoryPages; i++) {
			entries.push({
				url: `${SITE_URL}/blog/category/${category.slug}/${i}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.5,
			});
		}
	}

	// Tag pages
	for (const tag of getAllTags()) {
		entries.push({
			url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		});
	}

	return entries;
};

export default sitemap;
