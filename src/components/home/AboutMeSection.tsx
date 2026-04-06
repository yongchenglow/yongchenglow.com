import Image from "next/image";
import homeData from "@/content/home.json";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import FadeIn from "@/src/components/shared/atoms/FadeIn";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import Section from "@/src/components/shared/molecules/Section";

export default function AboutMeSection() {
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
}

function renderParagraphContent(
	paragraph: string,
	about: (typeof homeData)["about"],
) {
	// Check if this paragraph contains external links
	for (const link of about.externalLinks) {
		if (paragraph.includes(link.label)) {
			const parts = paragraph.split(link.label);
			return (
				<>
					{parts[0]}
					<ExternalLink href={link.url}>{link.label}</ExternalLink>
					{parts[1]}
				</>
			);
		}
	}

	// Check if this paragraph contains internal links
	for (const link of about.internalLinks) {
		if (paragraph.includes(link.label)) {
			const parts = paragraph.split(link.label);
			return (
				<>
					{parts[0]}
					<InternalLink href={link.href}>{link.label}</InternalLink>
					{parts[1]}
				</>
			);
		}
	}

	return paragraph;
}
