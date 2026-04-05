import type { ReactNode } from "react";

interface PostListProps {
	children: ReactNode;
	className?: string;
	type?: "ordered" | "unordered";
}

export default function PostList({
	children,
	className = "",
	type = "ordered",
}: PostListProps) {
	const Tag = type === "ordered" ? "ol" : "ul";

	return (
		<div className={`text-base mb-5 ${className}`.trim()}>
			<Tag className="ml-6">{children}</Tag>
		</div>
	);
}
