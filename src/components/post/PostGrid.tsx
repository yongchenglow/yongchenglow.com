import type { ReactNode } from "react";

interface PostGridProps {
	children: ReactNode;
}

export default function PostGrid({ children }: PostGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
			{children}
		</div>
	);
}
