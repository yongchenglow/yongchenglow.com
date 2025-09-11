import { Card, CardContent, CardFooter } from "@/src/components/ui/card";

interface ProjectHighlightProps {
	title: string;
	description: string;
	buttons: Array<{
		text: string;
		href: string;
	}>;
}

function ProjectHighlightCard({
	title,
	description,
	buttons,
}: ProjectHighlightProps) {
	return (
		<Card sx={{ maxWidth: 384 }} className="overflow-hidden">
			<CardContent>
				<h3 className="text-xl font-semibold mb-4">{title}</h3>
				<p className="text-muted-foreground leading-relaxed">{description}</p>
			</CardContent>
			<CardFooter
				sx={{ justifyContent: "center" }}
				className={buttons.length > 1 ? "space-x-3" : ""}
			>
				{buttons.map((button) => (
					<a
						key={button.href}
						href={button.href}
						target="_blank"
						rel="noopener noreferrer"
						className="no-underline"
					>
						<span className="bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer inline-block">
							{button.text}
						</span>
					</a>
				))}
			</CardFooter>
		</Card>
	);
}

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
