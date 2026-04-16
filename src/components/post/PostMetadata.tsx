import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PostMetadataProps {
	children: ReactNode;
	className?: string;
}

export const PostMetadata = ({
	children,
	className = "",
}: PostMetadataProps) => {
	return (
		<div
			className={cn("text-xs text-muted-foreground text-right mb-3", className)}
		>
			{children}
		</div>
	);
};
