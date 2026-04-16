import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PostListProps {
	children: ReactNode;
	className?: string;
	type?: "ordered" | "unordered";
}

export const PostList = ({
	children,
	className = "",
	type = "ordered",
}: PostListProps) => {
	const Tag = type === "ordered" ? "ol" : "ul";

	return (
		<div className={cn("text-base mb-5 ", className)}>
			<Tag className="ml-6">{children}</Tag>
		</div>
	);
};
