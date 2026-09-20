import { Calendar, Clock } from "lucide-react";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import { formatDate } from "@/src/lib/utils";
import type { BlogPost } from "@/src/types/blog";

interface BlogTimelineProps {
	posts: BlogPost[];
}

export const BlogTimeline = ({ posts }: BlogTimelineProps) => {
	return (
		<div className="mx-auto max-w-4xl text-left">
			<ul className="flex flex-col">
				{posts.map((post, index) => (
					<li
						key={post.slug}
						className={`border-b border-border/80 ${index === 0 ? "pt-2" : "pt-8"} pb-8`}
					>
						<InternalLink
							href={`/blog/${post.slug}`}
							className="no-underline group block"
						>
							<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 tabular-nums">
								<span className="flex items-center gap-1.5">
									<Calendar className="h-3.5 w-3.5" />
									{formatDate(post.frontmatter.date)}
								</span>
								{post.readingTime && (
									<>
										<span aria-hidden className="text-border">
											·
										</span>
										<span className="flex items-center gap-1.5">
											<Clock className="h-3.5 w-3.5" />
											{post.readingTime}
										</span>
									</>
								)}
							</div>

							<h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
								{post.frontmatter.title}
							</h2>

							{post.frontmatter.description && (
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
									{post.frontmatter.description}
								</p>
							)}

							{post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
								<div className="flex flex-wrap gap-1.5 mt-3">
									{post.frontmatter.tags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="text-xs font-normal"
										>
											{tag}
										</Badge>
									))}
								</div>
							)}
						</InternalLink>
					</li>
				))}
			</ul>
		</div>
	);
};
