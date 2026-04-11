import { describe, expect, it } from "vitest";
import sitemap from "@/src/app/sitemap";

describe("sitemap", () => {
	it("includes the home page with priority 1.0", async () => {
		const entries = await sitemap();
		const home = entries.find((e) => e.url === "https://www.yongchenglow.com");
		expect(home).toBeDefined();
		expect(home?.priority).toBe(1.0);
		expect(home?.changeFrequency).toBe("weekly");
	});

	it("includes /about with priority 0.8", async () => {
		const entries = await sitemap();
		const about = entries.find(
			(e) => e.url === "https://www.yongchenglow.com/about",
		);
		expect(about).toBeDefined();
		expect(about?.priority).toBe(0.8);
		expect(about?.changeFrequency).toBe("monthly");
	});

	it("includes /blog with priority 0.9", async () => {
		const entries = await sitemap();
		const blog = entries.find(
			(e) => e.url === "https://www.yongchenglow.com/blog",
		);
		expect(blog).toBeDefined();
		expect(blog?.priority).toBe(0.9);
		expect(blog?.changeFrequency).toBe("daily");
	});

	it("includes blog post URLs with priority 0.7", async () => {
		const entries = await sitemap();
		const posts = entries.filter(
			(e) =>
				e.url.startsWith("https://www.yongchenglow.com/blog/") &&
				!e.url.includes("/latest/") &&
				!e.url.includes("/category/") &&
				!e.url.includes("/tag/") &&
				!e.url.includes("/year/"),
		);
		expect(posts.length).toBeGreaterThan(0);
		for (const post of posts) {
			expect(post.priority).toBe(0.7);
			expect(post.changeFrequency).toBe("monthly");
			expect(post.lastModified).toBeDefined();
		}
	});

	it("includes paginated listing pages with priority 0.5", async () => {
		const entries = await sitemap();
		const listingPages = entries.filter(
			(e) =>
				e.url.includes("/latest/") ||
				e.url.includes("/category/") ||
				e.url.includes("/tag/") ||
				e.url.includes("/year/"),
		);
		expect(listingPages.length).toBeGreaterThan(0);
		for (const page of listingPages) {
			expect(page.priority).toBe(0.5);
		}
	});
});
