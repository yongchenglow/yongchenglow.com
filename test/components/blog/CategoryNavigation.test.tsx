import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryNavigation from "@/src/components/blog/CategoryNavigation";

vi.mock("@/src/lib/blog", () => ({
  getAllCategories: () => [
    { slug: "development", label: "Development", tags: [], description: "" },
    { slug: "design", label: "Design", tags: [], description: "" },
  ],
  getCategoryPostCounts: () => ({ development: 5, design: 3 }),
}));

describe("CategoryNavigation", () => {
  it("renders a badge for each category", () => {
    render(<CategoryNavigation />);
    expect(screen.getByText(/Development/)).toBeInTheDocument();
    expect(screen.getByText(/Design/)).toBeInTheDocument();
  });

  it("each badge links to /blog/category/<slug>/1", () => {
    render(<CategoryNavigation />);
    expect(screen.getByRole("link", { name: /Development/ })).toHaveAttribute(
      "href",
      "/blog/category/development/1"
    );
    expect(screen.getByRole("link", { name: /Design/ })).toHaveAttribute(
      "href",
      "/blog/category/design/1"
    );
  });

  it("displays post count alongside category label", () => {
    render(<CategoryNavigation />);
    expect(screen.getByText(/Development \(5\)/)).toBeInTheDocument();
    expect(screen.getByText(/Design \(3\)/)).toBeInTheDocument();
  });
});
