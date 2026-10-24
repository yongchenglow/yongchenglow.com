import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { lqip } from "./lqip";

const SHORT_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

/**
 * Generate a blur data URL for image placeholder.
 * Creates a tiny 1x1 pixel SVG that is stretched and blurred with CSS.
 * Using an SVG with gradient creates a more visible blur effect.
 * @param color - Hex color (default: neutral gray)
 */
const getBlurDataURL = (color = "#888888"): string => {
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
 * The `blurDataURL` for an image: its low-quality placeholder when the map has
 * one, otherwise a generated solid-colour SVG.
 *
 * Callers must not reach for `lqip` themselves. The placeholder is a data URL,
 * not a colour, and feeding one to `getBlurDataURL` produces a `stop-color` no
 * browser can parse.
 */
export const blurDataURLFor = (src: string): string => {
	const placeholder = lqip[src];
	return placeholder ?? getBlurDataURL();
};

/**
 * Format an ISO calendar date identically on the server and client.
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};
