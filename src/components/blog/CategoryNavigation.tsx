import { Folder } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/src/components/shared/atoms/FadeIn";
import { Badge } from "@/src/components/shared/ui/badge";
import { getAllCategories, getCategoryPostCounts } from "@/src/lib/blog";

export default function CategoryNavigation() {
	const categories = getAllCategories();
	const counts = getCategoryPostCounts();

	return (
		<FadeIn>
			<div className="my-6 bg-muted/50 rounded-lg p-4">
				<h3 className="text-sm font-semibold mb-3 text-left flex items-center gap-2">
					<Folder className="h-4 w-4" />
					Browse by Category
				</h3>
				<div className="flex gap-2 overflow-x-auto py-1">
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/blog/category/${category.slug}/1`}
							className="shrink-0"
						>
							<Badge
								variant="secondary"
								className="cursor-pointer hover:-translate-y-0.5 hover:bg-secondary/60 transition-all duration-200"
							>
								{category.label} ({counts[category.slug] || 0})
							</Badge>
						</Link>
					))}
				</div>
			</div>
		</FadeIn>
	);
}
