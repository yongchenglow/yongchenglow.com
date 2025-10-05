import type { ReactNode } from "react";

interface PageSubtitleProps {
	children: ReactNode;
	className?: string;
}

export default function PageSubtitle({
	children,
	className = "",
}: PageSubtitleProps) {
	return (
		<h2 className={`text-gray-600 text-center mb-4 ${className}`.trim()}>
			{children}
		</h2>
	);
}
