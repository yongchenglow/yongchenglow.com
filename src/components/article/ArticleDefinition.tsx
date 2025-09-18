interface ArticleDefinitionProps {
	children: React.ReactNode;
	className?: string;
}

export default function ArticleDefinition({
	children,
	className = "",
}: ArticleDefinitionProps) {
	return (
		<div className={`my-3 max-w-sm mx-auto ${className}`.trim()}>
			<div className="text-center mb-2 italic">{children}</div>
		</div>
	);
}
