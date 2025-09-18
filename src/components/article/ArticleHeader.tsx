interface ArticleHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export default function ArticleHeader({
	title,
	subtitle,
	className = "",
}: ArticleHeaderProps) {
	return (
		<div className={`mb-6 text-center ${className}`.trim()}>
			<h1 className="text-3xl font-bold mb-2">{title}</h1>
			{subtitle && (
				<h2 className="text-xl text-muted-foreground">{subtitle}</h2>
			)}
		</div>
	);
}
