import { expect, test } from "../fixtures";

test.describe("blog browsing", () => {
	test("a category link lists that category's posts", async ({ page }) => {
		await page.goto("/blog");

		await page.getByRole("link", { name: /^Process & Agile \(\d+\)$/ }).click();

		await expect(page).toHaveURL("/blog/category/process/1");
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Process & Agile",
		);
		await expect(
			page.getByRole("link", { name: /Join the Scrum/ }).first(),
		).toBeVisible();
	});

	test("a post's tag links to every post with that tag", async ({ page }) => {
		await page.goto("/blog/join-the-scrum");

		await page.getByRole("link", { name: "scrum", exact: true }).click();

		await expect(page).toHaveURL("/blog/tag/scrum");
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Tag: scrum",
		);
	});

	test("the archive paginates and links through to a post", async ({
		page,
	}) => {
		await page.goto("/blog/all");

		// The bare archive path is a redirect: the page number is canonical.
		await expect(page).toHaveURL("/blog/all/1");
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"All Posts",
		);

		await page
			.getByRole("link", { name: /Single Source of Truth/ })
			.first()
			.click();

		await expect(page).toHaveURL("/blog/single-source-of-truth");
	});
});
