import { ArrowRight } from "lucide-react";
import {
	PostCardMeta,
	PostCardTags,
} from "@/src/components/post/PostCardParts";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import { buttonVariants } from "@/src/components/shared/ui/button";
import { BLOG_UI } from "@/src/config/blog-ui";
import type { BlogPost } from "@/src/types/blog";

interface FeaturedPostCardProps {
	post: BlogPost;
}

export const FeaturedPostCard = ({ post }: FeaturedPostCardProps) => {
	const { frontmatter, readingTime } = post;

	return (
		<InternalLink href={`/blog/${post.slug}`} className="no-underline group">
			<div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
				<div className="flex flex-col sm:flex-row">
					{/* Gradient left panel */}
					<div className="sm:w-2 bg-gradient-to-b from-primary to-primary/30 shrink-0" />

					{/* Content */}
					<div className="flex-1 p-6">
						<div className="flex flex-wrap gap-2 mb-3">
							<Badge variant="default" className="text-xs">
								{BLOG_UI.featured.badge}
							</Badge>
							<PostCardTags
								tags={frontmatter.tags}
								limit={3}
								badgeClassName="text-xs"
								inline
							/>
						</div>

						<h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-200">
							{frontmatter.title}
						</h3>
						<p className="text-muted-foreground mb-4 line-clamp-3">
							{frontmatter.description}
						</p>

						<div className="flex items-center justify-between flex-wrap gap-3">
							<PostCardMeta
								date={frontmatter.date}
								readingTime={readingTime}
								className="mb-0"
							/>

							<span
								className={buttonVariants({
									variant: "ghost",
									size: "sm",
									className: "gap-1",
								})}
							>
								Read post
								<ArrowRight className="h-4 w-4" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</InternalLink>
	);
};
