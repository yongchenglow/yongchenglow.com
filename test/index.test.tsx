import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "@/src/app/page";

describe("Index", () => {
	it("renders correctly", () => {
		const { container } = render(<Index />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
