import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
	container?: boolean;
	item?: boolean;
	spacing?: number;
	xs?: number | boolean;
	sm?: number | boolean;
	md?: number | boolean;
	lg?: number | boolean;
	xl?: number | boolean;
	component?: React.ElementType;
	sx?: {
		maxWidth?: number;
	};
	justifyContent?: string;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
	(
		{
			className,
			asChild = false,
			container = false,
			item = false,
			spacing = 0,
			xs,
			sm,
			md,
			lg,
			xl,
			component,
			sx,
			justifyContent,
			style,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : component || "div";

		const getGridClasses = () => {
			const classes: string[] = [];

			if (container) {
				classes.push("grid");
				if (spacing > 0) {
					classes.push(`gap-${spacing}`);
				}
				classes.push("grid-cols-12");
				if (justifyContent) {
					if (justifyContent === "center") {
						classes.push("justify-center");
					}
				}
			}

			if (item) {
				if (xs) {
					if (typeof xs === "number") {
						classes.push(`col-span-${xs}`);
					} else {
						classes.push("col-span-12");
					}
				}
				if (sm) {
					if (typeof sm === "number") {
						classes.push(`sm:col-span-${sm}`);
					} else {
						classes.push("sm:col-span-12");
					}
				}
				if (md) {
					if (typeof md === "number") {
						classes.push(`md:col-span-${md}`);
					} else {
						classes.push("md:col-span-12");
					}
				}
				if (lg) {
					if (typeof lg === "number") {
						classes.push(`lg:col-span-${lg}`);
					} else {
						classes.push("lg:col-span-12");
					}
				}
				if (xl) {
					if (typeof xl === "number") {
						classes.push(`xl:col-span-${xl}`);
					} else {
						classes.push("xl:col-span-12");
					}
				}
			}

			return classes.join(" ");
		};

		const computedStyle: React.CSSProperties = {
			...style,
			...(sx?.maxWidth && { maxWidth: `${sx.maxWidth}px` }),
		};

		return (
			<Comp
				className={cn(getGridClasses(), className)}
				ref={ref}
				style={computedStyle}
				{...props}
			/>
		);
	},
);
Grid.displayName = "Grid";

export { Grid };
