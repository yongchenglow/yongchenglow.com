import ContentCard from "@/src/components/shared/organisms/ContentCard";
import ProjectButton from "./ProjectButton";

export interface ProjectProps {
	title: string;
	description: string;
	buttons: Array<{
		text: string;
		href: string;
	}>;
}

export default function ProjectCard({
	title,
	description,
	buttons,
}: ProjectProps) {
	return (
		<ContentCard
			title={title}
			description={description}
			className="w-full max-w-sm"
			footer={buttons.map((button) => (
				<ProjectButton
					key={button.href}
					text={button.text}
					href={button.href}
				/>
			))}
		/>
	);
}
