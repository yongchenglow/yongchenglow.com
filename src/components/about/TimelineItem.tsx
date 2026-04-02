import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface TimelineItemProps {
	year: string;
	title: string;
	icon: ReactNode;
	children: ReactNode;
	side?: "left" | "right";
}

export default function TimelineItem({
	year,
	title,
	icon,
	children,
	side = "left",
}: TimelineItemProps) {
	return (
		<div
			className={cn(
				"relative flex items-start",
				"sm:grid sm:grid-cols-2 sm:gap-8",
			)}
		>
			{/* Icon dot on timeline */}
			<div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary text-primary">
				{icon}
			</div>

			{/* Content card - always right of dot on mobile, alternating on desktop */}
			<div
				className={cn(
					"ml-12 sm:ml-0 flex-1",
					side === "right"
						? "sm:col-start-2"
						: "sm:col-start-1 sm:text-right sm:flex sm:justify-end",
				)}
			>
				<div
					className={cn(
						"rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow duration-200",
						side === "left" ? "sm:mr-8" : "sm:ml-8",
					)}
				>
					<div
						className={cn(
							"flex items-center gap-2 mb-1",
							side === "left" ? "sm:flex-row-reverse" : "",
						)}
					>
						<span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
							{year}
						</span>
						<h3 className="font-semibold text-sm">{title}</h3>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{children}
					</p>
				</div>
			</div>

			{/* Spacer for the other column on desktop */}
			<div
				className={cn(
					"hidden sm:block",
					side === "right" ? "sm:col-start-1" : "sm:col-start-2",
				)}
			/>
		</div>
	);
}
