"use client";

import { Briefcase, GraduationCap, Shield } from "lucide-react";
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
					{/* Work Experience */}
					<TimelineItem
						title="Data & Software Engineer at National University Hospital"
						icon={<Briefcase className="h-4 w-4" />}
						category="work"
						years="2025–Present"
						location="Singapore"
					>
						Developing proof of concepts including Speech to Speech agents for
						PROMS collection using AWS Nova 2 Sonic and GPT Realtime. Working on
						cluster-level projects including automatic speech recognition and
						medical coding to improve workforce efficiency.
					</TimelineItem>

					<TimelineItem
						title="Senior Software Engineer at Glints"
						icon={<Briefcase className="h-4 w-4" />}
						category="work"
						years="2023–2025"
						location="Singapore"
					>
						Designed and implemented an automated multilingual resume parsing
						workflow using OpenAI APIs, achieving over 90% accuracy. Developed a
						multilingual job role inference system with 90%+ accuracy. Set up
						dashboards and alerting systems, reducing MTTR to within 2 hours.
					</TimelineItem>

					<TimelineItem
						title="Web Software Engineer at Glints"
						icon={<Briefcase className="h-4 w-4" />}
						category="work"
						years="2021–2023"
						location="Singapore"
					>
						Collaborated with Product and Design teams to deliver a
						recruiter-centric product. Achieved median CES of 8/10. Maintained
						search engine with boolean search features, enabling 30% of monthly
						matches.
					</TimelineItem>

					<TimelineItem
						title="Web Development Teacher at Le Wagon"
						icon={<Briefcase className="h-4 w-4" />}
						category="work"
						years="2021–2025"
						location="Singapore"
					>
						Delivering an immersive web development course equipping over 100
						beginners and career switchers with junior software developer
						skills. Guided students in building 25+ applications with an NPS
						score of 82.7.
					</TimelineItem>

					<TimelineItem
						title="Software Engineer at NCS (IOT Defence)"
						icon={<Briefcase className="h-4 w-4" />}
						category="work"
						years="2020–2021"
						location="Singapore"
					>
						Implemented a secure API Gateway for IoT using Java Spring Boot.
						Collaborated on a Screen Lock Mobile Application with 3FA security
						through Yubikey, Password, and Lockscreen Pattern.
					</TimelineItem>

					{/* Military Service */}
					<TimelineItem
						title="National Service — Guards Unit"
						icon={<Shield className="h-4 w-4" />}
						category="military"
						years="2012–2014"
						location="Singapore"
					>
						Returned to Singapore alone for National Service. Posted to the{" "}
						<ExternalLink href="https://www.mindef.gov.sg/web/portal/army/our-forces/formations/formations-detail/guards/guards">
							Guards unit
						</ExternalLink>
						, which taught me resilience and the spirit of Always Ready, Ready
						to Strike.
					</TimelineItem>

					{/* Education */}
					<TimelineItem
						title="NUS Computer Engineering (Bachelor with Honours)"
						icon={<GraduationCap className="h-4 w-4" />}
						category="school"
						years="2014–2018"
						location="Singapore"
					>
						Proved my doubters wrong by securing a place at{" "}
						<ExternalLink href="https://ceg.nus.edu.sg">
							NUS Computer Engineering
						</ExternalLink>
						. Graduated with Merit. Concentration in Interactive Digital Media,
						Minor in Interactive Media Development.
					</TimelineItem>

					<TimelineItem
						title="Sha Tin College — IB Diploma"
						icon={<GraduationCap className="h-4 w-4" />}
						category="school"
						years="2010–2012"
						location="Hong Kong"
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
						title="Dulwich College Shanghai — IGCSE"
						icon={<GraduationCap className="h-4 w-4" />}
						category="school"
						years="2007–2010"
						location="Shanghai, China"
					>
						Continued my secondary education at{" "}
						<ExternalLink href="https://shanghai-pudong.dulwich.org">
							Dulwich College Shanghai
						</ExternalLink>
						. Competed in ACAMIS sports tournaments and embraced multi-cultural
						learning.
					</TimelineItem>

					<TimelineItem
						title="Shanghai Community International School"
						icon={<GraduationCap className="h-4 w-4" />}
						category="school"
						years="2004–2007"
						location="Shanghai, China"
					>
						Moved to Shanghai and studied at{" "}
						<ExternalLink href="https://www.scis-china.org">
							Shanghai Community International School
						</ExternalLink>
						. Embraced multi-cultural learning in an international environment.
					</TimelineItem>

					<TimelineItem
						title="Mayflower Primary School"
						icon={<GraduationCap className="h-4 w-4" />}
						category="school"
						years="2002–2004"
						location="Singapore"
					>
						My earliest education in Singapore instilled the motto
						&ldquo;Service before Self&rdquo;, shaping my belief that
						others&apos; priorities come first.
					</TimelineItem>
				</Timeline>

				<GoogleAds slotId="7158598508" />
			</ArticleContainer>
		</StandardLayout>
	);
}
