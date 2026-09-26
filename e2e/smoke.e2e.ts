import { expect, test } from "./fixtures";
import { getSitemapPaths } from "./sitemap";

// Smoke tests are tagged so `bun run e2e:smoke` can run them against a
// deployed review app or production. Keep them read-only and fast.
test.describe("smoke", { tag: "@smoke" }, () => {
	test("every page in the sitemap renders", async ({ page, request }) => {
		// One test walks every page, so allow more than the default timeout.
		test.slow();
		const paths = await getSitemapPaths(request);
		expect(paths.length).toBeGreaterThan(0);

		for (const path of paths) {
			await test.step(path, async () => {
				const response = await page.goto(path);
				expect.soft(response?.status(), path).toBe(200);
				await expect.soft(page.locator("h1").first(), path).toBeVisible();

				// Content wider than the viewport makes the page scroll sideways.
				const { scrollWidth, clientWidth } = await page.evaluate(() => ({
					scrollWidth: document.documentElement.scrollWidth,
					clientWidth: document.documentElement.clientWidth,
				}));
				expect
					.soft(scrollWidth, `${path} overflows horizontally`)
					.toBe(clientWidth);
			});
		}
	});

	test("unknown pages return the not-found page", async ({ page }) => {
		// Chromium reports the 404 document itself as a console error. That is
		// the behaviour under test, so drop the shared fixture's listener.
		page.removeAllListeners("console");

		const response = await page.goto("/this-page-does-not-exist");

		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
	});

	test("robots.txt points crawlers at the sitemap", async ({ request }) => {
		const response = await request.get("/robots.txt");

		expect(response.status()).toBe(200);
		expect(await response.text()).toContain("sitemap.xml");
	});

	test("latest posts API returns a page of posts", async ({ request }) => {
		const response = await request.get("/api/blog/latest?page=1");

		expect(response.status()).toBe(200);
		expect(await response.json()).toMatchObject({
			items: expect.any(Array),
			currentPage: 1,
		});
	});

	test("category posts API rejects a missing category", async ({ request }) => {
		const response = await request.get("/api/blog/category");

		expect(response.status()).toBe(400);
	});

	test("Open Graph image renders as a PNG", async ({ request }) => {
		const response = await request.get("/og?title=Smoke%20test");

		expect(response.status()).toBe(200);
		expect(response.headers()["content-type"]).toBe("image/png");
	});
});
