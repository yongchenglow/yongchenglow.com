import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { act, render, screen, waitFor } from "@testing-library/react";
import { AdSlot } from "@/src/components/ads/AdSlot";

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

	it("discloses the placement to both sighted and assistive users", () => {
		render(<AdSlot placement="home-end" />);

		expect(
			screen.getByRole("complementary", { name: "Advertisement" }),
		).toBeInTheDocument();
		expect(screen.getByText(/Sponsored/)).toBeVisible();
	});

	it("renders every placement as an in-article unit", () => {
		const { container } = render(<AdSlot placement="blog-index" />);
		const adElement = container.querySelector("ins");

		expect(adElement).toHaveAttribute("data-ad-layout", "in-article");
		expect(adElement).toHaveAttribute("data-ad-format", "fluid");
		expect(adElement).not.toHaveAttribute("data-full-width-responsive");
		expect(adElement).toHaveAttribute("data-ad-slot", "9667543473");
	});

	it("gives the article seams their own slots", () => {
		const { container: mid } = render(<AdSlot placement="article-mid" />);
		expect(mid.querySelector("ins")).toHaveAttribute(
			"data-ad-slot",
			"6890117148",
		);

		const { container: end } = render(<AdSlot placement="article-end" />);
		expect(end.querySelector("ins")).toHaveAttribute(
			"data-ad-slot",
			"7964413716",
		);
	});

	it("queues the placement with adsbygoogle on mount", () => {
		render(<AdSlot placement="home-end" />);

		expect(window.adsbygoogle).toHaveLength(1);
	});

	it("queues each placement exactly once", () => {
		const { rerender } = render(<AdSlot placement="blog-index" />);
		rerender(<AdSlot placement="blog-index" />);

		expect(window.adsbygoogle).toHaveLength(1);
	});

	it("does not queue when AdSense is not configured", () => {
		delete process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

		render(<AdSlot placement="blog-index" />);

		expect(window.adsbygoogle).toHaveLength(0);
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
