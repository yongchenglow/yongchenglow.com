import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/src/components/shared/ui/badge";
import { cn, formatDate } from "@/src/lib/utils";

interface PostCardMetaProps {
	date?: string;
	readingTime?: string;
	className?: string;
}

/** The date and reading-time row that every post card shows. */
export const PostCardMeta = ({
	date,
	readingTime,
	className,
}: PostCardMetaProps) => {
	if (!date && !readingTime) return null;

	return (
		<div
			className={cn("flex gap-4 text-sm text-muted-foreground mb-3", className)}
		>
			{date && (
				<div className="flex items-center gap-1">
					<Calendar className="h-4 w-4" />
					{formatDate(date)}
				</div>
			)}
			{readingTime && (
				<div className="flex items-center gap-1">
					<Clock className="h-4 w-4" />
					{readingTime}
				</div>
			)}
		</div>
	);
};

interface PostCardTagsProps {
	tags?: string[];
	limit?: number;
	className?: string;
	badgeClassName?: string;
	/** Renders bare badges for a parent row that already lays them out. */
	inline?: boolean;
}

/** The tag badges under a post card. */
export const PostCardTags = ({
	tags,
	limit,
	className,
	badgeClassName,
	inline = false,
}: PostCardTagsProps) => {
	if (!tags || tags.length === 0) return null;

	const shown = typeof limit === "number" ? tags.slice(0, limit) : tags;

	const badges = shown.map((tag) => (
		<Badge key={tag} variant="secondary" className={badgeClassName}>
			{tag}
		</Badge>
	));

	if (inline) return <>{badges}</>;

	return <div className={cn("flex flex-wrap gap-2", className)}>{badges}</div>;
};
