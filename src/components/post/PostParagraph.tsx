import type { ReactNode } from "react";

interface PostParagraphProps {
	children: ReactNode;
	className?: string;
}

export const PostParagraph = ({
	children,
	className = "",
}: PostParagraphProps) => {
	return <p className={`mb-3 ${className}`.trim()}>{children}</p>;
};
