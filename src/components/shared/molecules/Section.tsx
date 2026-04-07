import type { ReactNode } from "react";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { cn } from "@/src/lib/utils";

interface SectionProps {
	title: string | ReactNode;
	children?: ReactNode;
	className?: string;
	titleClassName?: string;
}

export const Section = ({
	title,
	children,
	className = "",
	titleClassName = "",
}: SectionProps) => {
	return (
		<div className={cn("my-6", className)}>
			<FadeIn>
				<h3
					className={cn(
						"text-3xl font-medium tracking-tight mb-3 text-center",
						titleClassName,
					)}
				>
					{title}
				</h3>
			</FadeIn>
			{children}
		</div>
	);
};
