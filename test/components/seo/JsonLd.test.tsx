import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/src/components/seo/JsonLd";

describe("JsonLd", () => {
	it("renders a script tag with type application/ld+json", () => {
		const data = { "@context": "https://schema.org", "@type": "Person" };
		const { container } = render(<JsonLd data={data} />);
		const script = container.querySelector("script");
		expect(script).toBeInTheDocument();
		expect(script?.getAttribute("type")).toBe("application/ld+json");
	});

	it("serializes the data as valid parseable JSON", () => {
		const data = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "John Doe",
		};
		const { container } = render(<JsonLd data={data} />);
		const script = container.querySelector("script");
		expect(JSON.parse(script?.innerHTML ?? "{}")).toEqual(data);
	});

	it("escapes </script> sequences to prevent script tag injection", () => {
		const data = {
			"@context": "https://schema.org",
			"@type": "Article",
			headline: "XSS via </script><script>alert(1)</script>",
		};
		const { container } = render(<JsonLd data={data} />);
		const script = container.querySelector("script");
		expect(script?.innerHTML).not.toContain("</script>");
		// The JSON must still be valid and parseable
		expect(JSON.parse(script?.innerHTML ?? "{}")).toMatchObject({
			"@type": "Article",
		});
	});
});
