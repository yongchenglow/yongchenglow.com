import Image from "next/image";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";

export default function IntroSection() {
	return (
		<div className="flex justify-center py-16 sm:py-24">
			<div className="grid grid-cols-1 sm:grid-cols-12 gap-8 max-w-4xl items-center">
				{/* Text first on desktop */}
				<div className="sm:col-span-7 col-span-1 flex items-center order-2 sm:order-1">
					<div className="text-center sm:text-left">
						<p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-widest">
							Hello, I&apos;m
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
							Yong Cheng Low
						</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Senior Software Engineer at{" "}
							<ExternalLink href="https://glints.com">Glints</ExternalLink>,
							part-time teacher at{" "}
							<ExternalLink href="https://www.lewagon.com/singapore">
								Le Wagon
							</ExternalLink>{" "}
							and a Sports Enthusiast.
						</p>
						<div className="flex gap-3 justify-center sm:justify-start flex-wrap">
							<InternalLink href="/blog">
								<Button size="lg">Read My Blog</Button>
							</InternalLink>
							<InternalLink href="/about">
								<Button variant="outline" size="lg">
									About Me
								</Button>
							</InternalLink>
						</div>
					</div>
				</div>

				{/* Image second on mobile, right on desktop */}
				<div className="sm:col-span-5 col-span-1 flex justify-center order-1 sm:order-2">
					<Image
						alt="Low Yong Cheng"
						src="/img/yong-cheng-badminton.jpg"
						width={400}
						height={400}
						className="w-full h-auto rounded-2xl shadow-md max-w-sm"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
