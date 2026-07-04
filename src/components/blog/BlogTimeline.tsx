import { Calendar, Clock } from "lucide-react";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import { formatDate } from "@/src/lib/utils";
import type { BlogPost } from "@/src/types/blog";

interface BlogTimelineProps {
	posts: BlogPost[];
}

const groupByYear = (posts: BlogPost[]): Map<number, BlogPost[]> => {
	const groups = new Map<number, BlogPost[]>();
	for (const post of posts) {
		const year = new Date(post.frontmatter.date).getFullYear();
		const bucket = groups.get(year) ?? [];
		bucket.push(post);
		groups.set(year, bucket);
	}
	return groups;
};

export const BlogTimeline = ({ posts }: BlogTimelineProps) => {
	const grouped = groupByYear(posts);
	const years = Array.from(grouped.keys()).sort((a, b) => b - a);

	return (
		<div className="mx-auto max-w-4xl text-left">
			{years.map((year) => {
				const yearPosts = grouped.get(year) ?? [];
				return (
					<section
						key={year}
						className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-y-6 md:gap-x-12 mb-16"
					>
						<div className="md:sticky md:top-24 md:self-start">
							<h2 className="text-4xl font-bold tracking-tight text-muted-foreground/70 tabular-nums">
								{year}
							</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								{yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
							</p>
						</div>

						<ul className="flex flex-col">
							{yearPosts.map((post, i) => (
								<li
									key={post.slug}
									className={`border-b border-border/80 ${i === 0 ? "pt-2" : "pt-8"} pb-8`}
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

										<h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
											{post.frontmatter.title}
										</h3>

										{post.frontmatter.description && (
											<p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
												{post.frontmatter.description}
											</p>
										)}

										{post.frontmatter.tags &&
											post.frontmatter.tags.length > 0 && (
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
					</section>
				);
			})}
		</div>
	);
};
