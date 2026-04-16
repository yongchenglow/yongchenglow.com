import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PageSubtitleProps {
	children: ReactNode;
	className?: string;
}

export const PageSubtitle = ({
	children,
	className = "",
}: PageSubtitleProps) => {
	return (
		<h2 className={cn("text-muted-foreground text-center mb-4 ", className)}>
			{children}
		</h2>
	);
};
