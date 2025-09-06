import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "@/src/pages";

describe("Index", () => {
	it("renders correctly", () => {
		const { container } = render(<Index />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
