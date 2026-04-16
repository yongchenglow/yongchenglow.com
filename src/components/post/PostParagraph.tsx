import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PostParagraphProps {
	children: ReactNode;
	className?: string;
}

export const PostParagraph = ({
	children,
	className = "",
}: PostParagraphProps) => {
	return <p className={cn("mb-3 ", className)}>{children}</p>;
};
