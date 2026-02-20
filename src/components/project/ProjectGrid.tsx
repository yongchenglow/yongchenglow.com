import ProjectCard, { type ProjectProps } from "./ProjectCard";

interface ProjectGridProps {
	projects: ProjectProps[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
	return (
		<div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
			{projects.map((project) => (
				<div key={project.title}>
					<ProjectCard
						title={project.title}
						description={project.description}
						buttons={project.buttons}
					/>
				</div>
			))}
		</div>
	);
}
