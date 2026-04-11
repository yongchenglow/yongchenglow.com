import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type InternalLinkProps = ComponentProps<typeof Link>;

export const InternalLink = ({
	className,
	children,
	...props
}: InternalLinkProps) => {
	return (
		<Link
			className={cn(
				"cursor-pointer text-blue-400/90 hover:text-blue-300/90 transition-colors duration-200",
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	);
};
