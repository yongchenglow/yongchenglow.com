import { expect, test } from "../fixtures";

test.use({ colorScheme: "light" });

test("theme toggle switches to dark and remembers the choice", async ({
	page,
	isMobile,
}) => {
	await page.goto("/");
	const html = page.locator("html");
	await expect(html).not.toHaveClass(/dark/);

	if (isMobile) {
		await page.getByRole("button", { name: "Open navigation menu" }).click();
	}
	await page.getByRole("switch", { name: "Toggle theme" }).click();
	await expect(html).toHaveClass(/dark/);

	await page.reload();
	await expect(html).toHaveClass(/dark/);
});
