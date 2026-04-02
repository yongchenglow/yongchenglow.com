import { ArrowLeft } from "lucide-react";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import { Button } from "@/src/components/shared/ui/button";

export default function BlogBackButton() {
	return (
		<div className="flex justify-end mb-6">
			<Button variant="ghost" size="sm" asChild>
				<InternalLink href="/blog">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</InternalLink>
			</Button>
		</div>
	);
}
