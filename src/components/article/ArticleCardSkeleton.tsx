import { Card, CardContent, CardHeader } from "@/src/components/shared/ui/card";
import { Skeleton } from "@/src/components/shared/ui/skeleton";

export default function ArticleCardSkeleton() {
	return (
		<Card className="h-full">
			<CardHeader>
				<Skeleton className="h-5 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
			</CardHeader>
			<CardContent>
				<div className="flex gap-4 mb-3">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-20" />
				</div>
				<div className="flex gap-2">
					<Skeleton className="h-5 w-16 rounded-md" />
					<Skeleton className="h-5 w-14 rounded-md" />
				</div>
			</CardContent>
		</Card>
	);
}
