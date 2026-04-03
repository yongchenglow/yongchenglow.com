import type { ReactNode } from "react";

interface PostParagraphProps {
	children: ReactNode;
	className?: string;
}

export default function PostParagraph({
	children,
	className = "",
}: PostParagraphProps) {
	return <p className={`mb-3 ${className}`.trim()}>{children}</p>;
}
