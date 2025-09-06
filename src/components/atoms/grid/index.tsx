import type React from "react";

interface GridProps {
	children: React.ReactNode;
	container?: boolean;
	item?: boolean;
	spacing?: number;
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around";
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	component?: React.ElementType;
	sx?: {
		maxWidth?: number;
		[key: string]: string | number | undefined;
	};
	className?: string;
	style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({
	children,
	container = false,
	item = false,
	spacing = 0,
	justifyContent,
	xs,
	sm,
	md,
	lg,
	xl,
	component: Component = "div",
	sx,
	className = "",
	style,
	...props
}) => {
	const getFlexBasis = (): string => {
		// Simple responsive grid implementation
		if (xs) return `${(xs / 12) * 100}%`;
		if (sm) return `${(sm / 12) * 100}%`;
		if (md) return `${(md / 12) * 100}%`;
		return "100%";
	};

	const computedStyle: React.CSSProperties = {
		...style,
		...(container && {
			display: "flex",
			flexWrap: "wrap",
			gap: spacing ? `${spacing * 8}px` : undefined,
			justifyContent,
		}),
		...(item && {
			flexBasis: getFlexBasis(),
			flexGrow: 1,
		}),
		...(sx?.maxWidth && { maxWidth: `${sx.maxWidth}px` }),
	};

	return (
		<Component className={className} style={computedStyle} {...props}>
			{children}
		</Component>
	);
};

export default Grid;
