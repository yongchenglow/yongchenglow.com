import homeData from "@/content/home.json";
import { ProjectGrid } from "@/src/components/project/ProjectGrid";
import { Section } from "@/src/components/shared/molecules/Section";

export const ProjectsSection = () => {
	const { projects } = homeData;

	return (
		<Section title={projects.title}>
			<ProjectGrid projects={projects.items} />
		</Section>
	);
};
