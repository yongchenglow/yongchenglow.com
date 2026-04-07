import type { ReactNode } from "react";

interface PageSubtitleProps {
	children: ReactNode;
	className?: string;
}

export const PageSubtitle = ({
	children,
	className = "",
}: PageSubtitleProps) => {
	return (
		<h2
			className={`text-muted-foreground text-center mb-4 ${className}`.trim()}
		>
			{children}
		</h2>
	);
};
