import ArticleCard from "@/src/components/article/ArticleCard";
import Section from "@/src/components/shared/molecules/Section";

export default function LatestArticlesSection() {
	return (
		<div className="py-12 text-center">
			<Section title="Latest Tech Articles">
				<div className="flex justify-center">
					<ArticleCard
						title="Setting up your Project"
						description="What is the proper way to setup a group project? How do we make the best our of our IDE to increase code quality and productivity?"
						href="/blog/6"
					/>
				</div>
			</Section>
		</div>
	);
}
