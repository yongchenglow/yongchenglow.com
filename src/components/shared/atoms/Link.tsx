import { ExternalLink as ExternalLinkIcon } from "lucide-react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	icon?: boolean;
};

export default function Link({
	href,
	children,
	icon = false,
	...props
}: LinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-blue-400/90 hover:text-blue-300/90 transition-colors duration-200 inline-flex items-center gap-1"
			{...props}
		>
			{children}
			{icon && <ExternalLinkIcon className="h-4 w-4" />}
		</a>
	);
}
