"use client";

import Image from "next/image";
import GoogleAds from "@/src/components/atoms/GoogleAds";
import Link from "@/src/components/atoms/Link";
import { Box } from "@/src/components/ui/box";
import {
	Paper,
	StyledTableCell,
	StyledTableRow,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@/src/components/ui/table";
import { Typography } from "@/src/components/ui/typography";
import { useTheme } from "@/src/hooks/useTheme";
import StandardLayout from "@/src/layouts/StandardLayout";

type Scrum = {
	name: string;
	duration: string;
	frequency: string;
	attendance: string;
};
const scrumEvents: Scrum[] = [
	{
		name: "Sprint Planning",
		duration: "2 hours per week",
		frequency: "Once per sprint",
		attendance: "All",
	},
	{
		name: "Daily Scrum",
		duration: "15 mins per day",
		frequency: "Daily",
		attendance: "Development Team",
	},
	{
		name: "Sprint Review",
		duration: "1 hour per week",
		frequency: "Once per sprint",
		attendance: "All",
	},
	{
		name: "Sprint Retrospective",
		duration: "45 mins per week",
		frequency: "Once per sprint",
		attendance: "All",
	},
];

export default function BlogPost2Page() {
	const theme = useTheme();
	return (
		<StandardLayout>
			<Box py={3}>
				<Typography variant="h3" textAlign="center" marginBottom={1}>
					Join the Scrum
				</Typography>
				<Typography
					variant="h6"
					color="textSecondary"
					textAlign="center"
					marginBottom={4}
				>
					How do development teams work?
				</Typography>
				<Box maxWidth="sm" mx="auto" mb={4}>
					<Image
						style={{ width: "100%", height: "auto" }}
						src="/img/team-ga2cffa5b1_1920.jpg"
						alt="children coding"
						width={1920}
						height={1280}
						priority={false}
					/>
				</Box>
				<Box maxWidth="md" mx="auto">
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						When a development team starts to build a web application, what do
						you think is the first thing they do? Do they start by writing code?
						Don’t think so? Then how do you think a typical development team
						work? What rituals should a team follow so that they can deliver a
						high-quality piece of software at record breaking time.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						Most development teams work using some kind of{" "}
						<Link
							href="https://www.wrike.com/project-management-guide/faq/what-is-agile-methodology-in-project-management/"
							target="_blank"
						>
							Agile methodology
						</Link>{" "}
						. One of the most common framework in the industry that adopts this
						is{" "}
						<Link
							href="https://www.scrum.org/resources/what-is-scrum"
							target="_blank"
						>
							Scrum
						</Link>{" "}
						. By adhering to the Scrum framework, the team delivers software in
						an incremental manner. This gives stakeholders the flexibility to
						review the increment periodically and make adjustments if necessary.
					</Typography>
					<Box my={3}>
						<Typography
							fontSize={theme.typography.h6.fontSize}
							textAlign="center"
							marginBottom={2}
							sx={{ fontStyle: "italic" }}
						>
							An <b>increment</b> is a working, production ready piece of
							software.
						</Typography>
					</Box>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						Now, before we go on any further, I would first like to manage your
						expectations. What I am about to describe to you is my own
						interpretation and what I find works best for the teams that I have
						worked for. By no means you should quote me or tell your employers
						this should be the way things are done. Instead, you should be using
						this article to understand the different concepts and how they work.
						It is also important to understand that each team works a bit
						differently. Hence, they should adjust the Scrum framework to
						utilize the strength of all of their team members.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
						To find out exactly how Scrum works, you can read the{" "}
						<Link href="https://scrumguides.org" target="_blank">
							scrum guide
						</Link>{" "}
						for detailed information. But let me give you a brief overview, in
						my own definition, for a basic understanding.
					</Typography>
					<Typography
						variant="h4"
						fontWeight={500}
						textAlign="center"
						marginBottom={2}
					>
						What is Scrum?
					</Typography>
					<Box maxWidth="sm" mx="auto" mb={4}>
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/what-is-scrum-team.png"
							alt="scrum team"
							width={800}
							height={450}
							priority={false}
						/>
					</Box>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						A scrum team consist of a maximum of 10 people containing:
						<ul>
							<li>1 Product Owner</li>
							<li>1 Scrum Master</li>
							<li>The Development Team</li>
						</ul>
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						The <b>Product Owner</b> owns the product backlog or a to do list
						and makes executive product decisions based on the client and the
						business needs.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						The <b>Scrum master</b> is responsible to facilitate, advocate and
						coach the teams to ensure that the scrum teams are adhering to the
						scrum rules and are working at the stable velocity.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						The <b>Development Team</b> a self-organized team, consisting of
						many cross-functional members responsible for the development of the
						product. It is important to note that the development team does not
						only contain software engineers, but whoever is needed to complete
						the task at hand. Although this means that members can easily come
						and go, it is important to consider the loss in working velocity
						when onboarding a new member, or when losing someone with
						experience.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						Some of the more common roles that you may see in a Development Team
						includes:
						<ul>
							<li>Project Manager</li>
							<li>Designers</li>
							<li>UI/UX Researcher</li>
							<li>Backend Engineer</li>
							<li>Frontend Engineer</li>
							<li>Security Engineer</li>
							<li>Devops Engineer</li>
							<li>Quality Assurance Engineer</li>
							<li>Hardware Engineer</li>
							<li>Data Scientist</li>
							<li>Business Analyst</li>
							<li>Database Admin</li>
							<li>Tech Lead</li>
							<li>Tech Anchor</li>
							<li>Architect</li>
						</ul>
						Each team member has a slightly different role and don&apos;t be
						surprised if a person has to take up multiple roles. It is also
						important to understand that a team does not need to consist of all
						the roles mentioned above. If you want to find out more about some
						of the roles above and the skills needed, I recommend you visit{" "}
						<Link href="https://roadmap.sh/" target="_blank">
							roadmap
						</Link>
						. Take note that the site is still under development by the open
						source community but definitely a great site to explore.
					</Typography>
					<GoogleAds slotId="9628849176" />
					<Typography
						variant="h4"
						fontWeight={500}
						textAlign="center"
						marginTop={7}
						marginBottom={2}
					>
						Scaling Up
					</Typography>
					<Box maxWidth="sm" mx="auto" mb={4}>
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/scrum-of-scrums-01.png.webp"
							alt="scrum of scrums"
							width={800}
							height={600}
							priority={false}
						/>
					</Box>
					<Box fontSize={theme.typography.h6.fontSize} marginBottom={5}>
						Now you may be wondering, wait a minute if a scrum team can have
						only 10 people, how come tech companies are so big? The answer is{" "}
						<b>Scaled up Scrum</b>. A Product Owner and a Scrum Master can be
						running one or multiple Scrum teams. Using the{" "}
						<Link href="https://www.airbnb.com.sg" target="_blank">
							Airbnb
						</Link>{" "}
						products of hosting, experience and online experience as an example,
						it is possible that they are running scaled up Scrum with each scrum
						team working on a certain product:
						<ol>
							<li>Traveler</li>
							<li>Host</li>
							<li>Experience customers</li>
							<li>Experience teachers</li>
							<li>Online experience customer</li>
							<li>Online experience host</li>
							<li>Online experience livestream service</li>
						</ol>
					</Box>
					<Box fontSize={theme.typography.h6.fontSize} marginBottom={7}>
						As Airbnb grow even further, they may split the teams mentioned
						above into smaller teams and have a product owner to manage each
						service. The following is an example of the services that the
						Traveler Product may offer that each Scrum team may work on:
						<ol>
							<li>Payment Gateway</li>
							<li>Booking</li>
							<li>Search</li>
							<li>Automations e.g. reminders and emails</li>
							<li>Authentication</li>
						</ol>
					</Box>
					<Typography
						variant="h4"
						fontWeight={500}
						textAlign="center"
						marginTop={5}
						marginBottom={2}
					>
						Scrum Rituals
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						A Scrum team will produce a working increment over a course of 1-4
						weeks known as a Sprint. The sprint length is usually kept
						consistent in order to cultivate a habit and a routine product
						release. The following are the different kinds of Sprint rituals
						that a team will typically have:
					</Typography>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }}>
							<TableHead>
								<TableRow>
									<StyledTableCell align="center">Event</StyledTableCell>
									<StyledTableCell align="center">Max Duration</StyledTableCell>
									<StyledTableCell align="center">Frequency</StyledTableCell>
									<StyledTableCell align="center">
										Compulsory Attendees
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{scrumEvents.map((event) => (
									<StyledTableRow key={event.name}>
										<StyledTableCell component="th" scope="row" align="center">
											{event.name}
										</StyledTableCell>
										<StyledTableCell align="center">
											{event.duration}
										</StyledTableCell>
										<StyledTableCell align="center">
											{event.frequency}
										</StyledTableCell>
										<StyledTableCell align="center">
											{event.attendance}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={5}>
						*E.g. A 4 week sprint should have a maximum of 2x4=8 hours of Sprint
						Planning
					</Typography>
					<Typography
						fontSize={theme.typography.h6.fontSize}
						marginTop={5}
						marginBottom={3}
					>
						<b>Sprint Planning</b> is the preparation work done before we can
						start the sprint. The team will re-prioritize the Product Backlog
						and select items to be placed in the Sprint Goal that they commit to
						completed by the end of the sprint. This is also where the
						development team draw out a detailed plan on how to achieve the
						sprint goal.
					</Typography>
					<Box fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						The <b>Daily Scrum</b> is a meeting to monitor the progress of work
						and identify any blockers. Each person has to answer 3 questions
						during the meeting:
						<ol>
							<li>What did you do yesterday?</li>
							<li>What will you be doing today?</li>
							<li>Are there any impediments in the way?</li>
						</ol>
					</Box>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						<b>Sprint Review</b> is the where the increment created from the
						sprint is showcased to the stakeholders. Stakeholders can inspect
						the work and raise questions or concerns or raise adjustments.
					</Typography>
					<Box fontSize={theme.typography.h6.fontSize} marginBottom={6}>
						<b>Sprint Retrospective</b> is a meeting that allows the team to
						reflect on how they work over the past sprint. The 3 questions that
						the team have to answer are:
						<ol>
							<li>What went well?</li>
							<li>What didn’t go so well?</li>
							<li>
								What can we do differently to improve our working velocity in
								the next sprint?
							</li>
						</ol>
					</Box>
					<GoogleAds slotId="5500217699" />
					<Typography
						variant="h4"
						fontWeight={500}
						textAlign="center"
						marginBottom={2}
					>
						Additional Rituals
					</Typography>
					<Box maxWidth="sm" mx="auto" mb={4}>
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/bonus-gf0956773a_1280.png"
							alt="scrum of scrums"
							width={1280}
							height={850}
							priority={false}
						/>
					</Box>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						There are some companies that add additional rituals to ensure that
						the team can work at a stable velocity. These include:
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						<b>Mid Sprint Review</b> is usually done at the middle of the
						sprint. This is to check if there are any risk of not being able to
						meet the sprint goal. If there are any, make the necessary
						adjustments.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						A <b>Tech Bounce</b> may be needed if the development team is not
						full of technical engineers. This session is basically taken out of
						the Sprint Planning time to align on the technical specifications
						such as the database design, Api request and response, frontend and
						backend validations etc. This ensures that the tech team is all on
						the same page so that frontend and backend can be built
						concurrently. Those that are not involved in the Tech Bounce will be
						doing their own version of Tech bounce, e.g. Designers, UX
						researchers will align on the Discovery Task and Hypothesis, QA may
						be planning out on what they need to do to strengthen the automation
						testing.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
						<b>Tech Spike</b> may be done before the tech bounce to ensure the
						design of the tech for the current or next sprint is efficient and
						scalable. Some examples include database designs, optimizations to
						the web application, vulnerability research etc.
					</Typography>
					<Typography
						variant="h4"
						fontWeight={500}
						textAlign="center"
						marginBottom={2}
					>
						Conclusion
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						From my personal experience, I find the scrum rituals to be much
						more effective when working remotely. This is because at a remote
						workplace, everyone is usually working at their own pace, therefore
						the rituals serves as a common timing for us to check in on each
						other. In a physical workplace, especially if your team sits in the
						same room and constantly talks to each other, rituals such as the
						Daily Scrum may become ineffective.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						It is also important to note that although Scrum is one of the most
						popular ways of delivering a piece of software, there are other
						agile frameworks that a company may use. Some companies also
						don&apos;t adopt the agile workflow and prefer to work more towards{" "}
						<Link
							href="https://www.workfront.com/project-management/methodologies/waterfall"
							target="_blank"
						>
							the waterfall method
						</Link>
						.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={3}>
						So if your company decides how you work, how will this article help
						you? In my opinion, if you are given a take home assignment, joining
						a hackathon, or starting a new side project, the scrum framework is
						something that you should modify off to delivery software. How do
						you apply scrum in your projects? Well, unfortunately you will have
						to read the next few articles to find out.
					</Typography>
					<Typography fontSize={theme.typography.h6.fontSize} marginBottom={7}>
						In conclusion, I have scraped the surface of what is Scrum, what the
						teams are made up of and the different rituals that a team will
						follow. The next few articles will be focused around Sprint
						Planning. These will include user stories, database design and
						wireframes before we move on to the actual coding stuff. For those
						of you who are die hard coders, I ask for you all to bear with me a
						little while longer. It is important to understand that{" "}
						<strong>
							the industry is moving away from focusing on the speed of
							delivery, and focusing more on the quality of the delivery
						</strong>
						. From your coding bootcamp or university education you should be
						able to see that creating a web application is easy, but the
						question is,{" "}
						<strong>
							how do we write code that is clean, efficient and scalable
						</strong>
						? That is something you have to stay around to find out.
					</Typography>
					<GoogleAds slotId="4376522496" />
					<Box textAlign="center" my={5}>
						{" "}
						<Typography
							color="textSecondary"
							textAlign="center"
							marginBottom={3}
						>
							Next Article: It&apos;s Story Time coming on 21/02/2022
						</Typography>
					</Box>
					<Typography
						fontSize={theme.typography.caption.fontSize}
						color="textSecondary"
						textAlign="right"
						marginBottom={3}
					>
						Last Updated: 14/02/2022
					</Typography>
				</Box>
			</Box>
		</StandardLayout>
	);
}
