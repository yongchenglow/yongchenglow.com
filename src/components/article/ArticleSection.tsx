interface ArticleSectionProps {
	title: string;
	className?: string;
	children?: React.ReactNode;
}

export default function ArticleSection({
	title,
	className = "",
	children,
}: ArticleSectionProps) {
	return (
		<div className={`mb-7 ${className}`.trim()}>
			<h5
				className="text-lg font-medium text-center mb-3"
				style={{ fontWeight: 450 }}
			>
				{title}
			</h5>
			{children}
		</div>
	);
}
