"use client";

import type { ImageLoaderProps } from "next/image";

// Cloudflare Image Transformations resize and encode on the edge, picking AVIF
// or WebP from the Accept header, and cache each variant. Only same-origin
// paths can be transformed; the zone must have Transformations enabled.
export default function cloudflareImageLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	if (!src.startsWith("/")) return src;

	// No Cloudflare in front of localhost. The query string only satisfies
	// next/image's check that the loader uses width; the file is served as-is.
	if (process.env.NODE_ENV === "development") return `${src}?w=${width}`;

	const options = `width=${width},quality=${quality || 75},format=auto`;
	return `/cdn-cgi/image/${options}${encodeURI(src)}`;
}
