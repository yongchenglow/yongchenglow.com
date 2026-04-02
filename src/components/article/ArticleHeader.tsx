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
			<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
				{title}
			</h1>
			{subtitle && (
				<h2 className="text-xl font-light text-muted-foreground">{subtitle}</h2>
			)}
		</div>
	);
}
