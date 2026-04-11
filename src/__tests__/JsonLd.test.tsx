import { render } from "@testing-library/react";
import { JsonLd } from "@/src/components/seo/JsonLd";

describe("JsonLd", () => {
	it("renders a script tag with type application/ld+json", () => {
		const data = { "@context": "https://schema.org", "@type": "Person" };
		const { container } = render(<JsonLd data={data} />);
		const script = container.querySelector("script");
		expect(script).toBeInTheDocument();
		expect(script?.getAttribute("type")).toBe("application/ld+json");
	});

	it("serializes the data as JSON", () => {
		const data = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "John Doe",
		};
		const { container } = render(<JsonLd data={data} />);
		const script = container.querySelector("script");
		expect(script?.innerHTML).toBe(JSON.stringify(data));
	});
});
