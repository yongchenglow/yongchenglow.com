import type { ReactNode } from "react";

interface PostDefinitionProps {
	children: ReactNode;
	className?: string;
}

export const PostDefinition = ({
	children,
	className = "",
}: PostDefinitionProps) => {
	return (
		<div className={`my-3 max-w-sm mx-auto ${className}`.trim()}>
			<div className="text-center mb-2 italic">{children}</div>
		</div>
	);
};
