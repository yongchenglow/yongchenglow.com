import type { ReactNode } from "react";

interface TimelineProps {
	children: ReactNode;
}

export const Timeline = ({ children }: TimelineProps) => {
	return (
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 -translate-x-1/2" />
			<div className="space-y-6">{children}</div>
		</div>
	);
};
