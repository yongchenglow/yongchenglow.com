import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { lqip } from "./lqip";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

/**
 * Generate a blur data URL for image placeholder.
 * Creates a tiny 1x1 pixel SVG that is stretched and blurred with CSS.
 * Using an SVG with gradient creates a more visible blur effect.
 * @param color - Hex color (default: neutral gray)
 */
export const getBlurDataURL = (color = "#888888"): string => {
	// Create a slightly more complex SVG with a gradient for better blur visibility
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">
		<defs>
			<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="${color}"/>
				<stop offset="100%" stop-color="${color}"/>
			</linearGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#g)"/>
	</svg>`;
	const encoder = new TextEncoder();
	const encoded = encoder.encode(svg);
	const base64 = btoa(String.fromCharCode(...encoded));
	return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Dominant color placeholders for key images.
 * Extracted from actual images to provide smooth blur-up effect.
 */
export const imagePlaceholders = {
	// Hero image - warm beige tone
	"/img/yong-cheng-badminton.jpg": "#D4C5B9",
	// About image - cooler blue-gray
	"/img/yong-cheng-metasprint.jpeg": "#A8B8C8",
	// Blog images - extracted dominant colors
	"/img/MaxPixel.net-Internet-The-Web-Website-Design-Web-Design-4875183.jpg":
		"#2D4A3E",
	"/img/computer-g39398e915_1280.jpg": "#8B9BA8",
	"/img/design_thinking.png": "#5B7C99",
	"/img/2_4_lo-fi_prototype.jpg": "#C4B8A8",
	"/img/figure2.png": "#6B8E9C",
	"/img/epics-vs-stories-agile-development.png": "#4A6FA5",
} as const;

/**
 * Get placeholder color for an image path.
 * First checks LQIP map for actual blurred preview, falls back to solid color.
 */
export const getImagePlaceholder = (src: string): string => {
	// First check LQIP map for actual blurred preview
	const lqipData = lqip[src];
	if (lqipData) return lqipData;

	// Fall back to solid color placeholder
	return imagePlaceholders[src as keyof typeof imagePlaceholders] ?? "#888888";
};
