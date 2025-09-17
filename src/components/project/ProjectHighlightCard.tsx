import { Button } from "@/src/components/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/shared/ui/card";

export interface ProjectHighlightProps {
	title: string;
	description: string;
	buttons: Array<{
		text: string;
		href: string;
	}>;
}

export default function ProjectHighlightCard({
	title,
	description,
	buttons,
}: ProjectHighlightProps) {
	return (
		<Card className="max-w-96 overflow-hidden">
			<CardContent>
				<h3 className="text-xl font-semibold mb-4">{title}</h3>
				<p className="text-muted-foreground leading-relaxed">{description}</p>
			</CardContent>
			<CardFooter
				className={`justify-center ${buttons.length > 1 ? "space-x-3" : ""}`}
			>
				{buttons.map((button) => (
					<Button key={button.href} variant="outline" asChild>
						<a href={button.href} target="_blank" rel="noopener noreferrer">
							{button.text}
						</a>
					</Button>
				))}
			</CardFooter>
		</Card>
	);
}
