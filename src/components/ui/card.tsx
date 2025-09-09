import { type CSSProperties, forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

const Card = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		sx?: { maxWidth?: number; marginX?: number };
	}
>(({ className, sx, style, ...props }, ref) => {
	const computedStyle: CSSProperties = {
		...style,
		...(sx?.maxWidth && { maxWidth: `${sx.maxWidth}px` }),
		...(sx?.marginX && {
			marginLeft: `${sx.marginX * 8}px`,
			marginRight: `${sx.marginX * 8}px`,
		}),
	};

	return (
		<div
			ref={ref}
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				className,
			)}
			style={computedStyle}
			{...props}
		/>
	);
});
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	),
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
	),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex items-center p-6 pt-0", className)}
			{...props}
		/>
	),
);
CardFooter.displayName = "CardFooter";

const CardActions = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		sx?: { justifyContent?: string; paddingTop?: number };
	}
>(({ className, sx, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		style={{
			...(sx?.justifyContent && { justifyContent: sx.justifyContent }),
			...(sx?.paddingTop !== undefined && { paddingTop: sx.paddingTop }),
		}}
		{...props}
	/>
));
CardActions.displayName = "CardActions";

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardActions,
};
