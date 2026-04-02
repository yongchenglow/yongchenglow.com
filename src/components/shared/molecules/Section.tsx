import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface SectionProps {
	title: string | ReactNode;
	children?: ReactNode;
	className?: string;
	titleClassName?: string;
}

export default function Section({
	title,
	children,
	className = "",
	titleClassName = "",
}: SectionProps) {
	return (
		<div className={cn("my-6", className)}>
			<h3
				className={cn(
					"text-3xl font-medium tracking-tight mb-3 text-center",
					titleClassName,
				)}
			>
				{title}
			</h3>
			{children}
		</div>
	);
}
