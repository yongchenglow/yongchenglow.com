import type { ReactNode } from "react";

interface ArticleGridProps {
	children: ReactNode;
}

export default function ArticleGrid({ children }: ArticleGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
			{children}
		</div>
	);
}
