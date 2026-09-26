import { expect, test } from "./fixtures";

// Baselines are Linux renders. Create and compare them only through
// `bun run e2e:docker` or `bun run e2e:update`; the default `bun run e2e`
// skips this file because macOS renders fonts differently.
const PAGES = [
	{ name: "home", path: "/" },
	{ name: "about", path: "/about" },
	{ name: "blog", path: "/blog" },
	{ name: "post", path: "/blog/join-the-scrum" },
];

for (const colorScheme of ["light", "dark"] as const) {
	test.describe(`${colorScheme} theme`, { tag: "@visual" }, () => {
		test.use({ colorScheme });

		for (const { name, path } of PAGES) {
			test(name, async ({ page }) => {
				await page.goto(path);
				// A full-page capture never scrolls, so lazy images below the fold
				// would stay blank. Load every image before capturing.
				await page.evaluate(async () => {
					for (const image of document.images) image.loading = "eager";
					await Promise.all(
						Array.from(document.images, (image) =>
							image.decode().catch(() => {}),
						),
					);
					await document.fonts.ready;
				});
				// Ad slots collapse on a timer once the stubbed loader never fills
				// them, which would shift the page height mid-capture. Remove them.
				await page.addStyleTag({
					content: "[data-ad-placement] { display: none !important; }",
				});

				await expect(page).toHaveScreenshot(`${name}-${colorScheme}.png`, {
					fullPage: true,
				});
			});
		}
	});
}
