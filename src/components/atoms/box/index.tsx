import type React from "react";

interface BoxProps {
	children?: React.ReactNode;
	className?: string;
	py?: number;
	px?: number;
	p?: number;
	mb?: number;
	mt?: number;
	my?: number;
	mx?: string;
	textAlign?: "left" | "center" | "right";
	maxWidth?: string;
	display?: string;
	justifyContent?: string;
	fontSize?: string;
	marginTop?: number;
	marginBottom?: number;
	style?: React.CSSProperties;
}

const Box: React.FC<BoxProps> = ({
	children,
	className = "",
	py,
	px,
	p,
	mb,
	mt,
	my,
	mx,
	textAlign,
	maxWidth,
	display,
	justifyContent,
	fontSize,
	marginTop,
	marginBottom,
	style,
	...props
}) => {
	const spacing = (value: number) => `${value * 8}px`; // MUI's 8px spacing unit

	const computedStyle: React.CSSProperties = {
		...style,
		...(py && { paddingTop: spacing(py), paddingBottom: spacing(py) }),
		...(px && { paddingLeft: spacing(px), paddingRight: spacing(px) }),
		...(p && { padding: spacing(p) }),
		...(mb && { marginBottom: spacing(mb) }),
		...(mt && { marginTop: spacing(mt) }),
		...(my && { marginTop: spacing(my), marginBottom: spacing(my) }),
		...(mx && {
			marginLeft: mx === "auto" ? "auto" : spacing(Number(mx)),
			marginRight: mx === "auto" ? "auto" : spacing(Number(mx)),
		}),
		...(textAlign && { textAlign }),
		...(maxWidth && { maxWidth: maxWidth === "md" ? "960px" : maxWidth }),
		...(display && { display }),
		...(justifyContent && { justifyContent }),
		...(fontSize && { fontSize }),
		...(marginTop && { marginTop: spacing(marginTop) }),
		...(marginBottom && { marginBottom: spacing(marginBottom) }),
	};

	return (
		<div className={className} style={computedStyle} {...props}>
			{children}
		</div>
	);
};

export default Box;
