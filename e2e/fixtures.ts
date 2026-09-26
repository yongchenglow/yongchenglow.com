import { test as base, expect } from "@playwright/test";

/**
 * The shared `test` for every spec. It overrides two built-in fixtures, so
 * API-only tests that never touch `page` do not launch a browser:
 *
 * - `context` blocks third-party requests (analytics, ads), so results never
 *   depend on an external service being reachable.
 * - `page` fails the test on any first-party console error or uncaught
 *   exception, because a page that renders but throws is still broken.
 */
export const test = base.extend({
	context: async ({ context, baseURL }, use) => {
		if (!baseURL) throw new Error("playwright.config.ts must set baseURL");
		const siteOrigin = new URL(baseURL).origin;

		await context.route(
			(url) => url.origin !== siteOrigin,
			(route) => route.abort("blockedbyclient"),
		);

		// Production builds load images through Cloudflare Image Transformations
		// (src/lib/image-loader.ts), which only exist behind Cloudflare. A local
		// server has no /cdn-cgi route, so serve the original file instead.
		if (!process.env.BASE_URL) {
			await context.route("**/cdn-cgi/image/**", (route) => {
				const { pathname } = new URL(route.request().url());
				const original = pathname.replace(/^\/cdn-cgi\/image\/[^/]+/, "");
				return route.continue({ url: siteOrigin + original });
			});
		}

		await use(context);
	},

	page: async ({ page, baseURL }, use) => {
		const siteOrigin = new URL(baseURL ?? "").origin;
		const errors: string[] = [];
		page.on("console", (message) => {
			if (message.type() !== "error") return;
			// Blocked third-party requests log errors located at their own URL.
			const { url } = message.location();
			if (url && new URL(url).origin !== siteOrigin) return;
			// Resource failures only name the status, so append the URL.
			errors.push(url ? `${message.text()} (${url})` : message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));

		await use(page);

		expect(errors, "console errors and uncaught exceptions").toEqual([]);
	},
});

export { expect };
