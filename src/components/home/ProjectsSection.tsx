import ProjectGrid from "@/src/components/project/ProjectGrid";
import Section from "@/src/components/shared/molecules/Section";

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
			"This is a project written using Ruby on Rails for Le Wagon students to reference",
		buttons: [
			{ text: "Website", href: "https://airbnb-yc.herokuapp.com" },
			{
				text: "Code",
				href: "https://github.com/yongchenglow/airbnb-clone",
			},
		],
	},
];

export default function ProjectsSection() {
	return (
		<Section title="Project Highlights">
			<ProjectGrid projects={projects} />
		</Section>
	);
}
