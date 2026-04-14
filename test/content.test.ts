import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
	AboutSchema,
	AuthorSchema,
	BlogFrontmatterSchema,
	HomeSchema,
} from "@/src/content/schema";

const contentDir = join(process.cwd(), "content");

describe("Content JSON Validation", () => {
	it("about.json should match AboutSchema", () => {
		const content = readFileSync(join(contentDir, "about.json"), "utf-8");
		const data = JSON.parse(content);
		const result = AboutSchema.safeParse(data);

		if (!result.success) {
			throw new Error(
				`about.json validation failed:\n${result.error.issues
					.map((e) => `  - ${e.path.join(".")}: ${e.message}`)
					.join("\n")}`,
			);
		}

		expect(result.data).toBeDefined();
	});

	it("home.json should match HomeSchema", () => {
		const content = readFileSync(join(contentDir, "home.json"), "utf-8");
		const data = JSON.parse(content);
		const result = HomeSchema.safeParse(data);

		if (!result.success) {
			throw new Error(
				`home.json validation failed:\n${result.error.issues
					.map((e) => `  - ${e.path.join(".")}: ${e.message}`)
					.join("\n")}`,
			);
		}

		expect(result.data).toBeDefined();
	});

	it("authors/*.json should match AuthorSchema", () => {
		const authorsDir = join(contentDir, "authors");
		const files = readdirSync(authorsDir).filter((f) => f.endsWith(".json"));

		for (const file of files) {
			const content = readFileSync(join(authorsDir, file), "utf-8");
			const data = JSON.parse(content);
			const result = AuthorSchema.safeParse(data);

			if (!result.success) {
				throw new Error(
					`authors/${file} validation failed:\n${result.error.issues
						.map((e) => `  - ${e.path.join(".")}: ${e.message}`)
						.join("\n")}`,
				);
			}

			expect(result.data).toBeDefined();
		}
	});

	it("timeline in about.json should have correct order (work first, then education/military)", () => {
		const content = readFileSync(join(contentDir, "about.json"), "utf-8");
		const data = JSON.parse(content);
		const aboutResult = AboutSchema.safeParse(data);

		if (!aboutResult.success) {
			throw new Error("about.json schema validation failed");
		}

		const about = aboutResult.data;

		// Verify timeline has items in expected order (work first, then education/military)
		const workItems = about.timeline.filter((item) => item.type === "work");
		const nonWorkItems = about.timeline.filter((item) => item.type !== "work");

		// Find the first non-work item index
		const firstNonWorkIndex = about.timeline.findIndex(
			(item) => item.type !== "work",
		);

		// All work items should come before non-work items
		if (firstNonWorkIndex !== -1) {
			for (let i = firstNonWorkIndex; i < about.timeline.length; i++) {
				expect(
					about.timeline[i].type,
					`Work item found after non-work item at index ${i}`,
				).not.toBe("work");
			}
		}

		// Verify we have expected counts
		expect(workItems.length).toBeGreaterThan(0);
		expect(nonWorkItems.length).toBeGreaterThan(0);
	});

	it("blog posts frontmatter should match BlogFrontmatterSchema", () => {
		const blogDir = join(contentDir, "blog");
		const files = readdirSync(blogDir).filter(
			(f) => f.endsWith(".mdx") || f.endsWith(".md"),
		);

		for (const file of files) {
			const content = readFileSync(join(blogDir, file), "utf-8");
			const { data } = matter(content);
			const result = BlogFrontmatterSchema.safeParse(data);

			if (!result.success) {
				throw new Error(
					`blog/${file} frontmatter validation failed:\n${result.error.issues
						.map((e) => `  - ${e.path.join(".")}: ${e.message}`)
						.join("\n")}`,
				);
			}

			expect(result.data).toBeDefined();
		}
	});
});
