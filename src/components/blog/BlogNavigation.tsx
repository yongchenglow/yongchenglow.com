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
		<nav className="flex justify-between items-center my-8 gap-4">
			<div className="flex-1">
				{previousPost && (
					<InternalLink href={`/blog/${previousPost.slug}`}>
						<Button variant="outline" className="w-full justify-start">
							<ChevronLeft className="mr-2 h-4 w-4" />
							<div className="text-left">
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
						<Button variant="outline" className="w-full justify-end">
							<div className="text-right">
								<div className="text-xs text-muted-foreground">Next</div>
								<div className="font-semibold truncate">
									{nextPost.frontmatter.title}
								</div>
							</div>
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</InternalLink>
				)}
			</div>
		</nav>
	);
}
