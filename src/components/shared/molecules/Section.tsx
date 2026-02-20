import type { ReactNode } from "react";

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
		<div className={`my-6 ${className}`.trim()}>
			<h3
				className={`text-3xl font-medium mb-3 font-medium text-center ${titleClassName}`.trim()}
			>
				{title}
			</h3>
			{children}
		</div>
	);
}
