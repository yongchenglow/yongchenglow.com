import { createElement } from "react";
import { ExternalLink } from "@/src/components/shared/atoms/ExternalLink";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";

export interface ExternalTextLink {
	label: string;
	url: string;
}

export interface InternalTextLink {
	label: string;
	href: string;
}

type TextLink = ExternalTextLink | InternalTextLink;

/**
 * Replaces occurrences of link labels in text with appropriate link components.
 * Supports both external and internal links.
 * Returns an array of strings and JSX elements.
 */
export function tokenizeWithLinks(
	text: string,
	links: TextLink[],
): (string | JSX.Element)[] {
	let parts: (string | JSX.Element)[] = [text];
	let keyCounter = 0;

	for (const link of links) {
		const nextParts: (string | JSX.Element)[] = [];

		for (const part of parts) {
			if (typeof part !== "string") {
				nextParts.push(part);
				continue;
			}

			if (!part.includes(link.label)) {
				nextParts.push(part);
				continue;
			}

			const segments = part.split(link.label);
			for (let i = 0; i < segments.length; i++) {
				if (segments[i]) {
					nextParts.push(segments[i]);
				}

				if (i < segments.length - 1) {
					const LinkComponent = "url" in link ? ExternalLink : InternalLink;
					const linkProps =
						"url" in link
							? { href: link.url, children: link.label }
							: { href: link.href, children: link.label };

					nextParts.push(
						createElement(LinkComponent, {
							...linkProps,
							key: `link-${keyCounter++}`,
						}),
					);
				}
			}
		}

		parts = nextParts;
	}

	return parts;
}
