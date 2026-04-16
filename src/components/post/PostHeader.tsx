interface PostHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export const PostHeader = ({
	title,
	subtitle,
	className = "",
}: PostHeaderProps) => {
	return (
		<div className={cn("mb-6 text-center ", className)}>
			<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
				{title}
			</h1>
			{subtitle && (
				<h2 className="text-xl font-light text-muted-foreground">{subtitle}</h2>
			)}
		</div>
	);
};
