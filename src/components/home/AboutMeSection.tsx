"use client";

import Image from "next/image";
import homeData from "@/content/home.json";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { Section } from "@/src/components/shared/molecules/Section";
import { tokenizeWithLinks } from "@/src/lib/text";
import { getImagePlaceholder } from "@/src/lib/utils";

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
							<div className="relative">
								<Image
									alt={about.image.alt}
									src={about.image.src}
									width={about.image.width}
									height={about.image.height}
									className="w-full h-auto rounded-2xl shadow-md max-w-sm image-loading"
									placeholder="blur"
									blurDataURL={getImagePlaceholder(about.image.src)}
									quality={85}
									sizes="(max-width: 640px) 100vw, 384px"
									loading="lazy"
								/>
							</div>
						</FadeIn>
					</div>
					<div className="sm:col-span-7 col-span-1 flex items-center">
						<div className="text-left mx-8">
							{about.paragraphs.map((paragraph) => (
								<FadeIn key={paragraph.slice(0, 30)} delay={0.1}>
									<p className="mb-8 text-muted-foreground leading-relaxed text-lg">
										{tokenizeWithLinks(paragraph, [
											...about.externalLinks,
											...about.internalLinks,
										])}
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
