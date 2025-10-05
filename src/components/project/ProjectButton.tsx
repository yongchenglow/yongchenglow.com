import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import { Button } from "@/src/components/shared/ui/button";

export interface ProjectButtonProps {
	text: string;
	href: string;
}

export default function ProjectButton({ text, href }: ProjectButtonProps) {
	return (
		<Button variant="outline" asChild>
			<ExternalLink href={href} unstyled>
				{text}
			</ExternalLink>
		</Button>
	);
}
