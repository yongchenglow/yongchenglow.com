"use client";

import GoogleAds from "@/src/components/atoms/googleAds";
import { Avatar } from "@/src/components/ui/avatar";
import { Box } from "@/src/components/ui/box";
import { Link } from "@/src/components/ui/link";
import { Typography } from "@/src/components/ui/typography";
import StandardLayout from "@/src/layouts/StandardLayout";

export default function AboutPage() {
	return (
		<StandardLayout>
			<Box py={3} textAlign="center">
				<Box mb={3}>
					<Typography variant="h4">About Me</Typography>
				</Box>
				<Box maxWidth="md" mx="auto" mb={2} textAlign="left">
					<Avatar
						alt="Low Yong Cheng"
						src="/img/yong-cheng-metasprint.jpeg"
						sx={{
							width: 300,
							height: 300,
							margin: "0 16px 16px 0",
						}}
						style={{
							float: "left",
							borderRadius: "8px",
						}}
					/>
					<Typography paragraph marginBottom={3}>
						Hi! My name is Yong Cheng, you can call me Yong, Low, YC as well if
						that is easier for you. If you want to find out more about my
						professional career such as my education or job experiences, please
						visit my{" "}
						<Link
							href="https://www.linkedin.com/in/yong-cheng-low/"
							target="_blank"
							underline="none"
						>
							LinkedIn
						</Link>{" "}
						page. However, if you are here to find out more about me, you have
						come to the right place.
					</Typography>
					<Typography paragraph marginBottom={3}>
						I grew up with a very unique childhood as I studied in different
						international schools in Suzhou, Shanghai and Hong Kong. This gave
						me the opportunity to interact with different students and teachers
						from all around the world.
					</Typography>
					<Typography paragraph marginBottom={3}>
						My earliest influence of education is in Singapore,{" "}
						<Link
							href="https://mayflowerpri.moe.edu.sg"
							target="_blank"
							underline="none"
						>
							Mayflower Primary School
						</Link>
						. Every student who have studied in the school was drilled with the
						motto, &ldquo;Service before Self&rdquo;. This lead me to believe
						that the priority of others should always be placed above yourself.
					</Typography>
					<Typography marginBottom={3}>
						Halfway through Primary 3, my family moved to Shanghai and I studied
						at{" "}
						<Link
							href="https://www.scis-china.org"
							target="_blank"
							underline="none"
						>
							Shanghai Community International School
						</Link>
						and{" "}
						<Link
							href="https://shanghai-pudong.dulwich.org"
							target="_blank"
							underline="none"
						>
							Dulwich College Shanghai
						</Link>
						. I really enjoyed my time there playing Badminton and Basketball. I
						especially the cross border tournaments such as{" "}
						<Link
							href="https://www.acamis.org"
							target="_blank"
							underline="none"
						>
							ACAMIS
						</Link>{" "}
						where we get to travel to other cities to compete. One thing that
						really stuck with me was Dulwich&apos;s motto &ldquo;Detur Pons
						Mundo&rdquo; which meant &ldquo;building bridges to the
						world&rdquo;. It taught me how vast the world is, and the importance
						of understanding, learning and making friends with the International
						Community. Studying in a multi-cultural school really taught me
						about embracing and accepting other people&apos;s cultures.
					</Typography>
					<Typography marginBottom={3}>
						2010 was one of the highest and lowest point in my life. Although I
						did well in my{" "}
						<Link
							href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/"
							target="_blank"
							underline="none"
						>
							IGCSE&apos;s
						</Link>
						, I had to change schools due to my parent&apos;s job. I applied to
						various high schools and set for their entrance exam in Shanghai. To
						my surprise, I failed all of them, some even told me that from their
						assessment, I won&apos;t be able to go to University. I was lucky
						enough that my parent&apos;s decide to change companies and relocate
						to Hong Kong. There, I was accepted into{" "}
						<Link
							href="https://shatincollege.edu.hk"
							target="_blank"
							underline="none"
						>
							Sha Tin College
						</Link>{" "}
						who gave me the opportunity to take the{" "}
						<Link
							href="https://www.ibo.org/programmes/diploma-programme/"
							target="_blank"
							underline="none"
						>
							IB diploma programme
						</Link>{" "}
						.
					</Typography>

					<GoogleAds slotId="9784761849" />

					<Typography marginBottom={3}>
						After taking IB, I had to do what every Singaporean son does which
						is to return back to Singapore and serve my country. Because my
						family was still overseas, I had to return to Singapore alone and
						that was the start of my Independence. I really thank those who
						helped me survive my pre-university journey, and the SAF for
						allowing me to stay in Pulau Tekong for my entire BMT. I was one of
						the &ldquo;lucky&rdquo; ones to be post to{" "}
						<Link
							href="https://www.mindef.gov.sg/web/portal/army/our-forces/formations/formations-detail/guards/guards"
							target="_blank"
							underline="none"
						>
							Guards unit
						</Link>{" "}
						which taught me the concept of being Always Ready, Ready to Strike.
						The hardship and experience that I learned through National Service
						made me tougher and I would like to thank the SAF for giving me that
						unique exposure.
					</Typography>
					<Typography marginBottom={3}>
						After my National Service, I was lucky enough to prove my haters
						wrong and secure a spot at{" "}
						<Link
							href="https://ceg.nus.edu.sg"
							target="_blank"
							underline="none"
						>
							NUS to major in Computer Engineering
						</Link>{" "}
						. I chose to study it because of my pre-SAF internship at{" "}
						<Link href="https://www.cmrfe.com" target="_blank" underline="none">
							CMR Far East
						</Link>{" "}
						where I used VBA to try to generate a material list base on the
						switchboard specifications. I spent most of my University life
						taking up leadership roles in{" "}
						<Link
							href="https://nuscomputing.com"
							target="_blank"
							underline="none"
						>
							NUS Students&apos; Computing Club
						</Link>{" "}
						and{" "}
						<Link
							href="https://www.nussportsclub.org"
							target="_blank"
							underline="none"
						>
							NUS Students&apos; Sports Club
						</Link>{" "}
						. I would have to admit that my time there did cost some of my
						grades, but it really taught me the perspective to working together
						in an organization. Till this day I have never regretted my decision
						of joining the club and met tons pf amazing people there. Looking
						back, I am still awestruck by what we have achieved together with
						the limited resources provided.
					</Typography>
					<Typography marginBottom={3}>
						After University, I started out my career in{" "}
						<Link
							href="https://www.ncs.co/en-sg/"
							target="_blank"
							underline="none"
						>
							NCS
						</Link>{" "}
						which built my foundation in web development. However, after 1.5
						years, I decided that the corporate life isn&apos;t really for me. I
						decided to make a switch to join{" "}
						<Link href="https://glints.com/sg" target="_blank" underline="none">
							Glints
						</Link>{" "}
						, a young Human Resource company which focuses on employee growth,
						and have a strong company culture and values.
					</Typography>
					<Typography marginBottom={3}>
						Apart from my day job, also I wanted to do something different. I
						was lucky enough to be given the opportunity to teach part time at a
						Coding Bootcamp call{" "}
						<Link
							href="https://www.lewagon.com/singapore"
							target="_blank"
							underline="none"
						>
							Le Wagon
						</Link>{" "}
						. We teach full stack development using Ruby on Rails and focus on
						helping people transition or learn more about web development. As
						you can see, I am quite a busy person, hence I apologies if you
						write to me and I am slow in my replies.
					</Typography>
					<Typography marginBottom={3}>
						In order to document my web development journey, my learnings and
						explorations, I have decided to create and deploy my own website. I
						hope you will enjoy and learn from my content. Feel free to reach
						out to me and share your opinions! Thank you for reading till the
						end! Hope you have a great day ahead!
					</Typography>
				</Box>
			</Box>
			<GoogleAds slotId="7158598508" />
		</StandardLayout>
	);
}
