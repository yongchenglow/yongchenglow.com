"use client";

import Image from "next/image";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import BlogHeader from "@/src/components/article/ArticleHeader";
import ArticleImageContainer from "@/src/components/article/ArticleImageContainer";
import ArticleParagraph from "@/src/components/article/ArticleParagraph";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";

export default function BlogPost1Page() {
	return (
		<StandardLayout>
			<ArticleContainer>
				<BlogHeader
					title="Journey to the Web"
					subtitle="The beginnings of a Software Engineer"
				/>
				<ArticleImageContainer>
					<Image
						style={{ width: "100%", height: "auto" }}
						src="/img/children-gb3ec399d2_1280.jpg"
						alt="children coding"
						width={1280}
						height={853}
						priority={false}
					/>
				</ArticleImageContainer>
				<ArticleContainer>
					<ArticleParagraph className="mb-7">
						So, you have just finished your coding bootcamp, got your degree or
						built your very own web application and you think you're ready to
						conquer the software engineering world. You go over to{" "}
						<ExternalLink href="https://glints.com" target="_blank">
							Glints
						</ExternalLink>
						, apply for a software engineering job and demand a 5k starting
						salary.
					</ArticleParagraph>
					<ArticleParagraph>How Naive.</ArticleParagraph>
					<ArticleParagraph>
						Don&apos;t worry, I was once like you! Having been in the industry
						for close to 3 years and helped close to 60 people get their first
						job in web development, I feel that it&apos;s a good time for me to
						share my experience to aspiring developers.
					</ArticleParagraph>
					<ArticleParagraph>
						Don&apos;t get me wrong, your coding skills is important! However,
						your soft skills and how you present yourself during interviews is
						equally important. I have seen students who know their stuff inside
						out but they are just not good at selling themselves.
					</ArticleParagraph>
					<ArticleParagraph className="mb-7">
						This series will be a guide, on how you can prepare for your first
						software engineering role. It will help you understand what hiring
						managers are looking for and how you can prepare for it.
					</ArticleParagraph>
					<ArticleParagraph>
						Having been through the job hunting process myself, being involved
						in the hiring process with my company and teaching programming to
						aspiring developers, I will give you my perspective from 3 different
						angles.
					</ArticleParagraph>
					<ArticleParagraph className="mb-7">
						Don&apos;t worry, we will go through this journey step by step.
						However before I start my web series, let me introduce myself so
						that you can understand who am I and what makes me qualified to give
						this type of advice.
					</ArticleParagraph>
					<ArticleParagraph>
						My name is Yong Cheng, you can call me Low as well if you find that
						easier to pronounce. I have been writing code for about 5 years and
						working as a software engineer for 3 years. I am currently a
						Software Engineer at{" "}
						<ExternalLink href="https://glints.com/sg" target="_blank">
							Glints
						</ExternalLink>
						. The reason why I started writing code is because of the amazing
						lecturers from{" "}
						<ExternalLink
							href="https://www.lewagon.com/singapore"
							target="_blank"
						>
							Le Wagon Singapore
						</ExternalLink>
						. Their courses and knowledge shared during my Part Time Web
						Development Course really inspired me to make a career change from
						Hardware to Software!
					</ArticleParagraph>
					<ArticleParagraph>
						Over the next few days, I will be sharing web development articles
						on the following topics over the next few weeks:
					</ArticleParagraph>
					<div className="text-lg">
						<ol>
							<li>Join the Scrum</li>
							<li>It&apos;s Story Time</li>
							<li>Single source of truth</li>
						</ol>
					</div>
					<ArticleParagraph className="mb-5">
						If you are my hard core fan, you can check out the following{" "}
						<ExternalLink
							href="https://github.com/yongchenglow/airbnb-clone"
							target="_blank"
						>
							AirBnB repository
						</ExternalLink>{" "}
						and{" "}
						<ExternalLink
							href="https://github.com/yongchenglow/goal-setting-app"
							target="_blank"
						>
							Goal Setting repository
						</ExternalLink>{" "}
						that I will be using as examples. These are by far a finished
						products. I will enhance it as and when the content asks for it.
						Pardon me as I have a full time job and a part time teaching job.
						Unfortunately, this is it for now. Hope to see you join the Scrum!
					</ArticleParagraph>
					<GoogleAds slotId="8262074410" />
					<div className="text-center my-5">
						<InternalLink href="/blog/2" style={{ textDecoration: "none" }}>
							<Button
								size="sm"
								variant="default"
								style={{ textTransform: "none" }}
							>
								Next Article: Join the Scrum
							</Button>
						</InternalLink>
					</div>
				</ArticleContainer>
			</ArticleContainer>
		</StandardLayout>
	);
}
