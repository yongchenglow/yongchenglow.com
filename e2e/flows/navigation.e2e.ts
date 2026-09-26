import { expect, test } from "../fixtures";

test.describe("site navigation", () => {
	test("header links reach every top-level page", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "The mobile menu is covered separately");

		await page.goto("/");
		const nav = page.getByRole("navigation", { name: "Main" });

		await nav.getByRole("link", { name: "About" }).click();
		await expect(page).toHaveURL("/about");

		await nav.getByRole("link", { name: "Blog" }).click();
		await expect(page).toHaveURL("/blog");
		await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");

		await nav.getByRole("link", { name: "Home" }).click();
		await expect(page).toHaveURL("/");
	});

	test("mobile menu opens, navigates, and closes", async ({
		page,
		isMobile,
	}) => {
		test.skip(!isMobile, "Desktop shows the links inline");

		await page.goto("/");
		await page.getByRole("button", { name: "Open navigation menu" }).click();

		const menu = page.getByRole("dialog", { name: "Navigation" });
		await menu.getByRole("link", { name: "Blog" }).click();

		await expect(page).toHaveURL("/blog");
		await expect(menu).toBeHidden();
	});
});
