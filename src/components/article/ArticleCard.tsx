import { Calendar, Clock } from "lucide-react";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Badge } from "@/src/components/shared/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/shared/ui/card";

interface ArticleCardProps {
	title: string;
	description: string;
	href: string;
	readingTime?: string;
	date?: string;
	tags?: string[];
}

export default function ArticleCard({
	title,
	description,
	href,
	readingTime,
	date,
	tags,
}: ArticleCardProps) {
	return (
		<InternalLink href={href} className="no-underline">
			<Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
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
				</CardContent>
			</Card>
		</InternalLink>
	);
}
