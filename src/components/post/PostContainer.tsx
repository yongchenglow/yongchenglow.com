import type { ReactNode } from "react";

interface PostContainerProps {
	children: ReactNode;
	className?: string;
}

export const PostContainer = ({
	children,
	className = "",
}: PostContainerProps) => {
	return (
		<div
			className={`py-3 px-4 mx-auto max-w-prose md:max-w-3xl lg:max-w-4xl text-left w-full ${className}`.trim()}
		>
			{children}
		</div>
	);
};
