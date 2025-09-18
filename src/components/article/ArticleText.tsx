interface ArticleTextProps {
	children: React.ReactNode;
	className?: string;
	marginBottom?: number;
}

export default function ArticleText({
	children,
	className = "",
	marginBottom = 3,
}: ArticleTextProps) {
	const mbClass = `mb-${marginBottom}`;
	return (
		<div className={`text-base ${mbClass} ${className}`.trim()}>{children}</div>
	);
}
