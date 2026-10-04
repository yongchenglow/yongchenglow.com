import { describe, expect, it } from "bun:test";
import { blurDataURLFor, cn, formatDate } from "@/src/lib/utils";

const decodeSvg = (dataUrl: string): string =>
	atob(dataUrl.replace("data:image/svg+xml;base64,", ""));

describe("blurDataURLFor", () => {
	it("uses the generated placeholder for a known image", () => {
		expect(blurDataURLFor("/img/yong-cheng-badminton.jpg")).toMatch(
			/^data:image\/jpeg;base64,/,
		);
	});

	it("falls back to a decodable SVG for an unknown image", () => {
		const fallback = blurDataURLFor("/img/unknown.jpg");
		expect(fallback).toMatch(/^data:image\/svg\+xml;base64,/);

		const svg = decodeSvg(fallback);
		expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
		expect(svg).toContain("<rect");
		// The colour is the only value in a `stop-color`; a data URL here would
		// be invalid and the browser would drop the gradient.
		expect(svg).toContain('stop-color="#888888"');
	});

	it("never returns a data URL inside the fallback colour", () => {
		const svg = decodeSvg(blurDataURLFor("https://example.com/image.jpg"));
		expect(svg).not.toContain('stop-color="data:');
	});

	it("keeps the fallback small enough to inline", () => {
		expect(blurDataURLFor("/img/unknown.jpg").length).toBeLessThan(500);
	});
});

describe("formatDate", () => {
	it("formats a calendar date deterministically for the site locale", () => {
		const originalToLocaleDateString = Date.prototype.toLocaleDateString;
		Date.prototype.toLocaleDateString = () => "19 Sept 2026";

		try {
			expect(formatDate("2026-09-19")).toBe("19 Sep 2026");
		} finally {
			Date.prototype.toLocaleDateString = originalToLocaleDateString;
		}
	});
});

describe("cn", () => {
	it("lets a later Tailwind class win", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
	});
});
