import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { getStaggerDelay } from "@/src/lib/animation";
import { ProjectCard, type ProjectProps } from "./ProjectCard";

interface ProjectGridProps {
	projects: ProjectProps[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
	return (
		<div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
			{projects.map((project, index) => (
				<FadeIn key={project.title} delay={getStaggerDelay(index)}>
					<ProjectCard
						title={project.title}
						description={project.description}
						buttons={project.buttons}
					/>
				</FadeIn>
			))}
		</div>
	);
};
