import { Folder } from "lucide-react";
import Link from "next/link";
import FilterPanel from "@/src/components/blog/FilterPanel";
import { Badge } from "@/src/components/shared/ui/badge";
import { BLOG_LABELS } from "@/src/config/blog-ui";
import { getAllCategories, getCategoryPostCounts } from "@/src/lib/blog";

export const CategoryNavigation = () => {
	const categories = getAllCategories();
	const counts = getCategoryPostCounts();

	return (
		<FilterPanel icon={Folder} heading={BLOG_LABELS.categoryNavigation.heading}>
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
		</FilterPanel>
	);
};
