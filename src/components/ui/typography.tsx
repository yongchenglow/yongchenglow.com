import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/src/lib/utils";

const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
			h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
			h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
			h4: "scroll-m-20 text-xl font-semibold tracking-tight",
			h5: "scroll-m-20 text-lg font-semibold tracking-tight",
			h6: "scroll-m-20 text-base font-semibold tracking-tight",
			p: "leading-7 [&:not(:first-child)]:mt-6",
			blockquote: "mt-6 border-l-2 pl-6 italic",
			list: "my-6 ml-6 list-disc [&>li]:mt-2",
			inlineCode:
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
			lead: "text-xl text-muted-foreground",
			large: "text-lg font-semibold",
			small: "text-sm font-medium leading-none",
			muted: "text-sm text-muted-foreground",
			body1: "text-base leading-relaxed",
			body2: "text-sm leading-relaxed",
			caption: "text-xs text-muted-foreground",
			overline: "text-xs font-medium uppercase tracking-wider",
			subtitle1: "text-base font-medium",
			subtitle2: "text-sm font-medium",
		},
		color: {
			default: "",
			primary: "text-primary",
			secondary: "text-secondary",
			textSecondary: "text-muted-foreground",
			muted: "text-muted-foreground",
			destructive: "text-destructive",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
			justify: "text-justify",
		},
	},
	defaultVariants: {
		variant: "p",
		color: "default",
		align: "left",
	},
});

const variantElementMap = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	p: "p",
	blockquote: "blockquote",
	list: "ul",
	inlineCode: "code",
	lead: "p",
	large: "div",
	small: "small",
	muted: "p",
	body1: "p",
	body2: "p",
	caption: "span",
	overline: "span",
	subtitle1: "h6",
	subtitle2: "h6",
} as const;

export interface TypographyProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
		VariantProps<typeof typographyVariants> {
	asChild?: boolean;
	component?: keyof React.JSX.IntrinsicElements;
	// MUI-style props
	mb?: number;
	mt?: number;
	mx?: string | number;
	my?: string | number;
	paragraph?: boolean;
	marginBottom?: number;
	marginTop?: number;
	textAlign?: string;
	fontSize?: string;
	fontWeight?: number | string;
	sx?: { fontStyle?: string };
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			className,
			variant,
			color,
			align,
			asChild = false,
			component,
			mb,
			mt,
			mx,
			my,
			paragraph,
			marginBottom,
			marginTop,
			textAlign,
			fontSize,
			fontWeight,
			sx,
			style,
			...props
		},
		ref,
	) => {
		const actualVariant = paragraph ? "p" : variant;
		const Comp = asChild
			? Slot
			: component ||
				(actualVariant && variantElementMap[actualVariant]) ||
				"div";

		const computedStyle: React.CSSProperties = {
			...style,
			...(mb && { marginBottom: `${mb * 8}px` }),
			...(mt && { marginTop: `${mt * 8}px` }),
			...(mx && {
				marginLeft:
					mx === "auto" ? "auto" : `${typeof mx === "number" ? mx * 8 : mx}px`,
				marginRight:
					mx === "auto" ? "auto" : `${typeof mx === "number" ? mx * 8 : mx}px`,
			}),
			...(my && {
				marginTop: `${typeof my === "number" ? my * 8 : my}px`,
				marginBottom: `${typeof my === "number" ? my * 8 : my}px`,
			}),
			...(marginBottom && { marginBottom: `${marginBottom * 8}px` }),
			...(marginTop && { marginTop: `${marginTop * 8}px` }),
			...(textAlign && {
				textAlign: textAlign as React.CSSProperties["textAlign"],
			}),
			...(fontSize && { fontSize }),
			...(fontWeight && { fontWeight }),
			...(sx?.fontStyle && { fontStyle: sx.fontStyle }),
		};

		return (
			<Comp
				className={cn(
					typographyVariants({
						variant: actualVariant,
						color,
						align,
						className,
					}),
				)}
				ref={ref}
				style={computedStyle}
				{...props}
			/>
		);
	},
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
