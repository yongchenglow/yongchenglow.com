import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface PageTitleProps {
	children: ReactNode;
	className?: string;
}

export const PageTitle = ({ children, className = "" }: PageTitleProps) => {
	return (
		<h1 className={cn("text-5xl font-bold my-3 ", className)}>{children}</h1>
	);
};
