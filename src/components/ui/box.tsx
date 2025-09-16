import { Slot } from "@radix-ui/react-slot";
import { type CSSProperties, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
	// MUI-style props
	py?: number;
	px?: number;
	p?: number;
	m?: number;
	mb?: number;
	mt?: number;
	ml?: number;
	mr?: number;
	mx?: string | number;
	my?: string | number;
	maxWidth?: number | string;
	display?: string;
	justifyContent?: string;
	alignItems?: string;
	textAlign?: string;
	component?: keyof JSX.IntrinsicElements;
	fontSize?: string;
	color?: string;
	marginBottom?: number;
	marginTop?: number;
}

const Box = forwardRef<HTMLElement, BoxProps>(
	(
		{
			className,
			asChild = false,
			style,
			py,
			px,
			p,
			m,
			mb,
			mt,
			ml,
			mr,
			mx,
			my,
			maxWidth,
			display,
			justifyContent,
			alignItems,
			textAlign,
			component,
			fontSize,
			color,
			marginBottom,
			marginTop,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : component || "div";

		const computedStyle: CSSProperties = {
			...style,
			...(py && { paddingTop: `${py * 8}px`, paddingBottom: `${py * 8}px` }),
			...(px && { paddingLeft: `${px * 8}px`, paddingRight: `${px * 8}px` }),
			...(p && { padding: `${p * 8}px` }),
			...(m && { margin: `${m * 8}px` }),
			...(mb && { marginBottom: `${mb * 8}px` }),
			...(mt && { marginTop: `${mt * 8}px` }),
			...(ml && { marginLeft: `${ml * 8}px` }),
			...(mr && { marginRight: `${mr * 8}px` }),
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
			...(maxWidth && {
				maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
			}),
			...(display && { display }),
			...(justifyContent && { justifyContent }),
			...(alignItems && { alignItems }),
			...(textAlign && {
				textAlign: textAlign as CSSProperties["textAlign"],
			}),
			...(fontSize && { fontSize }),
			...(color && { color }),
			...(marginBottom && { marginBottom: `${marginBottom * 8}px` }),
			...(marginTop && { marginTop: `${marginTop * 8}px` }),
		};

		return (
			<Comp
				className={cn("", className)}
				ref={ref}
				style={computedStyle}
				{...props}
			/>
		);
	},
);
Box.displayName = "Box";

export { Box };
