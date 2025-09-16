import { ExternalLink as ExternalLinkIcon } from "lucide-react";

type ExternalLinkProps = {
	href: string;
	children: React.ReactNode;
	icon?: boolean;
};

export default function ExternalLink({
	href,
	children,
	icon = false,
}: ExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-blue-400/90 hover:text-blue-300/90 transition-colors duration-200 inline-flex items-center gap-1"
		>
			{children}
			{icon && <ExternalLinkIcon className="h-4 w-4" />}
		</a>
	);
}
