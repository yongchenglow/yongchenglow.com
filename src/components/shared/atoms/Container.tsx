import type React from "react";
import { cn } from "@/src/lib/utils";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
	return (
		<div className={cn("container mx-auto px-4", className)}>{children}</div>
	);
};

export default Container;
