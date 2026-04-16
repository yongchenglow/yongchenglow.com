import { describe, expect, it } from "vitest";
import { getBlurDataURL, getImagePlaceholder } from "@/src/lib/utils";

/**
 * Tests for image rendering performance utilities.
 * These ensure the blur-up placeholder pattern works correctly:
 * - Blur data URLs are valid and can be decoded by browsers
 * - Placeholder colors match known images for smooth transition
 * - Fallback behavior works for unknown images
 */
describe("Image Placeholder Utilities", () => {
	describe("getBlurDataURL", () => {
		it("should generate a valid data URL", () => {
			const result = getBlurDataURL();
			expect(result).toBeTruthy();
			expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
		});

		it("should generate different URLs for different colors", () => {
			const gray = getBlurDataURL("#888888");
			const blue = getBlurDataURL("#4A6FA5");
			expect(gray).not.toBe(blue);
		});

		it("should use default gray color when no color provided", () => {
			const result = getBlurDataURL();
			// Decode base64 to verify color is present
			const base64Part = result.replace("data:image/svg+xml;base64,", "");
			const decoded = atob(base64Part);
			expect(decoded).toContain("#888888");
		});
	});

	describe("getImagePlaceholder", () => {
		it("should return base64 data URL for hero image", () => {
			const result = getImagePlaceholder("/img/yong-cheng-badminton.jpg");
			expect(result).toMatch(/^data:image\/jpeg;base64,/);
		});

		it("should return base64 data URL for blog image", () => {
			const result = getImagePlaceholder("/img/computer-g39398e915_1280.jpg");
			expect(result).toMatch(/^data:image\/jpeg;base64,/);
		});

		it("should return default gray for unknown images", () => {
			const result = getImagePlaceholder("/img/unknown.jpg");
			expect(result).toBe("#888888");
		});

		it("should return default gray for external URLs", () => {
			const result = getImagePlaceholder("https://example.com/image.jpg");
			expect(result).toBe("#888888");
		});
	});

	describe("getBlurDataURL - base64 validity", () => {
		it("should generate decodable base64 SVG", () => {
			const result = getBlurDataURL("#FF5733");
			const base64Part = result.replace("data:image/svg+xml;base64,", "");

			// Should not throw - valid base64
			expect(() => atob(base64Part)).not.toThrow();

			const decoded = atob(base64Part);
			expect(decoded).toContain("<svg");
			expect(decoded).toContain("#FF5733");
		});

		it("should generate small payload data URLs", () => {
			const result = getBlurDataURL();
			// Blur data URLs should be under 500 bytes to be efficient
			expect(result.length).toBeLessThan(500);
		});

		it("should produce valid SVG content", () => {
			const result = getBlurDataURL("#4A6FA5");
			const base64Part = result.replace("data:image/svg+xml;base64,", "");
			const decoded = atob(base64Part);

			// Verify SVG structure
			expect(decoded).toContain('xmlns="http://www.w3.org/2000/svg"');
			expect(decoded).toContain("<rect");
			expect(decoded).toContain("fill=");
		});
	});
});
