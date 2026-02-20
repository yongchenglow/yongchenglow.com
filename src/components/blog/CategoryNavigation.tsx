import Link from "next/link";
import { Badge } from "@/src/components/shared/ui/badge";
import { getAllCategories, getCategoryPostCounts } from "@/src/lib/blog";

export default function CategoryNavigation() {
	const categories = getAllCategories();
	const counts = getCategoryPostCounts();

	return (
		<div className="my-6">
			<h3 className="text-sm font-semibold mb-3 text-left">
				Browse by Category
			</h3>
			<div className="flex gap-2 overflow-x-auto py-2">
				{categories.map((category) => (
					<Link
						key={category.slug}
						href={`/blog/category/${category.slug}/1`}
						className="shrink-0"
					>
						<Badge
							variant="secondary"
							className="cursor-pointer hover:bg-secondary/60 transition-colors"
						>
							{category.label} ({counts[category.slug] || 0})
						</Badge>
					</Link>
				))}
			</div>
		</div>
	);
}
