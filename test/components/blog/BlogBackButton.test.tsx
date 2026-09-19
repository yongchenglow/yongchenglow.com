import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { BlogBackButton } from "@/src/components/blog/BlogBackButton";

describe("BlogBackButton", () => {
	it("links to the article index with a descriptive label", () => {
		render(<BlogBackButton />);

		const link = screen.getByRole("link", { name: "All articles" });
		expect(link).toHaveAttribute("href", "/blog");
	});

	it("is aligned to the start of the article header", () => {
		const { container } = render(<BlogBackButton />);

		expect(container.firstElementChild).toHaveClass("justify-start");
	});
});
