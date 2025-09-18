interface ArticleMetadataProps {
	children: React.ReactNode;
	className?: string;
}

export default function ArticleMetadata({
	children,
	className = "",
}: ArticleMetadataProps) {
	return (
		<div
			className={`text-xs text-muted-foreground text-right mb-3 ${className}`.trim()}
		>
			{children}
		</div>
	);
}
