import ProjectHighlightCard, {
	type ProjectHighlightProps,
} from "./ProjectHighlightCard";

interface ProjectHighlightsProps {
	projects: ProjectHighlightProps[];
}

export default function ProjectHighlights({
	projects,
}: ProjectHighlightsProps) {
	return (
		<div className="py-12 text-center">
			<div className="mb-8">
				<h2 className="text-4xl font-bold text-foreground">
					Project highlights
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
				{projects.map((project) => (
					<ProjectHighlightCard
						key={project.title}
						title={project.title}
						description={project.description}
						buttons={project.buttons}
					/>
				))}
			</div>
		</div>
	);
}
