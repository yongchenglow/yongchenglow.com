interface ArticleSubtitleProps {
	children: React.ReactNode;
	className?: string;
}

export default function ArticleSubtitle({
	children,
	className = "",
}: ArticleSubtitleProps) {
	return (
		<div className={`text-gray-600 text-center mb-4 ${className}`.trim()}>
			{children}
		</div>
	);
}
