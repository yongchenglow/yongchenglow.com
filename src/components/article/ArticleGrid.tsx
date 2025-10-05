import ArticleCard from "@/src/components/article/ArticleCard";

interface Article {
	title: string;
	description: string;
	href: string;
}

interface ArticleGridProps {
	articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
	return (
		<div className="flex flex-wrap justify-center gap-6 my-6">
			{articles.map((article) => (
				<div
					key={article.href}
					className="w-full md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
				>
					<ArticleCard
						title={article.title}
						description={article.description}
						href={article.href}
					/>
				</div>
			))}
		</div>
	);
}
