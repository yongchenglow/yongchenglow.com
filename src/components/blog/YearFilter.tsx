import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { Badge } from "@/src/components/shared/ui/badge";
import { BLOG_LABELS } from "@/src/config/blog-ui";
import { getAllPostYears, getYearPostCounts } from "@/src/lib/blog";

export const YearFilter = () => {
	const years = getAllPostYears();
	const counts = getYearPostCounts();

	if (years.length === 0) return null;

	return (
		<FadeIn>
			<div className="my-6 bg-muted/50 rounded-lg p-4">
				<h3 className="text-sm font-semibold mb-3 text-left flex items-center gap-2">
					<CalendarDays className="h-4 w-4" />
					{BLOG_LABELS.yearFilter.heading}
				</h3>
				<div className="flex gap-2 overflow-x-auto py-1">
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
				</div>
			</div>
		</FadeIn>
	);
};
