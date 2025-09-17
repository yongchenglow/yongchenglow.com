import ArticleCard from "@/src/components/article/ArticleCard";

export default function LatestArticlesSection() {
	return (
		<div className="py-12 text-center">
			<div className="mb-8">
				<h2 className="text-3xl font-semibold">Latest Tech Articles</h2>
			</div>
			<div className="flex justify-center">
				<ArticleCard
					title="Setting up your Project"
					description="What is the proper way to setup a group project? How do we make the best our of our IDE to increase code quality and productivity?"
					href="/blog/6"
				/>
			</div>
		</div>
	);
}
