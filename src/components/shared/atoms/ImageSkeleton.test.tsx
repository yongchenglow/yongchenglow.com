import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImageSkeleton } from "@/src/components/shared/atoms/ImageSkeleton";

/**
 * Tests for ImageSkeleton component rendering.
 * Verifies the skeleton loader applies correct styling and animation
 * to provide visual feedback during image loading.
 */
describe("ImageSkeleton", () => {
	it("should render with default landscape aspect ratio", () => {
		const { container } = render(<ImageSkeleton />);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton).toBeTruthy();
		expect(skeleton.className).toContain("aspect-[16/10]");
		expect(skeleton.className).toContain("animate-shimmer");
	});

	it("should render with square aspect ratio", () => {
		const { container } = render(<ImageSkeleton aspectRatio="square" />);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton.className).toContain("aspect-square");
	});

	it("should render with portrait aspect ratio", () => {
		const { container } = render(<ImageSkeleton aspectRatio="portrait" />);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton.className).toContain("aspect-[3/4]");
	});

	it("should render with custom aspect ratio string", () => {
		const { container } = render(<ImageSkeleton aspectRatio="aspect-[4/3]" />);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton.className).toContain("aspect-[4/3]");
	});

	it("should apply custom className", () => {
		const { container } = render(
			<ImageSkeleton className="custom-class another-class" />,
		);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton.className).toContain("custom-class");
		expect(skeleton.className).toContain("another-class");
	});

	it("should have shimmer gradient background", () => {
		const { container } = render(<ImageSkeleton />);
		const skeleton = container.firstChild as HTMLElement;

		expect(skeleton.className).toContain("from-muted");
		expect(skeleton.className).toContain("via-muted-foreground/10");
		expect(skeleton.className).toContain("to-muted");
	});
});
