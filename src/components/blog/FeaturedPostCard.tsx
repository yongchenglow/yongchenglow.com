import { ArrowRight, Calendar, Clock } from "lucide-react";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import { Button } from "@/src/components/shared/ui/button";

interface FeaturedPostCardProps {
	title: string;
	description: string;
	href: string;
	date?: string;
	readingTime?: string;
	tags?: string[];
}

export default function FeaturedPostCard({
	title,
	description,
	href,
	date,
	readingTime,
	tags,
}: FeaturedPostCardProps) {
	return (
		<InternalLink href={href} className="no-underline group">
			<div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
				<div className="flex flex-col sm:flex-row">
					{/* Gradient left panel */}
					<div className="sm:w-2 bg-gradient-to-b from-primary to-primary/30 shrink-0" />

					{/* Content */}
					<div className="flex-1 p-6">
						<div className="flex flex-wrap gap-2 mb-3">
							<Badge variant="default" className="text-xs">
								Featured
							</Badge>
							{tags?.slice(0, 3).map((tag) => (
								<Badge key={tag} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>

						<h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-200">
							{title}
						</h3>
						<p className="text-muted-foreground mb-4 line-clamp-3">
							{description}
						</p>

						<div className="flex items-center justify-between flex-wrap gap-3">
							<div className="flex gap-4 text-sm text-muted-foreground">
								{date && (
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{new Date(date).toLocaleDateString()}
									</div>
								)}
								{readingTime && (
									<div className="flex items-center gap-1">
										<Clock className="h-4 w-4" />
										{readingTime}
									</div>
								)}
							</div>

							<Button variant="ghost" size="sm" className="gap-1">
								Read article
								<ArrowRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</InternalLink>
	);
}
