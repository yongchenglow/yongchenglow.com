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
		<Link className={cn("cursor-pointer", className)} {...props}>
			{children}
		</Link>
	);
};
