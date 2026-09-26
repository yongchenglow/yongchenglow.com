import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";
import { getSitemapPaths } from "./sitemap";

// Minor and moderate findings are reported in the attachment but do not fail
// the run; serious and critical ones block people from using the page.
const BLOCKING_IMPACTS = new Set(["serious", "critical"]);

// Known debt, still attached to every report. Both rules fail only because of
// the colour tokens: the brand blue (#178fd7) and muted text fall short of the
// 4.5:1 WCAG AA ratio, and in-text links rely on that colour alone. Remove a
// rule from this list once the design tokens that trip it are fixed.
const KNOWN_DEBT_RULES = new Set(["color-contrast", "link-in-text-block"]);

test("every page in the sitemap passes an axe scan", async ({
	page,
	request,
}, testInfo) => {
	// One test walks every page, so allow more than the default timeout.
	test.slow();
	const paths = await getSitemapPaths(request);

	for (const path of paths) {
		await test.step(path, async () => {
			await page.goto(path);
			const results = await new AxeBuilder({ page })
				.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
				.analyze();

			await testInfo.attach(`axe ${path}`, {
				body: JSON.stringify(results.violations, null, 2),
				contentType: "application/json",
			});

			const blocking = results.violations
				.filter((violation) => BLOCKING_IMPACTS.has(violation.impact ?? ""))
				.filter((violation) => !KNOWN_DEBT_RULES.has(violation.id))
				.map((violation) => `${violation.id}: ${violation.help}`);
			expect.soft(blocking, path).toEqual([]);
		});
	}
});
