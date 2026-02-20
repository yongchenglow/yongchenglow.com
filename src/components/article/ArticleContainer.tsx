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
		<div className={`py-3 text-center ${className}`.trim()}>{children}</div>
	);
}
