import { ArrowLeft } from "lucide-react";
import { InternalLink } from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";

export const BlogBackButton = () => {
	return (
		<div className="mb-6 flex justify-start">
			<Button variant="ghost" size="sm" className="min-h-11" asChild>
				<InternalLink href="/blog">
					<ArrowLeft aria-hidden="true" />
					All articles
				</InternalLink>
			</Button>
		</div>
	);
};
