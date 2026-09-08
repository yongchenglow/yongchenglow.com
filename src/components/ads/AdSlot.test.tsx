import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { act, render, screen, waitFor } from "@testing-library/react";
import type { ScriptProps } from "next/script";
import { AdSlot } from "@/src/components/ads/AdSlot";

mock.module("next/script", () => ({
	default: ({ src, strategy }: ScriptProps) => (
		<script data-testid="ad-script" data-src={src} data-strategy={strategy} />
	),
}));

const originalClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

describe("AdSlot", () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID = "ca-pub-test";
		window.adsbygoogle = [];
	});

	afterEach(() => {
		if (originalClientId) {
			process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID = originalClientId;
		} else {
			delete process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
		}
	});

	it("renders nothing when AdSense is not configured", () => {
		delete process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

		const { container } = render(<AdSlot placement="article-end" />);

		expect(container).toBeEmptyDOMElement();
	});

	it("renders a disclosed responsive homepage placement", () => {
		const { container } = render(<AdSlot placement="home-after-projects" />);

		expect(
			screen.getByRole("complementary", { name: "Advertisement" }),
		).toBeInTheDocument();
		expect(screen.getByText("Advertisement")).toBeVisible();

		const adElement = container.querySelector("ins");
		expect(adElement).toHaveAttribute("data-ad-format", "auto");
		expect(adElement).toHaveAttribute("data-full-width-responsive", "true");
		expect(adElement).toHaveAttribute("data-ad-slot", "5500217699");
		expect(screen.getByTestId("ad-script")).toHaveAttribute(
			"data-strategy",
			"lazyOnload",
		);
	});

	it("uses the controlled in-article format at the article seam", () => {
		const { container } = render(<AdSlot placement="article-end" />);
		const adElement = container.querySelector("ins");

		expect(adElement).toHaveAttribute("data-ad-layout", "in-article");
		expect(adElement).toHaveAttribute("data-ad-format", "fluid");
		expect(adElement).not.toHaveAttribute("data-full-width-responsive");
	});

	it("collapses an unfilled placement", async () => {
		const { container } = render(<AdSlot placement="blog-index" />);
		const adElement = container.querySelector("ins");

		act(() => adElement?.setAttribute("data-ad-status", "unfilled"));

		await waitFor(() => {
			expect(
				screen.getByRole("complementary", {
					name: "Advertisement",
					hidden: true,
				}),
			).toHaveAttribute("data-ad-state", "unavailable");
		});
	});
});
