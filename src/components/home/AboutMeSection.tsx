import Image from "next/image";
import homeData from "@/content/home.json";
import { ExternalLink } from "@/src/components/shared/atoms/ExternalLink";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Section } from "@/src/components/shared/molecules/Section";

export const AboutMeSection = () => {
	const { about } = homeData;

	return (
		<Section
			title={about.title}
			className="mt-12"
			titleClassName="text-4xl font-bold text-foreground"
		>
			<div className="flex justify-center">
				<div className="grid grid-cols-1 sm:grid-cols-12 gap-4 max-w-4xl my-3 items-center">
					<div className="sm:col-span-5 col-span-1 flex justify-center mb-12 sm:mb-0">
						<FadeIn delay={0.1}>
							<Image
								alt={about.image.alt}
								src={about.image.src}
								width={about.image.width}
								height={about.image.height}
								className="w-full h-auto rounded-2xl shadow-md max-w-sm"
							/>
						</FadeIn>
					</div>
					<div className="sm:col-span-7 col-span-1 flex items-center">
						<div className="text-left mx-8">
							{about.paragraphs.map((paragraph) => (
								<FadeIn key={paragraph.slice(0, 30)} delay={0.1}>
									<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
										{renderParagraphContent(paragraph, about)}
									</p>
								</FadeIn>
							))}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

type LinkToken =
	| { type: "text"; id: string; value: string }
	| { type: "external"; id: string; label: string; url: string }
	| { type: "internal"; id: string; label: string; href: string };

const tokenizeParagraph = (
	paragraph: string,
	about: (typeof homeData)["about"],
): LinkToken[] => {
	const allLinks: LinkToken[] = [
		...about.externalLinks.map((l) => ({
			type: "external" as const,
			id: l.label,
			label: l.label,
			url: l.url,
		})),
		...about.internalLinks.map((l) => ({
			type: "internal" as const,
			id: l.label,
			label: l.label,
			href: l.href,
		})),
	];

	let tokens: LinkToken[] = [{ type: "text", id: "text-0", value: paragraph }];
	let counter = 1;

	for (const link of allLinks) {
		// Skip text tokens - only process external/internal links
		if (link.type === "text") continue;

		const next: LinkToken[] = [];
		for (const token of tokens) {
			if (token.type !== "text" || !token.value.includes(link.label)) {
				next.push(token);
				continue;
			}
			const parts = token.value.split(link.label);
			for (let i = 0; i < parts.length; i++) {
				if (parts[i])
					next.push({
						type: "text",
						id: `text-${counter++}`,
						value: parts[i],
					});
				if (i < parts.length - 1) {
					const linkToken = { ...link, id: `${link.id}-${counter++}` };
					next.push(linkToken);
				}
			}
		}
		tokens = next;
	}

	return tokens;
};

const renderParagraphContent = (
	paragraph: string,
	about: (typeof homeData)["about"],
) => {
	const tokens = tokenizeParagraph(paragraph, about);

	if (tokens.length === 1 && tokens[0].type === "text") {
		return paragraph;
	}

	return (
		<>
			{tokens.map((token) => {
				if (token.type === "external") {
					return (
						<ExternalLink key={token.id} href={token.url}>
							{token.label}
						</ExternalLink>
					);
				}
				if (token.type === "internal") {
					return (
						<InternalLink key={token.id} href={token.href}>
							{token.label}
						</InternalLink>
					);
				}
				return token.value;
			})}
		</>
	);
};
