import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxImage, MdxLink } from "@/src/components/blog/MdxImage";
import { useMDXComponents } from "@/src/components/mdx/MDXComponents";
import { getAllBlogPosts } from "@/src/lib/blog";
import { vi } from "../../bun-test-utils";

// biome-ignore lint/correctness/useHookAtTopLevel: MDX names this pure component-map factory like a hook.
const components = useMDXComponents({
	img: MdxImage,
	a: MdxLink,
});

const renderMdx = async (source: string) => {
	const content = await MDXRemote({ source, components });
	return render(content);
};

describe("MDXComponents", () => {
	it("keeps inline code inside its paragraph", async () => {
		const { container } = await renderMdx("Use `numeric(5,2)` for the price.");

		expect(container.querySelector("p > code")?.textContent).toBe(
			"numeric(5,2)",
		);
	});

	it("renders fenced code outside paragraphs", async () => {
		const { container } = await renderMdx(
			"```sql\nSELECT * FROM products;\n```",
		);
		const pre = container.querySelector("pre");

		expect(pre?.textContent).toBe("SELECT * FROM products;");
		expect(pre?.closest("p")).toBeNull();
	});

	it("renders every blog post without invalid HTML nesting", async () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);
		let diagnostics = "";

		try {
			for (const post of getAllBlogPosts(true)) {
				const view = await renderMdx(post.content);
				view.unmount();
			}

			diagnostics = consoleError.mock.calls.flat().join("\n");
		} finally {
			consoleError.mockRestore();
		}

		expect(diagnostics).not.toContain("cannot be a descendant of");
	});
});
