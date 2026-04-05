import { Briefcase, GraduationCap, Shield } from "lucide-react";
import Timeline from "@/src/components/about/Timeline";
import TimelineItem from "@/src/components/about/TimelineItem";
import PostContainer from "@/src/components/post/PostContainer";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/shared/ui/avatar";
import aboutData from "@/src/data/about.json";

export default function AboutPage() {
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
					<h2 className="text-xl font-semibold mt-2">{aboutData.hero.name}</h2>
					<p className="text-muted-foreground max-w-xl mt-1">
						{aboutData.hero.title}
					</p>
					<p className="text-sm text-muted-foreground max-w-lg mt-3 italic">
						&quot;{aboutData.hero.objective}&quot;
					</p>
					<div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
						{aboutData.hero.links.map((link) => (
							<div key={link.label} className="flex items-center gap-2">
								<ExternalLink href={link.url}>{link.label}</ExternalLink>
							</div>
						))}
					</div>
				</div>

				{/* Timeline */}
				<Timeline>
					{/* Work Experience */}
					{aboutData.work_experience.map((job) => (
						<TimelineItem
							key={job.title}
							title={job.title}
							icon={<Briefcase className="h-4 w-4" />}
							category="work"
							years={job.years}
							location={job.location}
						>
							<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
								{job.bullets.map((bullet) => (
									<li key={bullet} className="leading-relaxed">
										{bullet}
									</li>
								))}
							</ul>
							<p className="mt-3 text-xs font-medium text-muted-foreground">
								<strong>Skills:</strong> {job.skills.join(", ")}
							</p>
						</TimelineItem>
					))}

					{/* Education */}
					{aboutData.education.map((edu) => (
						<TimelineItem
							key={edu.title}
							title={edu.title}
							icon={<GraduationCap className="h-4 w-4" />}
							category="school"
							years={edu.years}
							location={edu.location}
						>
							{edu.link ? (
								<>
									{edu.description.split(edu.link.label)[0]}
									<ExternalLink href={edu.link.url}>
										{edu.link.label}
									</ExternalLink>
									{edu.description.split(edu.link.label)[1]}
								</>
							) : edu.links ? (
								<>
									{edu.description.split(edu.links[0].label)[0]}
									<ExternalLink href={edu.links[0].url}>
										{edu.links[0].label}
									</ExternalLink>
									{
										edu.description
											.split(edu.links[0].label)[1]
											.split(edu.links[1].label)[0]
									}
									<ExternalLink href={edu.links[1].url}>
										{edu.links[1].label}
									</ExternalLink>
									{edu.description.split(edu.links[1].label)[1]}
								</>
							) : (
								<p>{edu.description}</p>
							)}
						</TimelineItem>
					))}

					{/* Military Service */}
					<TimelineItem
						title={aboutData.military_service.title}
						icon={<Shield className="h-4 w-4" />}
						category="military"
						years={aboutData.military_service.years}
						location={aboutData.military_service.location}
					>
						{aboutData.military_service.description.split("Guards unit")[0]}
						<ExternalLink href={aboutData.military_service.link.url}>
							Guards unit
						</ExternalLink>
						{aboutData.military_service.description.split("Guards unit")[1]}
					</TimelineItem>
				</Timeline>

				<GoogleAds slotId="7158598508" />
			</PostContainer>
		</StandardLayout>
	);
}
