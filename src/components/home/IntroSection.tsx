"use client";

import Image from "next/image";
import homeData from "@/content/home.json";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";
import { tokenizeWithLinks } from "@/src/lib/text";
import { getImagePlaceholder } from "@/src/lib/utils";

export const IntroSection = () => {
	const { intro } = homeData;

	return (
		<div className="flex justify-center py-16 sm:py-24">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-8 max-w-4xl items-center">
				{/* Text first on desktop */}
				<div className="sm:col-span-7 col-span-1 flex items-center order-2 sm:order-1">
					<div className="text-center sm:text-left">
						<FadeIn delay={0}>
							<p className="text-sm text-muted-foreground mb-2 font-medium tracking-widest">
								{intro.greeting}
							</p>
						</FadeIn>
						<FadeIn delay={0.1}>
							<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
								{intro.name}
							</h1>
						</FadeIn>
						<FadeIn delay={0.2}>
							<p className="text-lg text-muted-foreground mb-8">
								{tokenizeWithLinks(intro.title, intro.companyLinks)}
							</p>
						</FadeIn>
						<FadeIn delay={0.3}>
							<div className="flex gap-3 justify-center sm:justify-start flex-wrap">
								{intro.ctaButtons.map((button) => (
									<InternalLink key={button.label} href={button.href}>
										<Button
											variant={button.variant as "default" | "outline"}
											size="lg"
										>
											{button.label}
										</Button>
									</InternalLink>
								))}
							</div>
						</FadeIn>
					</div>
				</div>

				{/* Image second on mobile, right on desktop */}
				<div className="sm:col-span-5 col-span-1 flex justify-center order-1 sm:order-2">
					<FadeIn delay={0.2}>
						<div className="relative">
							<Image
								alt={intro.image.alt}
								src={intro.image.src}
								width={intro.image.width}
								height={intro.image.height}
								className="w-full h-auto rounded-2xl shadow-md max-w-sm image-loading"
								priority
								placeholder="blur"
								blurDataURL={getImagePlaceholder(intro.image.src)}
								quality={85}
								sizes="(max-width: 640px) 100vw, 384px"
							/>
						</div>
					</FadeIn>
				</div>
			</div>
		</div>
	);
};
