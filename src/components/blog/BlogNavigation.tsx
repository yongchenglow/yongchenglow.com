import { ChevronLeft, ChevronRight } from "lucide-react";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";
import type { BlogPost } from "@/src/types/blog";

interface BlogNavigationProps {
	previousPost?: BlogPost | null;
	nextPost?: BlogPost | null;
}

export default function BlogNavigation({
	previousPost,
	nextPost,
}: BlogNavigationProps) {
	return (
		<nav className="flex justify-between items-center gap-4 py-4">
			<div className="flex-1">
				{previousPost && (
					<InternalLink href={`/blog/${previousPost.slug}`}>
						<Button
							variant="outline"
							className="w-full justify-start h-auto py-3 px-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
						>
							<ChevronLeft className="mr-2 h-4 w-4 flex-shrink-0" />
							<div className="text-left min-w-0">
								<div className="text-xs text-muted-foreground">Previous</div>
								<div className="font-semibold truncate">
									{previousPost.frontmatter.title}
								</div>
							</div>
						</Button>
					</InternalLink>
				)}
			</div>

			<div className="flex-1 text-right">
				{nextPost && (
					<InternalLink href={`/blog/${nextPost.slug}`}>
						<Button
							variant="outline"
							className="w-full justify-end h-auto py-3 px-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
						>
							<div className="text-right min-w-0">
								<div className="text-xs text-muted-foreground">Next</div>
								<div className="font-semibold truncate">
									{nextPost.frontmatter.title}
								</div>
							</div>
							<ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
						</Button>
					</InternalLink>
				)}
			</div>
		</nav>
	);
}
