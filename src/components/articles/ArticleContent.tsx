import type { ReactNode } from "react";

interface ArticleContentProps {
	children: ReactNode;
	className?: string;
}

export default function ArticleContent({
	children,
	className = "",
}: ArticleContentProps) {
	return (
		<div className={`max-w-md mx-auto mb-2 text-left ${className}`.trim()}>
			{children}
		</div>
	);
}
