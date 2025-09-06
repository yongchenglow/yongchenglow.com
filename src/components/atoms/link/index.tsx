import type React from "react";

interface LinkProps {
	children: React.ReactNode;
	href: string;
	target?: string;
	underline?: "none" | "hover" | "always";
	className?: string;
	style?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({
	children,
	href,
	target,
	underline = "hover",
	className = "",
	style,
	...props
}) => {
	const getUnderlineStyle = (): React.CSSProperties => {
		switch (underline) {
			case "none":
				return { textDecoration: "none" };
			case "always":
				return { textDecoration: "underline" };
			default:
				return { textDecoration: "none" };
		}
	};

	const computedStyle: React.CSSProperties = {
		color: "#556cd6", // Primary color from theme
		...getUnderlineStyle(),
		...style,
	};

	const hoverClass = underline === "hover" ? "hover:underline" : "";

	return (
		<a
			href={href}
			target={target}
			className={`${className} ${hoverClass}`}
			style={computedStyle}
			{...props}
		>
			{children}
		</a>
	);
};

export default Link;
