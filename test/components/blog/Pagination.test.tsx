import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pagination } from "@/src/components/blog/Pagination";

describe("Pagination", () => {
	it("renders nothing when totalPages is 1", () => {
		const { container } = render(
			<Pagination currentPage={1} totalPages={1} baseUrl="/blog/latest/" />,
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders nothing when totalPages is 0", () => {
		const { container } = render(
			<Pagination currentPage={1} totalPages={0} baseUrl="/blog/latest/" />,
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders all page numbers when totalPages <= 7", () => {
		render(
			<Pagination currentPage={1} totalPages={5} baseUrl="/blog/latest/" />,
		);
		for (let i = 1; i <= 5; i++) {
			expect(screen.getByText(String(i))).toBeInTheDocument();
		}
		expect(screen.queryByText("...")).not.toBeInTheDocument();
	});

	it("renders ellipsis when totalPages > 7 and current page is in the middle", () => {
		render(
			<Pagination currentPage={5} totalPages={10} baseUrl="/blog/latest/" />,
		);
		expect(screen.getAllByText("...")).toHaveLength(2);
	});

	it("renders only trailing ellipsis when on page 1 with many pages", () => {
		render(
			<Pagination currentPage={1} totalPages={10} baseUrl="/blog/latest/" />,
		);
		expect(screen.getAllByText("...")).toHaveLength(1);
	});

	it("renders only leading ellipsis when on last page with many pages", () => {
		render(
			<Pagination currentPage={10} totalPages={10} baseUrl="/blog/latest/" />,
		);
		expect(screen.getAllByText("...")).toHaveLength(1);
	});

	it("disables Previous button on page 1", () => {
		render(
			<Pagination currentPage={1} totalPages={5} baseUrl="/blog/latest/" />,
		);
		const prev = screen.getByRole("button", { name: /previous/i });
		expect(prev).toBeDisabled();
	});

	it("disables Next button on last page", () => {
		render(
			<Pagination currentPage={5} totalPages={5} baseUrl="/blog/latest/" />,
		);
		const next = screen.getByRole("button", { name: /next/i });
		expect(next).toBeDisabled();
	});

	it("Previous button links to baseUrl + (currentPage - 1)", () => {
		render(
			<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />,
		);
		const prev = screen.getByRole("link", { name: /previous/i });
		expect(prev).toHaveAttribute("href", "/blog/latest/2");
	});

	it("Next button links to baseUrl + (currentPage + 1)", () => {
		render(
			<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />,
		);
		const next = screen.getByRole("link", { name: /next/i });
		expect(next).toHaveAttribute("href", "/blog/latest/4");
	});

	it("active page is rendered as a span (not a link) and is disabled", () => {
		render(
			<Pagination currentPage={3} totalPages={5} baseUrl="/blog/latest/" />,
		);
		const activePage = screen.getByRole("button", { name: "3" });
		expect(activePage).toBeDisabled();
		// Should not be wrapped in an anchor
		expect(activePage.closest("a")).toBeNull();
	});
});
