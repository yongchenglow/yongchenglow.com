import Link from "next/link";
import type { ComponentProps } from "react";

type InternalLinkProps = ComponentProps<typeof Link>;

export default function InternalLink({
	className,
	children,
	...props
}: InternalLinkProps) {
	return (
		<Link className={className} {...props}>
			{children}
		</Link>
	);
}
