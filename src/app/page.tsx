"use client";

import AboutMeSection from "@/src/components/home/AboutMeSection";
import IntroSection from "@/src/components/home/IntroSection";
import LatestArticlesSection from "@/src/components/home/LatestArticlesSection";
import ProjectHighlights from "@/src/components/project/ProjectHighlights";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

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
