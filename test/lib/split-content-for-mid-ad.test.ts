import { describe, expect, it } from "bun:test";
import { splitContentForMidAd } from "@/src/lib/blog";

describe("splitContentForMidAd", () => {
	const longBody = [
		"Intro paragraph.",
		"",
		"## First",
		"",
		"Body of the first section.",
		"",
		"## Second",
		"",
		"Body of the second section.",
		"",
		"## Third",
		"",
		"Body of the third section.",
	].join("\n");

	it("does not split a short post", () => {
		const result = splitContentForMidAd(longBody, 400);

		expect(result.after).toBeNull();
		expect(result.before).toBe(longBody);
	});

	it("splits a long post at a section heading past the midpoint", () => {
		const result = splitContentForMidAd(longBody, 1500);

		expect(result.before).toContain("## First");
		expect(result.after).not.toBeNull();
		expect(result.after?.startsWith("## ")).toBe(true);
	});

	it("preserves the full content across the split", () => {
		const result = splitContentForMidAd(longBody, 1500);

		expect(`${result.before}\n${result.after}`).toBe(longBody);
	});

	it("ignores headings inside fenced code blocks", () => {
		const withFence = [
			"Intro.",
			"",
			"```bash",
			"# not a heading",
			"## also not a heading",
			"```",
			"",
			"More prose to push the midpoint past the fence.",
			"",
			"## Real Heading",
			"",
			"Tail.",
		].join("\n");

		const result = splitContentForMidAd(withFence, 1500);

		expect(result.after?.startsWith("## Real Heading")).toBe(true);
	});

	it("returns a single part when a long post has no headings", () => {
		const result = splitContentForMidAd("Just prose.\n\nMore prose.", 1500);

		expect(result.after).toBeNull();
	});
});
