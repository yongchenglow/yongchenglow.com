interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
}

export default function ExternalLink({ href, children }: ExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
		>
			{children}
		</a>
	);
}
