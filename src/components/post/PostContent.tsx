import type { ReactNode } from "react";

interface PostContentProps {
	children: ReactNode;
	className?: string;
}

export const PostContent = ({ children, className = "" }: PostContentProps) => {
	return (
		<div className={`max-w-7xl mx-auto mb-2 text-left ${className}`}>
			{children}
		</div>
	);
};
