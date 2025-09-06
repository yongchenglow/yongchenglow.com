import type React from "react";

interface CardProps {
	children: React.ReactNode;
	sx?: {
		maxWidth?: number;
		marginX?: number;
		[key: string]: string | number | undefined;
	};
	className?: string;
	style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
	children,
	sx,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
		overflow: "hidden",
		...style,
		...(sx?.maxWidth && { maxWidth: `${sx.maxWidth}px` }),
		...(sx?.marginX && {
			marginLeft: `${sx.marginX * 8}px`,
			marginRight: `${sx.marginX * 8}px`,
		}),
	};

	return (
		<div className={className} style={computedStyle} {...props}>
			{children}
		</div>
	);
};

interface CardContentProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const CardContent: React.FC<CardContentProps> = ({
	children,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		padding: "16px",
		...style,
	};

	return (
		<div className={className} style={computedStyle} {...props}>
			{children}
		</div>
	);
};

interface CardActionsProps {
	children: React.ReactNode;
	sx?: {
		justifyContent?: string;
		paddingTop?: number;
		[key: string]: string | number | undefined;
	};
	className?: string;
	style?: React.CSSProperties;
}

export const CardActions: React.FC<CardActionsProps> = ({
	children,
	sx,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		padding: "8px 16px",
		display: "flex",
		alignItems: "center",
		...style,
		...(sx?.justifyContent && { justifyContent: sx.justifyContent }),
		...(sx?.paddingTop && { paddingTop: `${sx.paddingTop}px` }),
	};

	return (
		<div className={className} style={computedStyle} {...props}>
			{children}
		</div>
	);
};

export default Card;
