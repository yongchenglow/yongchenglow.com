import { afterEach, describe, expect, it } from "bun:test";
import cloudflareImageLoader from "@/src/lib/image-loader";

const mutableEnv = process.env as { NODE_ENV?: string };
const originalNodeEnv = mutableEnv.NODE_ENV;

describe("cloudflareImageLoader", () => {
	afterEach(() => {
		mutableEnv.NODE_ENV = originalNodeEnv;
	});

	it("routes local images through Cloudflare transformations", () => {
		mutableEnv.NODE_ENV = "production";

		expect(
			cloudflareImageLoader({ src: "/img/work.jpg", width: 1080, quality: 85 }),
		).toBe("/cdn-cgi/image/width=1080,quality=85,format=auto/img/work.jpg");
	});

	it("defaults quality to 75", () => {
		mutableEnv.NODE_ENV = "production";

		expect(cloudflareImageLoader({ src: "/img/work.jpg", width: 640 })).toBe(
			"/cdn-cgi/image/width=640,quality=75,format=auto/img/work.jpg",
		);
	});

	it("encodes spaces so the URL survives srcset parsing", () => {
		mutableEnv.NODE_ENV = "production";

		expect(
			cloudflareImageLoader({ src: "/img/Sha Tin College.jpg", width: 640 }),
		).toBe(
			"/cdn-cgi/image/width=640,quality=75,format=auto/img/Sha%20Tin%20College.jpg",
		);
	});

	it("leaves remote images untouched", () => {
		mutableEnv.NODE_ENV = "production";
		const src = "https://example.com/photo.jpg";

		expect(cloudflareImageLoader({ src, width: 640 })).toBe(src);
	});

	it("serves the original file in development", () => {
		mutableEnv.NODE_ENV = "development";

		expect(cloudflareImageLoader({ src: "/img/work.jpg", width: 640 })).toBe(
			"/img/work.jpg?w=640",
		);
	});
});
