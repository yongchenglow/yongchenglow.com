import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PostDefinitionProps {
	children: ReactNode;
	className?: string;
}

export const PostDefinition = ({
	children,
	className = "",
}: PostDefinitionProps) => {
	return (
		<div className={cn("my-3 max-w-sm mx-auto ", className)}>
			<div className="text-center mb-2 italic">{children}</div>
		</div>
	);
};
