import type { Metadata } from "next";
import aboutData from "@/content/about.json";
import { Timeline } from "@/src/components/about/Timeline";
import TimelineItemRenderer from "@/src/components/about/TimelineItemRenderer";
import { PostContainer } from "@/src/components/post/PostContainer";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { ExternalLink } from "@/src/components/shared/atoms/ExternalLink";
import { GitHubIcon } from "@/src/components/shared/atoms/GitHubIcon";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import { LinkedInIcon } from "@/src/components/shared/atoms/LinkedInIcon";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/shared/ui/avatar";
import { AD_SLOTS, SITE_AUTHOR, SITE_URL } from "@/src/config/site";
import type { AboutData } from "@/src/content/schema";

export const metadata: Metadata = {
	title: "About",
	alternates: {
		canonical: "/about",
	},
};

// Type assertion - validated at runtime by tests
const about = aboutData as AboutData;

export const AboutPage = () => {
	return (
		<StandardLayout>
			<PostContainer>
				{/* Hero */}
				<div className="flex flex-col items-center text-center mb-10">
					<Avatar className="h-28 w-28 mb-4">
						<AvatarImage src={SITE_AUTHOR.image} alt={SITE_AUTHOR.name} />
						<AvatarFallback>YC</AvatarFallback>
					</Avatar>
					<PageTitle>About Me</PageTitle>
					<h2 className="text-xl font-semibold mt-2">{about.hero.name}</h2>
					<p className="text-muted-foreground max-w-xl mt-1">
						{about.hero.title}
					</p>
					<p className="text-sm text-muted-foreground max-w-lg mt-3 italic">
						&quot;{about.hero.objective}&quot;
					</p>
					<div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
						{about.hero.links.map((link) => (
							<div key={link.label} className="flex items-center gap-2">
								<ExternalLink href={link.url} aria-label={link.label}>
									{link.label === "LinkedIn" ? (
										<>
											<LinkedInIcon size={16} />
											<span>LinkedIn</span>
										</>
									) : link.label === "GitHub" ? (
										<>
											<GitHubIcon size={16} />
											<span>GitHub</span>
										</>
									) : (
										link.label
									)}
								</ExternalLink>
							</div>
						))}
					</div>
				</div>

				{/* Timeline */}
				<Timeline>
					{about.timeline.map((item) => (
						<TimelineItemRenderer key={item.title} item={item} />
					))}
				</Timeline>

				<GoogleAds slotId={AD_SLOTS.about} />
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "Person",
						name: about.hero.name,
						url: SITE_URL,
						jobTitle: about.hero.title,
						image: `${SITE_URL}${SITE_AUTHOR.image}`,
						sameAs: about.hero.links.map((link) => link.url),
					}}
				/>
			</PostContainer>
		</StandardLayout>
	);
};

export default AboutPage;
