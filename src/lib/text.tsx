import type { ReactElement } from "react";
import { ExternalLink } from "@/src/components/shared/atoms/ExternalLink";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";

interface ExternalTextLink {
	label: string;
	url: string;
}

interface InternalTextLink {
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
): (string | ReactElement)[] {
	let parts: (string | ReactElement)[] = [text];
	let keyCounter = 0;

	for (const link of links) {
		const nextParts: (string | ReactElement)[] = [];

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
					const key = `link-${keyCounter++}`;
					if ("url" in link) {
						nextParts.push(
							<ExternalLink href={link.url} key={key}>
								{link.label}
							</ExternalLink>,
						);
					} else {
						nextParts.push(
							<InternalLink href={link.href} key={key}>
								{link.label}
							</InternalLink>,
						);
					}
				}
			}
		}

		parts = nextParts;
	}

	return parts;
}
