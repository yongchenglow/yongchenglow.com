import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { CategoryNavigation } from "@/src/components/blog/CategoryNavigation";
import { getAllCategories, getCategoryPostCounts } from "@/src/lib/blog";

// Render against real content. `mock.module` replaces a module for the whole
// process, so mocking `@/src/lib/blog` here leaked fake categories into every
// test file that ran afterwards.
const categories = getAllCategories();
const counts = getCategoryPostCounts();

describe("CategoryNavigation", () => {
	it("renders a link to page 1 of each category", () => {
		render(<CategoryNavigation />);
		for (const category of categories) {
			expect(
				screen.getByRole("link", {
					name: new RegExp(`^${category.label} \\(`),
				}),
			).toHaveAttribute("href", `/blog/category/${category.slug}/1`);
		}
	});

	it("displays post count alongside category label", () => {
		render(<CategoryNavigation />);
		for (const category of categories) {
			expect(
				screen.getByText(`${category.label} (${counts[category.slug] || 0})`),
			).toBeInTheDocument();
		}
	});
});
