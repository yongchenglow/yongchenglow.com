import { MapPin } from "lucide-react";
import type { ReactNode } from "react";
import FadeIn from "@/src/components/shared/atoms/FadeIn";

const categoryColors = {
	school: {
		bg: "bg-blue-500/10",
		text: "text-blue-500",
		border: "border-blue-500/20",
	},
	work: {
		bg: "bg-emerald-500/10",
		text: "text-emerald-500",
		border: "border-emerald-500/20",
	},
	military: {
		bg: "bg-violet-500/10",
		text: "text-violet-500",
		border: "border-violet-500/20",
	},
};

interface TimelineItemProps {
	title: string;
	icon: ReactNode;
	children: ReactNode;
	category: "school" | "work" | "military";
	years: string;
	location: string;
}

export default function TimelineItem({
	title,
	icon,
	children,
	category,
	years,
	location,
}: TimelineItemProps) {
	const colors = categoryColors[category];
	return (
		<FadeIn>
			<div className="relative flex items-start">
				{/* Icon dot on timeline */}
				<div
					className={`absolute left-4 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 ${colors.border} ${colors.text}`}
				>
					{icon}
				</div>

				{/* Content card - always on the right of the timeline */}
				<div className="ml-12 flex-1">
					<div
						className={`rounded-lg border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out text-left bg-gradient-to-br from-card to-muted/10`}
					>
						<div className="flex flex-col gap-3">
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<h3 className="font-semibold text-base text-left">{title}</h3>
									<div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
										<span className="flex items-center gap-1">
											<MapPin className="h-3 w-3" />
											{location}
										</span>
									</div>
								</div>
								<span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded whitespace-nowrap">
									{years}
								</span>
							</div>
							<div className="text-sm text-muted-foreground leading-relaxed text-left">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</FadeIn>
	);
}
