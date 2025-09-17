import type { ReactNode } from "react";

interface ArticleTitleProps {
	children: ReactNode;
	className?: string;
}

export default function ArticleTitle({
	children,
	className = "",
}: ArticleTitleProps) {
	return (
		<div className={`mb-3 ${className}`.trim()}>
			<h1 className="text-2xl font-bold">{children}</h1>
		</div>
	);
}
