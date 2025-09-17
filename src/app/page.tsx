"use client";

import AboutMeSection from "@/src/app/home/components/AboutMeSection";
import IntroSection from "@/src/app/home/components/IntroSection";
import LatestArticlesSection from "@/src/app/home/components/LatestArticlesSection";
import StandardLayout from "@/src/components/layouts/StandardLayout";
import ProjectHighlights from "@/src/components/projects/ProjectHighlightCard";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";

const projects = [
	{
		title: "NUS Students' Sports Club",
		description:
			"I developed a company website for the club. This was my first project using react.",
		buttons: [
			{ text: "Website", href: "https://www.nussportsclub.org" },
			{
				text: "Code",
				href: "https://github.com/yongchenglow/nus-students-sports-club",
			},
		],
	},
	{
		title: "My Personal Website",
		description:
			"Coded using NextJS and deployed through my own personal webserver on a RaspberryPi3.",
		buttons: [
			{
				text: "Code",
				href: "https://github.com/yongchenglow/yongchenglow.com",
			},
		],
	},
	{
		title: "AirBnB Clone",
		description:
			"This is a project done using Ruby on Rails, mainly for students in Le Wagon students to see my twist on it.",
		buttons: [
			{ text: "Website", href: "https://airbnb-yc.herokuapp.com" },
			{
				text: "Code",
				href: "https://github.com/yongchenglow/airbnb-clone",
			},
		],
	},
];

export default function HomePage() {
	return (
		<StandardLayout>
			<IntroSection />

			<LatestArticlesSection />

			<ProjectHighlights projects={projects} />

			<GoogleAds slotId="5500217699" />

			<AboutMeSection />

			<GoogleAds slotId="8155985403" />
		</StandardLayout>
	);
}
