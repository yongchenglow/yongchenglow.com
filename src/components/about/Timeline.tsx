import type { ReactNode } from "react";

interface TimelineProps {
	children: ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
	return (
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2" />
			<div className="space-y-8">{children}</div>
		</div>
	);
}
