import { describe, expect, it, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

mock.module("@/src/components/shared/organisms/Navigationbar", () => ({
	default: () => <nav data-testid="navigation-bar">NavBar</nav>,
}));

mock.module("@/src/components/shared/organisms/Footer", () => ({
	default: () => <footer data-testid="footer">Footer</footer>,
}));

mock.module("@/src/components/shared/atoms/Container", () => ({
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="container">{children}</div>
	),
}));

describe("StandardLayout", () => {
	it("renders NavigationBar", () => {
		render(<StandardLayout>content</StandardLayout>);
		expect(screen.getByTestId("navigation-bar")).toBeInTheDocument();
	});

	it("renders Footer", () => {
		render(<StandardLayout>content</StandardLayout>);
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("renders children inside the layout", () => {
		render(
			<StandardLayout>
				<span data-testid="child">hello</span>
			</StandardLayout>,
		);
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
