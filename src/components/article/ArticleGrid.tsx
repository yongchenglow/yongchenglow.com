interface ArticleGridProps {
	children: React.ReactNode;
}

export default function ArticleGrid({ children }: ArticleGridProps) {
	return (
		<div className="flex flex-wrap justify-center gap-6 my-6">{children}</div>
	);
}
