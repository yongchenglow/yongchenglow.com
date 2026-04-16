import { ArrowRight, Calendar, Clock } from "lucide-react";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/shared/ui/card";

interface PostCardProps {
	title: string;
	description: string;
	href: string;
	readingTime?: string;
	date?: string;
	tags?: string[];
	className?: string;
}

export const PostCard = ({
	title,
	description,
	href,
	readingTime,
	date,
	tags,
	className,
}: PostCardProps) => {
	return (
		<div className={className}>
			<InternalLink href={href} className="no-underline group">
				<Card className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
					<CardHeader>
						<CardTitle className="group-hover:text-primary transition-colors duration-200">
							{title}
						</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						{/* Metadata */}
						{(date || readingTime) && (
							<div className="flex gap-4 text-sm text-muted-foreground mb-3">
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
						)}

						{/* Tags */}
						{tags && tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{tags.map((tag) => (
									<Badge key={tag} variant="secondary">
										{tag}
									</Badge>
								))}
							</div>
						)}

						{/* Hover-reveal CTA */}
						<div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pt-4 border-t border-border mt-4">
							<span className="text-sm font-medium text-primary flex items-center gap-1">
								Read full story
								<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
							</span>
						</div>
					</CardContent>
				</Card>
			</InternalLink>
		</div>
	);
};
