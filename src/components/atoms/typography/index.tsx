import React from "react";

interface TypographyProps {
	children: React.ReactNode;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
	paragraph?: boolean;
	marginBottom?: number;
	marginTop?: number;
	mb?: number;
	textAlign?: "left" | "center" | "right";
	fontWeight?: number;
	fontSize?: string;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
	sx?: {
		fontStyle?: string;
		[key: string]: string | number | undefined;
	};
}

const Typography: React.FC<TypographyProps> = ({
	children,
	variant = "body1",
	paragraph = false,
	marginBottom,
	marginTop,
	mb,
	textAlign,
	fontWeight,
	fontSize,
	color,
	className = "",
	style,
	sx,
	...props
}) => {
	const spacing = (value: number) => `${value * 8}px`;

	const getVariantStyles = (): React.CSSProperties => {
		const baseStyles = {
			margin: 0,
			fontFamily: "inherit",
			lineHeight: 1.5,
		};

		switch (variant) {
			case "h1":
				return {
					...baseStyles,
					fontSize: "3rem",
					fontWeight: 300,
					lineHeight: 1.167,
				};
			case "h2":
				return {
					...baseStyles,
					fontSize: "2.125rem",
					fontWeight: 300,
					lineHeight: 1.2,
				};
			case "h3":
				return {
					...baseStyles,
					fontSize: "1.5rem",
					fontWeight: 400,
					lineHeight: 1.167,
				};
			case "h4":
				return {
					...baseStyles,
					fontSize: "1.25rem",
					fontWeight: 400,
					lineHeight: 1.235,
				};
			case "h5":
				return {
					...baseStyles,
					fontSize: "1rem",
					fontWeight: 400,
					lineHeight: 1.334,
				};
			case "h6":
				return {
					...baseStyles,
					fontSize: "0.875rem",
					fontWeight: 500,
					lineHeight: 1.6,
				};
			case "body1":
				return {
					...baseStyles,
					fontSize: "1rem",
					fontWeight: 400,
					lineHeight: 1.5,
				};
			case "body2":
				return {
					...baseStyles,
					fontSize: "0.875rem",
					fontWeight: 400,
					lineHeight: 1.43,
				};
			default:
				return baseStyles;
		}
	};

	const computedStyle: React.CSSProperties = {
		...getVariantStyles(),
		...style,
		...(paragraph && { marginBottom: "16px" }),
		...(marginBottom && { marginBottom: spacing(marginBottom) }),
		...(marginTop && { marginTop: spacing(marginTop) }),
		...(mb && { marginBottom: spacing(mb) }),
		...(textAlign && { textAlign }),
		...(fontWeight && { fontWeight }),
		...(fontSize && { fontSize }),
		...(color && { color }),
		...(sx?.fontStyle && { fontStyle: sx.fontStyle }),
	};

	const Component = variant.startsWith("h")
		? variant
		: paragraph
			? "p"
			: "span";

	return React.createElement(
		Component,
		{ className, style: computedStyle, ...props },
		children,
	);
};

export default Typography;
