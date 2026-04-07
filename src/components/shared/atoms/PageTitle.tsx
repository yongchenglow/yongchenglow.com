import type { ReactNode } from "react";

interface PageTitleProps {
	children: ReactNode;
	className?: string;
}

export const PageTitle = ({ children, className = "" }: PageTitleProps) => {
	return (
		<h1 className={`text-5xl font-bold my-3 ${className}`.trim()}>
			{children}
		</h1>
	);
};
