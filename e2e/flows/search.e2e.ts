import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

// On mobile the search button lives inside the navigation menu.
const openSearch = async (page: Page, isMobile: boolean) => {
	if (isMobile) {
		await page.getByRole("button", { name: "Open navigation menu" }).click();
	}
	await page.getByRole("button", { name: "Search" }).click();
	return page.getByRole("dialog", { name: "Search Blog Posts" });
};

test.describe("blog search", () => {
	test("finds a post and opens it", async ({ page, isMobile }) => {
		await page.goto("/");
		const dialog = await openSearch(page, isMobile);

		await dialog.getByPlaceholder("Search for posts").fill("scrum");
		await dialog.getByRole("button", { name: /Join the Scrum/ }).click();

		await expect(page).toHaveURL("/blog/join-the-scrum");
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Join the Scrum",
		);
	});

	test("explains when nothing matches", async ({ page, isMobile }) => {
		await page.goto("/");
		const dialog = await openSearch(page, isMobile);

		await dialog.getByPlaceholder("Search for posts").fill("zzzqqq");

		await expect(dialog).toContainText('No results found for "zzzqqq"');
	});

	test("opens with the keyboard shortcut", async ({ page, isMobile }) => {
		test.skip(isMobile, "Touch devices have no keyboard shortcut");

		await page.goto("/");
		await page.keyboard.press("ControlOrMeta+k");

		await expect(
			page.getByRole("dialog", { name: "Search Blog Posts" }),
		).toBeVisible();
	});
});
