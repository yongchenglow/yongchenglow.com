import type { ReactNode } from "react";

interface ArticleContainerProps {
	children: ReactNode;
	className?: string;
}

export default function ArticleContainer({
	children,
	className = "",
}: ArticleContainerProps) {
	return (
		<div
			className={`py-3 px-4 mx-auto max-w-prose md:max-w-3xl lg:max-w-4xl text-left w-full ${className}`.trim()}
		>
			{children}
		</div>
	);
}
