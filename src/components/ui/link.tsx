import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	type ReactNode,
} from "react";
import { cn } from "@/src/lib/utils";

const linkVariants = cva(
	"inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "text-primary underline-offset-4 hover:underline",
				subtle: "text-muted-foreground hover:text-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "text-sm",
				sm: "text-xs",
				lg: "text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface LinkProps
	extends ComponentPropsWithoutRef<typeof NextLink>,
		VariantProps<typeof linkVariants> {
	children: ReactNode;
	underline?: "none" | "hover" | "always";
}

const Link = forwardRef<ComponentRef<typeof NextLink>, LinkProps>(
	({ className, variant, size, underline, ...props }, ref) => {
		const underlineClass =
			underline === "none"
				? "no-underline"
				: underline === "always"
					? "underline"
					: "hover:underline";

		return (
			<NextLink
				className={cn(
					linkVariants({ variant, size }),
					underlineClass,
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Link.displayName = "Link";

export { Link, linkVariants };
