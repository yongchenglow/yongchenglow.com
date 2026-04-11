import { Briefcase, GraduationCap, Shield } from "lucide-react";
import type { Metadata } from "next";
import aboutData from "@/content/about.json";
import { Timeline } from "@/src/components/about/Timeline";
import { TimelineItem as TimelineItemComponent } from "@/src/components/about/TimelineItem";
import { PostContainer } from "@/src/components/post/PostContainer";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { BulletList } from "@/src/components/shared/atoms/BulletList";
import { ExternalLink } from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/shared/ui/avatar";
import type { AboutData, TimelineItem } from "@/src/content/schema";

export const metadata: Metadata = {
	title: "About",
	alternates: {
		canonical: "/about",
	},
};

// Type assertion - validated at runtime by tests
const about = aboutData as AboutData;

const renderTimelineItem = (item: TimelineItem) => {
	switch (item.type) {
		case "work":
			return (
				<TimelineItemComponent
					key={item.title}
					title={item.title}
					icon={<Briefcase className="h-4 w-4" />}
					category="work"
					years={item.years}
					location={item.location}
				>
					<BulletList bullets={item.bullets} />
					<p className="mt-3 text-xs font-medium text-muted-foreground">
						<strong>Skills:</strong> {item.skills.join(", ")}
					</p>
				</TimelineItemComponent>
			);
		case "education":
			return (
				<TimelineItemComponent
					key={item.title}
					title={item.title}
					icon={<GraduationCap className="h-4 w-4" />}
					category="school"
					years={item.years}
					location={item.location}
				>
					{item.link ? (
						<>
							{item.description.split(item.link.label)[0]}
							<ExternalLink href={item.link.url}>
								{item.link.label}
							</ExternalLink>
							{item.description.split(item.link.label)[1]}
						</>
					) : item.links ? (
						<>
							{item.description.split(item.links[0].label)[0]}
							<ExternalLink href={item.links[0].url}>
								{item.links[0].label}
							</ExternalLink>
							{
								item.description
									.split(item.links[0].label)[1]
									.split(item.links[1].label)[0]
							}
							<ExternalLink href={item.links[1].url}>
								{item.links[1].label}
							</ExternalLink>
							{item.description.split(item.links[1].label)[1]}
						</>
					) : (
						<p>{item.description}</p>
					)}
					<BulletList bullets={item.bullets} className="mt-2" />
				</TimelineItemComponent>
			);
		case "military":
			return (
				<TimelineItemComponent
					key={item.title}
					title={item.title}
					icon={<Shield className="h-4 w-4" />}
					category="military"
					years={item.years}
					location={item.location}
				>
					{item.description.split("Guards unit")[0]}
					<ExternalLink href={item.link.url}>Guards unit</ExternalLink>
					{item.description.split("Guards unit")[1]}
					<BulletList bullets={item.bullets} className="mt-2" />
				</TimelineItemComponent>
			);
	}
};

export const AboutPage = () => {
	return (
		<StandardLayout>
			<PostContainer>
				{/* Hero */}
				<div className="flex flex-col items-center text-center mb-10">
					<Avatar className="h-28 w-28 mb-4">
						<AvatarImage
							src="/img/yong-cheng-metasprint.jpeg"
							alt="Yong Cheng Low"
						/>
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
								<ExternalLink href={link.url}>{link.label}</ExternalLink>
							</div>
						))}
					</div>
				</div>

				{/* Timeline */}
				<Timeline>{about.timeline.map(renderTimelineItem)}</Timeline>

				<GoogleAds slotId="7158598508" />
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "Person",
						name: about.hero.name,
						url: "https://www.yongchenglow.com",
						jobTitle: about.hero.title,
						image:
							"https://www.yongchenglow.com/img/yong-cheng-metasprint.jpeg",
						sameAs: about.hero.links.map((link) => link.url),
					}}
				/>
			</PostContainer>
		</StandardLayout>
	);
};

export default AboutPage;
