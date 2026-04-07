"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { ImageModal } from "./ImageModal";

// Context to track if image is inside a link
const ParentLinkContext = createContext<string | undefined>(undefined);

interface MdxImageProps {
	src: string;
	alt: string;
	title?: string;
}

interface MdxLinkProps {
	href?: string;
	children?: ReactNode;
}

/**
 * Custom image component for MDX content.
 * Wraps images in a modal dialog that opens on click.
 * Uses data attribute for source URL from parent link.
 */
export const MdxImage = ({ src, alt, title }: MdxImageProps) => {
	const parentLink = useContext(ParentLinkContext);

	return (
		<ImageModal
			src={src}
			alt={alt || title || ""}
			source={parentLink}
			className="my-4"
		/>
	);
};

/**
 * Custom link component for MDX content.
 * Provides context to child images for attribution.
 * Does NOT render an anchor tag - images with links show the source as reference in modal.
 * Uses span instead of div to avoid hydration error when inside <p> tags.
 */
export const MdxLink = ({ href, children }: MdxLinkProps) => {
	// Always provide context for child images
	// Add data attribute for the href which will be picked up by images
	return (
		<ParentLinkContext.Provider value={href}>
			<span className="contents" data-image-source={href}>
				{children}
			</span>
		</ParentLinkContext.Provider>
	);
};
