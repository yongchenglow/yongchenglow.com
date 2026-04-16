import type { MetadataRoute } from "next";
import { BLOG_CONFIG } from "@/src/config/blog";
import { SITE_URL } from "@/src/config/site";
import {
	getAllBlogPosts,
	getAllCategories,
	getAllPostYears,
	getBlogPostsByCategory,
	getBlogPostsByYear,
} from "@/src/lib/blog";

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
	const posts = getAllBlogPosts();
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

	// Latest paginated pages
	const totalLatestPages = Math.ceil(posts.length / BLOG_CONFIG.postsPerPage);
	for (let i = 1; i <= totalLatestPages; i++) {
		entries.push({
			url: `${SITE_URL}/blog/latest/${i}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		});
	}

	// Category paginated pages
	const categories = getAllCategories();
	for (const category of categories) {
		const categoryPosts = getBlogPostsByCategory(category.slug);
		const totalCategoryPages = Math.ceil(
			categoryPosts.length / BLOG_CONFIG.postsPerPage,
		);
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
	const allTagsSet = new Set<string>();
	for (const post of posts) {
		for (const tag of post.frontmatter.tags ?? []) {
			allTagsSet.add(tag);
		}
	}
	for (const tag of allTagsSet) {
		entries.push({
			url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		});
	}

	// Year paginated pages
	const years = getAllPostYears();
	for (const year of years) {
		const yearPosts = getBlogPostsByYear(year);
		const totalYearPages = Math.ceil(
			yearPosts.length / BLOG_CONFIG.postsPerPage,
		);
		for (let i = 1; i <= totalYearPages; i++) {
			entries.push({
				url: `${SITE_URL}/blog/year/${year}/${i}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.5,
			});
		}
	}

	return entries;
};

export default sitemap;
