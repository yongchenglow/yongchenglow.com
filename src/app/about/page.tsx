"use client";

import Image from "next/image";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import ArticleContent from "@/src/components/article/ArticleContent";
import ArticleParagraph from "@/src/components/article/ArticleParagraph";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

export default function AboutPage() {
	return (
		<StandardLayout>
			<ArticleContainer>
				<PageTitle>About Me</PageTitle>
				<ArticleContent>
					<Image
						alt="Low Yong Cheng"
						src="/img/yong-cheng-metasprint.jpeg"
						width={350}
						height={350}
						className="float-left mr-4 mb-4 rounded-lg"
						style={{
							width: "350px",
							height: "350px",
						}}
					/>
					<ArticleParagraph>
						Hi! My name is Yong Cheng, you can call me Yong, Low, YC as well if
						that is easier for you. If you want to find out more about my
						professional career such as my education or job experiences, please
						visit my{" "}
						<ExternalLink
							href="https://www.linkedin.com/in/yong-cheng-low/"
							target="_blank"
						>
							LinkedIn
						</ExternalLink>{" "}
						page. However, if you are here to find out more about me, you have
						come to the right place.
					</ArticleParagraph>
					<ArticleParagraph>
						I grew up with a very unique childhood as I studied in different
						international schools in Suzhou, Shanghai and Hong Kong. This gave
						me the opportunity to interact with different students and teachers
						from all around the world.
					</ArticleParagraph>
					<ArticleParagraph>
						My earliest influence of education is in Singapore,{" "}
						<ExternalLink
							href="https://mayflowerpri.moe.edu.sg"
							target="_blank"
						>
							Mayflower Primary School
						</ExternalLink>
						. Every student who have studied in the school was drilled with the
						motto, &ldquo;Service before Self&rdquo;. This lead me to believe
						that the priority of others should always be placed above yourself.
					</ArticleParagraph>
					<ArticleParagraph>
						Halfway through Primary 3, my family moved to Shanghai and I studied
						at{" "}
						<ExternalLink href="https://www.scis-china.org" target="_blank">
							Shanghai Community International School
						</ExternalLink>{" "}
						and{" "}
						<ExternalLink
							href="https://shanghai-pudong.dulwich.org"
							target="_blank"
						>
							Dulwich College Shanghai
						</ExternalLink>
						. I really enjoyed my time there playing Badminton and Basketball. I
						especially the cross border tournaments such as{" "}
						<ExternalLink href="https://www.acamis.org" target="_blank">
							ACAMIS
						</ExternalLink>{" "}
						where we get to travel to other cities to compete. One thing that
						really stuck with me was Dulwich&apos;s motto &ldquo;Detur Pons
						Mundo&rdquo; which meant &ldquo;building bridges to the
						world&rdquo;. It taught me how vast the world is, and the importance
						of understanding, learning and making friends with the International
						Community. Studying in a multi-cultural school really taught me
						about embracing and accepting other people&apos;s cultures.
					</ArticleParagraph>
					<ArticleParagraph>
						2010 was one of the highest and lowest point in my life. Although I
						did well in my{" "}
						<ExternalLink
							href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/"
							target="_blank"
						>
							IGCSE&apos;s
						</ExternalLink>
						, I had to change schools due to my parent&apos;s job. I applied to
						various high schools and set for their entrance exam in Shanghai. To
						my surprise, I failed all of them, some even told me that from their
						assessment, I won&apos;t be able to go to University. I was lucky
						enough that my parent&apos;s decide to change companies and relocate
						to Hong Kong. There, I was accepted into{" "}
						<ExternalLink href="https://shatincollege.edu.hk" target="_blank">
							Sha Tin College
						</ExternalLink>{" "}
						who gave me the opportunity to take the{" "}
						<ExternalLink
							href="https://www.ibo.org/programmes/diploma-programme/"
							target="_blank"
						>
							IB diploma programme
						</ExternalLink>{" "}
						.
					</ArticleParagraph>

					<GoogleAds slotId="9784761849" />

					<ArticleParagraph>
						After taking IB, I had to do what every Singaporean son does which
						is to return back to Singapore and serve my country. Because my
						family was still overseas, I had to return to Singapore alone and
						that was the start of my Independence. I really thank those who
						helped me survive my pre-university journey, and the SAF for
						allowing me to stay in Pulau Tekong for my entire BMT. I was one of
						the &ldquo;lucky&rdquo; ones to be post to{" "}
						<ExternalLink
							href="https://www.mindef.gov.sg/web/portal/army/our-forces/formations/formations-detail/guards/guards"
							target="_blank"
						>
							Guards unit
						</ExternalLink>{" "}
						which taught me the concept of being Always Ready, Ready to Strike.
						The hardship and experience that I learned through National Service
						made me tougher and I would like to thank the SAF for giving me that
						unique exposure.
					</ArticleParagraph>
					<ArticleParagraph>
						After my National Service, I was lucky enough to prove my haters
						wrong and secure a spot at{" "}
						<ExternalLink href="https://ceg.nus.edu.sg" target="_blank">
							NUS to major in Computer Engineering
						</ExternalLink>{" "}
						. I chose to study it because of my pre-SAF internship at{" "}
						<ExternalLink href="https://www.cmrfe.com" target="_blank">
							CMR Far East
						</ExternalLink>{" "}
						where I used VBA to try to generate a material list base on the
						switchboard specifications. I spent most of my University life
						taking up leadership roles in{" "}
						<ExternalLink href="https://nuscomputing.com" target="_blank">
							NUS Students&apos; Computing Club
						</ExternalLink>{" "}
						and{" "}
						<ExternalLink href="https://www.nussportsclub.org" target="_blank">
							NUS Students&apos; Sports Club
						</ExternalLink>{" "}
						. I would have to admit that my time there did cost some of my
						grades, but it really taught me the perspective to working together
						in an organization. Till this day I have never regretted my decision
						of joining the club and met tons pf amazing people there. Looking
						back, I am still awestruck by what we have achieved together with
						the limited resources provided.
					</ArticleParagraph>
					<ArticleParagraph>
						After University, I started out my career in{" "}
						<ExternalLink href="https://www.ncs.co/en-sg/" target="_blank">
							NCS
						</ExternalLink>{" "}
						which built my foundation in web development. However, after 1.5
						years, I decided that the corporate life isn&apos;t really for me. I
						decided to make a switch to join{" "}
						<ExternalLink href="https://glints.com/sg" target="_blank">
							Glints
						</ExternalLink>{" "}
						, a young Human Resource company which focuses on employee growth,
						and have a strong company culture and values.
					</ArticleParagraph>
					<ArticleParagraph>
						Apart from my day job, also I wanted to do something different. I
						was lucky enough to be given the opportunity to teach part time at a
						Coding Bootcamp call{" "}
						<ExternalLink
							href="https://www.lewagon.com/singapore"
							target="_blank"
						>
							Le Wagon
						</ExternalLink>{" "}
						. We teach full stack development using Ruby on Rails and focus on
						helping people transition or learn more about web development. As
						you can see, I am quite a busy person, hence I apologies if you
						write to me and I am slow in my replies.
					</ArticleParagraph>
					<ArticleParagraph>
						In order to document my web development journey, my learnings and
						explorations, I have decided to create and deploy my own website. I
						hope you will enjoy and learn from my content. Feel free to reach
						out to me and share your opinions! Thank you for reading till the
						end! Hope you have a great day ahead!
					</ArticleParagraph>
				</ArticleContent>
			</ArticleContainer>
			<GoogleAds slotId="7158598508" />
		</StandardLayout>
	);
}
