"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/src/lib/utils";

const AvatarRoot = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className,
		)}
		{...props}
	/>
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-muted",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// MUI-compatible Avatar wrapper
interface MUIAvatarProps
	extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
	alt?: string;
	src?: string;
	sx?: {
		width?: number;
		height?: number;
		margin?: string;
	};
}

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	MUIAvatarProps
>(({ className, alt, src, sx, style, ...props }, ref) => {
	const computedStyle: React.CSSProperties = {
		...style,
		...(sx?.width && { width: `${sx.width}px` }),
		...(sx?.height && { height: `${sx.height}px` }),
		...(sx?.margin && { margin: sx.margin }),
	};

	return (
		<AvatarRoot
			ref={ref}
			className={className}
			style={computedStyle}
			{...props}
		>
			{src && <AvatarImage src={src} alt={alt} />}
			{alt && <AvatarFallback>{alt.charAt(0)}</AvatarFallback>}
		</AvatarRoot>
	);
});
Avatar.displayName = "Avatar";

export { Avatar, AvatarRoot, AvatarImage, AvatarFallback };
