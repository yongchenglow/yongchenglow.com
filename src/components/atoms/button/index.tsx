import type React from "react";

interface ButtonProps {
	children: React.ReactNode;
	size?: "small" | "medium" | "large";
	variant?: "contained" | "outlined" | "text";
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	size = "medium",
	variant = "contained",
	className = "",
	style,
	onClick,
	...props
}) => {
	const getSizeStyles = (): React.CSSProperties => {
		switch (size) {
			case "small":
				return { padding: "4px 8px", fontSize: "0.75rem" };
			case "large":
				return { padding: "12px 24px", fontSize: "1.125rem" };
			default:
				return { padding: "8px 16px", fontSize: "1rem" };
		}
	};

	const getVariantStyles = (): React.CSSProperties => {
		const baseStyles = {
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			fontWeight: 500,
			textTransform: "uppercase" as const,
			transition: "all 0.2s",
		};

		switch (variant) {
			case "outlined":
				return {
					...baseStyles,
					backgroundColor: "transparent",
					color: "#556cd6",
					border: "1px solid #556cd6",
				};
			case "text":
				return {
					...baseStyles,
					backgroundColor: "transparent",
					color: "#556cd6",
				};
			default:
				return {
					...baseStyles,
					backgroundColor: "#556cd6",
					color: "white",
				};
		}
	};

	const computedStyle: React.CSSProperties = {
		...getSizeStyles(),
		...getVariantStyles(),
		...style,
	};

	return (
		<button
			className={className}
			style={computedStyle}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
