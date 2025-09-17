import type { ReactNode } from "react";

interface ArticleParagraphProps {
	children: ReactNode;
	className?: string;
}

export default function ArticleParagraph({
	children,
	className = "",
}: ArticleParagraphProps) {
	return <p className={`mb-3 ${className}`.trim()}>{children}</p>;
}
