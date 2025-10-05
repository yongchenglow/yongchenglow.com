import ArticleButton from "@/src/components/article/ArticleButton";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import ContentCard from "@/src/components/shared/organisms/ContentCard";

interface ArticleCardProps {
	title: string;
	description: string;
	href: string;
	buttonText?: string;
}

export default function ArticleCard({
	title,
	description,
	href,
	buttonText = "Read Now",
}: ArticleCardProps) {
	return (
		<InternalLink href={href}>
			<ContentCard
				title={title}
				description={description}
				className="block hover:shadow-lg transition-shadow duration-200 max-w-md"
				footer={<ArticleButton>{buttonText}</ArticleButton>}
			/>
		</InternalLink>
	);
}
