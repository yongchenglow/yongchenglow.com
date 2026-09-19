import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";

const current = {
	label: "Development",
	href: "/blog/category/development/1",
};

describe("BlogBreadcrumb", () => {
	it("uses the shadcn breadcrumb semantics and links each ancestor", () => {
		render(<BlogBreadcrumb current={current} />);

		expect(
			screen.getByRole("navigation", { name: "Breadcrumb" }),
		).toBeDefined();
		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
			"href",
			"/blog",
		);
		expect(screen.getByText("Development")).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(
			screen.queryByRole("link", { name: "Development" }),
		).not.toBeInTheDocument();
	});

	it("builds BreadcrumbList JSON-LD from the same items", () => {
		const { container } = render(<BlogBreadcrumb current={current} />);
		const script = container.querySelector(
			'script[type="application/ld+json"]',
		);
		const data = JSON.parse(script?.textContent ?? "{}");

		expect(data).toEqual({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://www.yongchenglow.com/",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: "https://www.yongchenglow.com/blog",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "Development",
					item: "https://www.yongchenglow.com/blog/category/development/1",
				},
			],
		});
	});

	it("keeps only the Blog parent visible on compact mobile trails", () => {
		render(<BlogBreadcrumb current={current} compactOnMobile />);

		expect(screen.getByText("Home").closest("li")).toHaveClass("hidden");
		expect(screen.getByText("Blog").closest("li")).not.toHaveClass("hidden");
		expect(screen.getByText("Development").closest("li")).toHaveClass("hidden");
	});
});
