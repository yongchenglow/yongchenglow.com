import {
	PostCardMeta,
	PostCardTags,
} from "@/src/components/post/PostCardParts";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/shared/ui/card";
import type { BlogPost } from "@/src/types/blog";

interface PostCardProps {
	post: BlogPost;
	className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
	const { frontmatter, readingTime } = post;

	return (
		<div className={className}>
			<InternalLink href={`/blog/${post.slug}`} className="no-underline group">
				<Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
					<CardHeader>
						<CardTitle className="group-hover:text-primary transition-colors duration-200">
							{frontmatter.title}
						</CardTitle>
						<CardDescription>{frontmatter.description}</CardDescription>
					</CardHeader>
					<CardContent>
						{/* Metadata */}
						<PostCardMeta date={frontmatter.date} readingTime={readingTime} />

						{/* Tags */}
						<PostCardTags tags={frontmatter.tags} />
					</CardContent>
				</Card>
			</InternalLink>
		</div>
	);
};
