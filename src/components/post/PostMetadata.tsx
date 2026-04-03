interface PostMetadataProps {
	children: React.ReactNode;
	className?: string;
}

export default function PostMetadata({
	children,
	className = "",
}: PostMetadataProps) {
	return (
		<div
			className={`text-xs text-muted-foreground text-right mb-3 ${className}`.trim()}
		>
			{children}
		</div>
	);
}
