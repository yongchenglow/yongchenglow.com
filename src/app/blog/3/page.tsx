"use client";

import Image from "next/image";
import ArticleAnnouncement from "@/src/components/article/ArticleAnnouncement";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import ArticleContent from "@/src/components/article/ArticleContent";
import ArticleDefinition from "@/src/components/article/ArticleDefinition";
import BlogHeader from "@/src/components/article/ArticleHeader";
import ArticleImageContainer from "@/src/components/article/ArticleImageContainer";
import ArticleList from "@/src/components/article/ArticleList";
import ArticleMetadata from "@/src/components/article/ArticleMetadata";
import ArticleParagraph from "@/src/components/article/ArticleParagraph";
import ArticleText from "@/src/components/article/ArticleText";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

export default function BlogPost3Page() {
	return (
		<StandardLayout>
			<ArticleContainer>
				<BlogHeader
					title="It's Story Time"
					subtitle="Creating a Product Plan for success"
				/>
				<ArticleImageContainer>
					<Image
						style={{ width: "100%", height: "auto" }}
						src="/img/meeting-gf7ea04404_1280.jpg"
						alt="children coding"
						width={1280}
						height={853}
						priority={false}
					/>
				</ArticleImageContainer>
				<ArticleContent>
					<ArticleParagraph className="mb-3">
						You just learned about scrum and feel confident to start your Sprint
						Planning session. However, what exactly does Sprint Planning consist
						of? How do we decide what features are going to be built in the
						current sprint? What are the outcomes of a Sprint Planning session?
					</ArticleParagraph>
					<ArticleParagraph className="mb-3">
						Before I start talking about the Sprint Planning process, I would
						like us to take a step back and look at the big picture. Instead of
						focusing on one sprint, lets focus on the product that we are
						building first. This is so that we know what we are working towards
						after the completion of multiple sprints.
					</ArticleParagraph>
					<ArticleParagraph className="mb-7">
						Every product that a company build is paid for by a particular user.
						Therefore, before doing any planning, we first need to revisit who
						our users are. This is because if we start deviating from their
						needs and wants, they will eventually look for a close substitute.
					</ArticleParagraph>
					<ArticleParagraph className="mb-2">
						What are Personas?
					</ArticleParagraph>
					<ArticleImageContainer size="small">
						<ExternalLink
							href="https://www.freepik.com/vectors/infographic"
							target="_blank"
							aria-label="Persona"
						>
							<Image
								style={{ width: "100%", height: "auto" }}
								src="/img/4317364.jpg"
								alt="Infographic vector created by freepik - www.freepik.com"
								width={800}
								height={600}
								priority={false}
							/>
						</ExternalLink>
					</ArticleImageContainer>
					<ArticleDefinition>
						<ExternalLink
							href="https://www.interaction-design.org/literature/article/personas-why-and-how-you-should-use-them"
							target="_blank"
						>
							<b>Personas</b>
						</ExternalLink>{" "}
						are fictional characters that are created to represent the different
						user groups of your product.
					</ArticleDefinition>
					<ArticleParagraph className="mb-3">
						Personas help us understand the user&apos;s needs, wants and goals.
						By creating the persona, we understand who we are building the
						product for. Using a very basic Airbnb as an example, we can start
						with 2 personas, a home owner and traveler. The smaller the company
						is, the more specific the Personas are. A product is usually niche
						at the start, but as they flourish, the characteristics of the
						personas becomes broader and cover a wider audience. Some companies
						grow so big that they do not see the need for Personas.
					</ArticleParagraph>
					<ArticleParagraph className="mb-3">
						However, my personal opinion is, it is always important to revisit
						the persona to understand your core audience. This is because if you
						have been playing the game of business long enough, a close
						substitute will eventually come along. When this happens, it is
						natural that some of these users will flood to your
						competitor&apos;s product. On the other hand, if you do things right
						and meet the needs and wants of your core user group, they will
						stay.
					</ArticleParagraph>
					<ArticleParagraph className="mb-3">
						An example of this will be Instagram. Instagram targets people
						generally below the age of 35 who want to share great photos or
						story moments with a certain network. When TikTok emerged, those who
						use Instagram to create content or skits flocked over as they are
						their targeted user groups. Only by understanding this, you realize
						that Instagram and TikTok are not really true competitors as they
						target a different set of audience. However, because TikTok did not
						exist before 2016, these creators did not have a choice but to use
						Instagram.
					</ArticleParagraph>
					<ArticleParagraph className="mb-7">
						Yes, yes you may say Instagram should have identified these
						persona&apos;s earlier and perhaps adjust their product to cater for
						these users. However, we won&apos;t be debating about this, but this
						is why it is important to constantly conduct user research to
						understand the demographics of the users and what are your users
						using the product for. UI/UX researchers are usually the ones
						creating and refining the personas from time to time to ensure that
						they accurately represent the current users of your product. Only
						after understanding our users, we can then start to plan out our
						initiatives.
					</ArticleParagraph>
					<GoogleAds slotId="9333319799" />
					<ArticleParagraph className="mb-2">
						Breaking down the Initiative
					</ArticleParagraph>
					<ArticleImageContainer size="small">
						<ExternalLink
							href="https://www.atlassian.com/agile/project-management/epics-stories-themes"
							target="_blank"
							aria-label="Agile Development Breakdown"
						>
							<Image
								style={{ width: "100%", height: "auto" }}
								src="/img/epics-vs-stories-agile-development.png"
								alt="epics-vs-stories-agile-development"
								width={800}
								height={500}
								priority={false}
							/>
						</ExternalLink>
					</ArticleImageContainer>
					<ArticleParagraph className="mb-3">
						Whenever the team wants to build something special, you will need to
						draw out some kind of game plan. One of the most popular ways to
						organize your work is through initiatives, epics, stories, task,
						sub-task. This is a very user centric approach as each task
						completed will satisfy some of the user needs and wants.
					</ArticleParagraph>
					<ArticleDefinition>
						An <b>Initiative</b> is a product goal. It can be further broken
						down into multiple epics to be worked on
					</ArticleDefinition>
					<ArticleDefinition>
						An <b>Epic</b> breaks the Initiative down into smaller parts. It
						contains a collection of user stories or things that the user can do
						with your product after it is completed
					</ArticleDefinition>
					<ArticleDefinition>
						<b>Stories or User stories</b> are requirements from the perspective
						of the end users
					</ArticleDefinition>
					<ArticleDefinition>
						A <b>Task</b> is a breakdown of a story into smaller tasks.
					</ArticleDefinition>
					<ArticleDefinition>
						A <b>Sub-task</b> is a breakdown of a task
					</ArticleDefinition>
					<ArticleText>
						Some of the popular project management tools includes Jira, Click
						up, Notion, Asana and Monday. All the different products have their
						own advantages and limitations which we will not discuss. However,
						from my personal experience, it is better for a company or team
						stick to a single tool, meaning to say if one team uses Jira, the
						rest should use it too. Or else managing scaled up scrum where one
						team is using notion and another is using Jira will turn into a
						nightmare.
					</ArticleText>
					<ArticleText className="mb-7">
						Lastly, before we start any sprint planning, the team needs to
						decide and have a common understanding of the Definition of Done.
					</ArticleText>
					<ArticleParagraph className="mb-2">
						Definition of Done
					</ArticleParagraph>
					<ArticleImageContainer size="small">
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/definition-of-done-concept-with-random-parts-of-program-codedefinition-of-done-text-written-on-programming-code-abstract-technology-background-of-sof-2H2TGE8.jpg"
							alt="scrum team"
							width={1200}
							height={800}
							priority={false}
						/>
					</ArticleImageContainer>
					<ArticleDefinition>
						<b>Definition of Done</b> is the acceptance criteria to a particular
						type of user story
					</ArticleDefinition>
					<ArticleText className="mb-3">
						A huge caveat before we proceed is that according to the scrum
						guide, the definition of done should apply for every user story.
						However, from experience a Design Task has a very different
						acceptance criteria from Developer Task or a Quality Assurance(QA)
						Task. At the end of the day, the team must have a common consensus
						on the definition of done for the different kinds of task. This is
						so that when a task is marked as Done, the team all have a common
						understand what each task has gone through.
					</ArticleText>
					<ArticleList>
						An example of a Design Task may be to conduct AB testing on 2
						different designs. The definition of done of a design task may
						include:
						<ol>
							<li>
								Create 2 variations of a design of the particular page each
								following two different sets of design principles
							</li>
							<li>Conduct user research on at least 3 users</li>
							<li>
								Draw a conclusion on which design to choose base on the
								supported evidence
							</li>
						</ol>
					</ArticleList>
					<ArticleList>
						An example of a QA Task may be to investigate a particular bug
						report filed by one of our users. The definition of done of a QA
						task may include:
						<ol>
							<li>Replicate the bug on staging environment</li>
							<li>Create a Bug report</li>
							<li>Fix the Bug</li>
							<li>Write a unit test for the bug</li>
							<li>Release the bug fix to staging</li>
							<li>Test the bug fix on staging</li>
							<li>Release the bug fix to production</li>
							<li>Inform the users that the bug has been fixed</li>
						</ol>
					</ArticleList>
					<ArticleList className="mb-3">
						An example of a Developer task may be to create a login page. The
						definition of done of a developer task may include.
						<ol>
							<li>
								Create an approve wireframe for the task and for the different
								user flow
							</li>
							<li>Write the necessary unit test for frontend</li>
							<li>Write the necessary unit test for backend</li>
							<li>
								Write the necessary integration test to ensure that the feature
								work
							</li>
							<li>Pass performance testing</li>
							<li>Pass penetration testing</li>
							<li>Pass QA</li>
							<li>Pass Code Review</li>
							<li>Write the necessary documentation</li>
							<li>Release to Staging</li>
							<li>Pass QA Staging</li>
							<li>Release to Production</li>
						</ol>
					</ArticleList>
					<ArticleParagraph className="mt-7 mb-2">
						Sprint Planning
					</ArticleParagraph>
					<ArticleImageContainer size="small">
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/meeting-g10f292b56_1280.png"
							alt="sprint planning"
							width={1280}
							height={853}
							priority={false}
						/>
					</ArticleImageContainer>
					<ArticleText className="mb-3">
						Now that we have talked about the different terminologies, it&apos;s
						time talk about the Sprint Planning session itself.
					</ArticleText>
					<ArticleText className="mb-3">
						At the start of the Sprint Planning meeting, the team needs to
						decide on <b>the what</b>. The product owner pick items from the
						backlog that the team will be working on and sets the initial sprint
						goal. These items are usually picked because they are related to the
						initiative and epics of the previous sprint or because are starting
						a new one.
					</ArticleText>
					<ArticleText className="mb-3">
						The development team will then plan out <b>the how</b>, or the
						scoping and specifications needed to deliver the sprint goal. It is
						important that this process is a negotiation, if the work is too
						much, we need to adjust the what. But at the end of the day, the
						scope of work must be manageable and the team must agree that the
						items pick can meet the definition of done by the end of the sprint.
					</ArticleText>
					<ArticleText className="mb-3">
						Once the sprint goal is finalized and the scope of work is final,
						the team then decides <b>the who</b>, in other words who takes which
						task. This process is done purely by the development team.
					</ArticleText>
					<ArticleText className="mb-3">
						In most companies, the how portion is where most controversies
						arise. Don&apos;t worry if it turns into a negotiation and tensions
						may arise. Good teams will know how to use this tension to make the
						product better. This is because everybody is thinking for the
						product itself, and a simple task may become very complicated if
						done correctly to make it future proof.
					</ArticleText>
					<ArticleText className="mb-3">
						There are also companies that run the top-down approach where bosses
						just say, I don&apos;t care how, just complete this set of work
						within a given time. This is where you start to build products in
						the fastest way possible almost as if you are back in a bootcamp.
						For short lived projects or products that mean to last 1 to 2 years
						max that are only used by 100 to 1000 users you will be quite safe.
						However, for project maintenance and adjustments, it is likely that
						just by reading the code, you will want to jump off a building.
					</ArticleText>
					<ArticleText className="mb-3">
						In my opinion, the top-down approach is what is causing the great
						resignation. Because maintenance is going to be super difficult,
						during the maintenance stage, the original developers usually leave
						the company. The company then hires new people to maintain the
						product. If you go to Google and just type coding memes, you may
						laugh at first, but those are actually true stories no matter how
						fake they seem. Once the people are tired of pulling their hair out
						to solve problems they leave and the process starts all over again.
					</ArticleText>
					<ArticleText className="mb-3">
						In conclusion, we have learned a lot today about project planning.
						It might have been an information overload so you may need to read
						the article a couple of times to understand. In the next article, we
						will be focusing on &quot;the how&quot; portion of the Spring
						Planning, and why a simple task may seem more complex than it is, in
						particular, it is all because of the database.
					</ArticleText>
					<GoogleAds slotId="5443505231" />
					<ArticleAnnouncement>
						Next Article: Single Source of Truth coming on 28/02/2022
					</ArticleAnnouncement>
					<ArticleMetadata>Last Updated: 02/03/2022</ArticleMetadata>
				</ArticleContent>
			</ArticleContainer>
		</StandardLayout>
	);
}
