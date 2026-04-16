import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";

interface FilterPanelProps {
	icon: LucideIcon;
	heading: string;
	children: ReactNode;
}

export default function FilterPanel({
	icon: Icon,
	heading,
	children,
}: FilterPanelProps) {
	return (
		<FadeIn>
			<div className="my-6 bg-muted/50 rounded-lg p-4">
				<h3 className="text-sm font-semibold mb-3 text-left flex items-center gap-2">
					<Icon className="h-4 w-4" />
					{heading}
				</h3>
				<div className="flex gap-2 overflow-x-auto py-1">{children}</div>
			</div>
		</FadeIn>
	);
}
