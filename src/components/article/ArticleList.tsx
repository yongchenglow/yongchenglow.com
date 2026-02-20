interface ArticleListProps {
	children: React.ReactNode;
	className?: string;
	type?: "ordered" | "unordered";
}

export default function ArticleList({
	children,
	className = "",
	type = "ordered",
}: ArticleListProps) {
	const Tag = type === "ordered" ? "ol" : "ul";

	return (
		<div className={`text-base mb-5 ${className}`.trim()}>
			<Tag className="ml-6">{children}</Tag>
		</div>
	);
}
