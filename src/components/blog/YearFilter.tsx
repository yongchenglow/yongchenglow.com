import Link from "next/link";
import { Badge } from "@/src/components/shared/ui/badge";
import { getAllPostYears, getYearPostCounts } from "@/src/lib/blog";

export default function YearFilter() {
	const years = getAllPostYears();
	const counts = getYearPostCounts();

	if (years.length === 0) return null;

	return (
		<div className="my-6">
			<h3 className="text-sm font-semibold mb-3 text-left">Browse by Year</h3>
			<div className="flex gap-2 overflow-x-auto py-2">
				{years.map((year) => (
					<Link key={year} href={`/blog/year/${year}/1`} className="shrink-0">
						<Badge
							variant="outline"
							className="cursor-pointer hover:bg-accent transition-colors"
						>
							{year} ({counts[year] || 0})
						</Badge>
					</Link>
				))}
			</div>
		</div>
	);
}
