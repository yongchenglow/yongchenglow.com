import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { YearFilter } from "@/src/components/blog/YearFilter";
import * as blogLib from "@/src/lib/blog";

vi.mock("@/src/lib/blog");

describe("YearFilter", () => {
	it("renders a badge for each year", () => {
		vi.mocked(blogLib.getAllPostYears).mockReturnValue([2024, 2023]);
		vi.mocked(blogLib.getYearPostCounts).mockReturnValue({ 2024: 8, 2023: 4 });

		render(<YearFilter />);
		expect(screen.getByText(/2024/)).toBeInTheDocument();
		expect(screen.getByText(/2023/)).toBeInTheDocument();
	});

	it("each badge links to /blog/year/<year>/1", () => {
		vi.mocked(blogLib.getAllPostYears).mockReturnValue([2024, 2023]);
		vi.mocked(blogLib.getYearPostCounts).mockReturnValue({ 2024: 8, 2023: 4 });

		render(<YearFilter />);
		expect(screen.getByRole("link", { name: /2024/ })).toHaveAttribute(
			"href",
			"/blog/year/2024/1",
		);
		expect(screen.getByRole("link", { name: /2023/ })).toHaveAttribute(
			"href",
			"/blog/year/2023/1",
		);
	});

	it("displays post count alongside year label", () => {
		vi.mocked(blogLib.getAllPostYears).mockReturnValue([2024, 2023]);
		vi.mocked(blogLib.getYearPostCounts).mockReturnValue({ 2024: 8, 2023: 4 });

		render(<YearFilter />);
		expect(screen.getByText(/2024 \(8\)/)).toBeInTheDocument();
		expect(screen.getByText(/2023 \(4\)/)).toBeInTheDocument();
	});
});

describe("YearFilter with no years", () => {
	it("returns null when getAllPostYears returns an empty array", () => {
		vi.mocked(blogLib.getAllPostYears).mockReturnValue([]);
		vi.mocked(blogLib.getYearPostCounts).mockReturnValue({});

		const { container } = render(<YearFilter />);
		expect(container.firstChild).toBeNull();
	});
});
