"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { type ReactNode, useRef } from "react";

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	distance?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const FadeIn = ({
	children,
	delay = 0,
	duration = 0.5,
	distance = 20,
	threshold = 0.1,
	once = true,
	className,
}: FadeInProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, amount: threshold });

	const variants: Variants = {
		hidden: { opacity: 0, y: distance },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={variants}
			transition={{ duration, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
