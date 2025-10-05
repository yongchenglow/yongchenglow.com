import ArticleGrid from "@/src/components/article/ArticleGrid";
import Section from "@/src/components/shared/molecules/Section";

const previousArticles = [
	{
		title: "Understanding React Hooks",
		description:
			"A comprehensive guide to understanding and implementing React Hooks in your applications effectively.",
		href: "/blog/1",
	},
	{
		title: "Building with TypeScript",
		description:
			"Learn how to leverage TypeScript for better code quality and developer experience in your projects.",
		href: "/blog/2",
	},
	{
		title: "Modern CSS Techniques",
		description:
			"Explore modern CSS features and techniques to create beautiful and responsive web interfaces.",
		href: "/blog/3",
	},
	{
		title: "Performance Optimization",
		description:
			"Tips and techniques for optimizing your web applications for better performance and user experience.",
		href: "/blog/4",
	},
	{
		title: "API Design Best Practices",
		description:
			"Learn the fundamentals of designing robust and scalable APIs that developers love to use.",
		href: "/blog/5",
	},
];

export default function PreviousArticlesSection() {
	return (
		<Section title="Previous Articles">
			<ArticleGrid articles={previousArticles} />
		</Section>
	);
}
