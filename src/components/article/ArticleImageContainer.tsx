import type { ReactNode } from "react";

interface ArticleImageContainerProps {
	children: ReactNode;
	className?: string;
	size?: "small" | "medium" | "large";
}

export default function ArticleImageContainer({
	children,
	className = "",
	size = "medium",
}: ArticleImageContainerProps) {
	const sizeClasses = {
		small: "max-w-sm",
		medium: "max-w-md",
		large: "max-w-lg",
	};

	return (
		<div className={`${sizeClasses[size]} mx-auto mb-4 ${className}`.trim()}>
			{children}
		</div>
	);
}
