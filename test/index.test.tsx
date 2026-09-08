import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import Index from "@/src/app/page";

describe("Index", () => {
	it("renders the homepage", () => {
		const { container } = render(<Index />);
		expect(container).toBeInTheDocument();
	});

	it("does not nest interactive controls inside links", () => {
		const { container } = render(<Index />);
		expect(container.querySelector("a button")).toBeNull();
	});
});
