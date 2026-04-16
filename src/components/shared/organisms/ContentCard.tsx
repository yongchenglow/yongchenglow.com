import type { ReactNode } from "react";
import { Card, CardContent, CardFooter } from "@/src/components/shared/ui/card";
import { cn } from "@/src/lib/utils";

interface ContentCardProps {
	title: string;
	description: string;
	footer: ReactNode;
	className?: string;
}

export const ContentCard = ({
	title,
	description,
	footer,
	className = "",
}: ContentCardProps) => {
	return (
		<Card
			className={cn(
				"group overflow-hidden pt-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300",
				className,
			)}
		>
			<CardContent>
				<h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
				<p className="text-muted-foreground text-center">{description}</p>
			</CardContent>
			<CardFooter className="flex justify-center gap-3">
				<div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
					{footer}
				</div>
			</CardFooter>
		</Card>
	);
};
