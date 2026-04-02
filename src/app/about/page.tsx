"use client";

import {
	BookOpen,
	Briefcase,
	Code,
	Globe,
	GraduationCap,
	Shield,
} from "lucide-react";
import Timeline from "@/src/components/about/Timeline";
import TimelineItem from "@/src/components/about/TimelineItem";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/shared/ui/avatar";
import { Separator } from "@/src/components/shared/ui/separator";

export default function AboutPage() {
	return (
		<StandardLayout>
			<ArticleContainer>
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
					<p className="text-muted-foreground max-w-xl mt-2">
						Hi! I&apos;m Yong Cheng (or YC). Software engineer, part-time
						teacher, and sports enthusiast. Here&apos;s my story.
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Find my professional details on{" "}
						<ExternalLink href="https://www.linkedin.com/in/yong-cheng-low/">
							LinkedIn
						</ExternalLink>
						.
					</p>
				</div>

				<Separator className="mb-12" />

				{/* Timeline */}
				<Timeline>
					<TimelineItem
						year="Early"
						title="Mayflower Primary School"
						icon={<GraduationCap className="h-4 w-4" />}
						side="right"
					>
						My earliest education in Singapore instilled the motto
						&ldquo;Service before Self&rdquo;, shaping my belief that
						others&apos; priorities come first.
					</TimelineItem>

					<TimelineItem
						year="2004–2010"
						title="Shanghai — SCIS &amp; Dulwich"
						icon={<Globe className="h-4 w-4" />}
						side="left"
					>
						Moved to Shanghai and studied at{" "}
						<ExternalLink href="https://www.scis-china.org">
							Shanghai Community International School
						</ExternalLink>{" "}
						and{" "}
						<ExternalLink href="https://shanghai-pudong.dulwich.org">
							Dulwich College Shanghai
						</ExternalLink>
						. Competed in ACAMIS sports tournaments and embraced multi-cultural
						learning.
					</TimelineItem>

					<TimelineItem
						year="2010–2012"
						title="Hong Kong — Sha Tin College"
						icon={<GraduationCap className="h-4 w-4" />}
						side="right"
					>
						After being rejected from several high schools in Shanghai, I found
						my place at{" "}
						<ExternalLink href="https://shatincollege.edu.hk">
							Sha Tin College
						</ExternalLink>{" "}
						where I completed the{" "}
						<ExternalLink href="https://www.ibo.org/programmes/diploma-programme/">
							IB Diploma Programme
						</ExternalLink>
						.
					</TimelineItem>

					<TimelineItem
						year="2012–2014"
						title="National Service"
						icon={<Shield className="h-4 w-4" />}
						side="left"
					>
						Returned to Singapore alone for National Service. Posted to the{" "}
						<ExternalLink href="https://www.mindef.gov.sg/web/portal/army/our-forces/formations/formations-detail/guards/guards">
							Guards unit
						</ExternalLink>
						, which taught me resilience and the spirit of Always Ready, Ready
						to Strike.
					</TimelineItem>

					<TimelineItem
						year="2014–2018"
						title="NUS Computer Engineering"
						icon={<Code className="h-4 w-4" />}
						side="right"
					>
						Proved my doubters wrong by securing a place at{" "}
						<ExternalLink href="https://ceg.nus.edu.sg">
							NUS Computer Engineering
						</ExternalLink>
						. Took on leadership roles at NUS Computing Club and Sports Club
						while building my engineering foundation.
					</TimelineItem>

					<TimelineItem
						year="2018–2020"
						title="NCS — First Job"
						icon={<Briefcase className="h-4 w-4" />}
						side="left"
					>
						Started my career at{" "}
						<ExternalLink href="https://www.ncs.co/en-sg/">NCS</ExternalLink>,
						building my web development foundations over 1.5 years before
						deciding to seek a more dynamic environment.
					</TimelineItem>

					<TimelineItem
						year="2020–Present"
						title="Glints — Senior Software Engineer"
						icon={<Briefcase className="h-4 w-4" />}
						side="right"
					>
						Joined{" "}
						<ExternalLink href="https://glints.com/sg">Glints</ExternalLink>, a
						Human Resource startup with strong culture and values. Grew from
						engineer to Senior Software Engineer.
					</TimelineItem>

					<TimelineItem
						year="2021–Present"
						title="Le Wagon — Part-time Teacher"
						icon={<BookOpen className="h-4 w-4" />}
						side="left"
					>
						Teaching full-stack web development at{" "}
						<ExternalLink href="https://www.lewagon.com/singapore">
							Le Wagon Singapore
						</ExternalLink>
						. Helping students transition into software engineering careers
						using Ruby on Rails.
					</TimelineItem>
				</Timeline>

				<GoogleAds slotId="7158598508" />
			</ArticleContainer>
		</StandardLayout>
	);
}
