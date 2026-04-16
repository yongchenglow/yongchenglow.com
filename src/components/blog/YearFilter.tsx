import { CalendarDays } from "lucide-react";
import Link from "next/link";
import FilterPanel from "@/src/components/blog/FilterPanel";
import { Badge } from "@/src/components/shared/ui/badge";
import { BLOG_LABELS } from "@/src/config/blog-ui";
import { getAllPostYears, getYearPostCounts } from "@/src/lib/blog";

export const YearFilter = () => {
	const years = getAllPostYears();
	const counts = getYearPostCounts();

	if (years.length === 0) return null;

	return (
		<FilterPanel icon={CalendarDays} heading={BLOG_LABELS.yearFilter.heading}>
			{years.map((year) => (
				<Link key={year} href={`/blog/year/${year}/1`} className="shrink-0">
					<Badge
						variant="outline"
						className="cursor-pointer hover:-translate-y-0.5 hover:bg-accent transition-all duration-200"
					>
						{year} ({counts[year] || 0})
					</Badge>
				</Link>
			))}
		</FilterPanel>
	);
};
