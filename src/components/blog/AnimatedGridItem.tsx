"use client";

import type { ReactNode } from "react";
import FadeIn from "@/src/components/shared/atoms/FadeIn";

interface AnimatedGridItemProps {
	children: ReactNode;
	index: number;
	className?: string;
}

export default function AnimatedGridItem({
	children,
	index,
	className,
}: AnimatedGridItemProps) {
	return (
		<FadeIn
			delay={index * 0.05}
			className={
				className ||
				"w-full md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
			}
		>
			{children}
		</FadeIn>
	);
}
