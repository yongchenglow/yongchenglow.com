import { Briefcase, GraduationCap, Shield } from "lucide-react";
import { BulletList } from "@/src/components/shared/atoms/BulletList";
import type { TimelineItem as TimelineItemType } from "@/src/content/schema";
import { tokenizeWithLinks } from "@/src/lib/text";
import { TimelineItem } from "./TimelineItem";

interface TimelineItemRendererProps {
	item: TimelineItemType;
}

export default function TimelineItemRenderer({
	item,
}: TimelineItemRendererProps) {
	switch (item.type) {
		case "work":
			return (
				<TimelineItem
					key={item.title}
					title={item.title}
					icon={<Briefcase className="h-4 w-4" />}
					category="work"
					years={item.years}
					location={item.location}
				>
					<BulletList bullets={item.bullets} />
					<p className="mt-3 text-xs font-medium text-muted-foreground">
						<strong>Skills:</strong> {item.skills.join(", ")}
					</p>
				</TimelineItem>
			);
		case "education":
			return (
				<TimelineItem
					key={item.title}
					title={item.title}
					icon={<GraduationCap className="h-4 w-4" />}
					category="school"
					years={item.years}
					location={item.location}
				>
					{tokenizeWithLinks(item.description, item.links || [])}
					<BulletList bullets={item.bullets} className="mt-2" />
				</TimelineItem>
			);
		case "military":
			return (
				<TimelineItem
					key={item.title}
					title={item.title}
					icon={<Shield className="h-4 w-4" />}
					category="military"
					years={item.years}
					location={item.location}
				>
					{tokenizeWithLinks(item.description, item.link ? [item.link] : [])}
					<BulletList bullets={item.bullets} className="mt-2" />
				</TimelineItem>
			);
	}
}
