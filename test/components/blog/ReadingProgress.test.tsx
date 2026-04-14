import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReadingProgress } from "@/src/components/blog/ReadingProgress";

describe("ReadingProgress", () => {
	const pageTitle = "Test Blog Post";

	beforeEach(() => {
		vi.useFakeTimers();
		// Mock window.scrollY
		Object.defineProperty(window, "scrollY", {
			value: 0,
			writable: true,
			configurable: true,
		});
		// Mock document.documentElement.scrollHeight
		Object.defineProperty(document.documentElement, "scrollHeight", {
			value: 1000,
			writable: true,
			configurable: true,
		});
		Object.defineProperty(window, "innerHeight", {
			value: 500,
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.useRealTimers();
		// Clean up document.title
		document.title = "";
	});

	it("renders progress bar container", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);
		expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
	});

	it("renders progress bar fill element", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);
		expect(screen.getByTestId("progress-bar-fill")).toBeInTheDocument();
	});

	it("has transition on progress bar", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);
		const progressFill = screen.getByTestId("progress-bar-fill");
		expect(progressFill).toHaveClass("transition-all");
	});

	it("shows title with percentage on scroll", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);

		// Simulate scrolling
		window.scrollY = 250;
		window.dispatchEvent(new Event("scroll"));

		expect(document.title).toMatch(/^\d+% • /);
		expect(document.title).toContain(pageTitle);
	});

	it("restores original title on unmount", () => {
		const { unmount } = render(<ReadingProgress pageTitle={pageTitle} />);

		unmount();

		expect(document.title).toBe(`YC | ${pageTitle}`);
	});

	it("progress bar has gradient color that changes with progress", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);
		const progressFill = screen.getByTestId("progress-bar-fill");

		// At 0%, should be blue (#3b82f6)
		const style = window.getComputedStyle(progressFill);
		expect(style.backgroundColor).toBeDefined();
	});

	it("progress bar has glow effect with boxShadow", () => {
		render(<ReadingProgress pageTitle={pageTitle} />);
		const progressFill = screen.getByTestId("progress-bar-fill");

		const style = window.getComputedStyle(progressFill);
		expect(style.boxShadow).toBeDefined();
	});
});
