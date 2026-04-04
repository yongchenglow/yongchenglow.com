import type { ReactNode } from "react";

interface PostGridProps {
	children: ReactNode;
}

export default function PostGrid({ children }: PostGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">{children}</div>
	);
}
