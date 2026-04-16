"use client";

import { ArrowUp, Mail } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/shared/ui/tooltip";
import { SITE_AUTHOR, SITE_SOCIAL_LINKS } from "@/src/config/site";

const socialLinks = [
	{
		href: SITE_SOCIAL_LINKS.linkedin,
		label: "LinkedIn",
		icon: () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
				<rect width="4" height="12" x="2" y="9" />
				<circle cx="4" cy="4" r="2" />
			</svg>
		),
	},
	{
		href: SITE_SOCIAL_LINKS.github,
		label: "GitHub",
		icon: () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
				<path d="M9 18c-4.51 2-5-2-7-2" />
			</svg>
		),
	},
	{
		href: SITE_SOCIAL_LINKS.instagram,
		label: "Instagram",
		icon: () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
				<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
				<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
			</svg>
		),
	},
];

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
	return (
		<footer className="mt-auto bg-card text-card-foreground border-t border-border">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<TooltipProvider>
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						{/* Left: Social icons */}
						<div className="flex items-center gap-4">
							{socialLinks.map(({ href, label, icon: Icon }) => (
								<Tooltip key={label}>
									<TooltipTrigger asChild>
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={label}
											className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200"
										>
											<Icon />
										</a>
									</TooltipTrigger>
									<TooltipContent>{label}</TooltipContent>
								</Tooltip>
							))}
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href="mailto:lowyongcheng@hotmail.com"
										aria-label="Email"
										className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200"
									>
										<Mail size={20} />
									</a>
								</TooltipTrigger>
								<TooltipContent>lowyongcheng@hotmail.com</TooltipContent>
							</Tooltip>
						</div>

						{/* Center: Copyright */}
						<p className="text-xs text-muted-foreground">
							© {new Date().getFullYear()} {SITE_AUTHOR.name}. All rights
							reserved.
						</p>

						{/* Right: Back to top */}
						<button
							type="button"
							onClick={scrollToTop}
							className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group"
							aria-label="Back to top"
						>
							<span className="hidden sm:inline">Back to top</span>
							<ArrowUp
								size={16}
								className="group-hover:-translate-y-0.5 transition-transform duration-200"
							/>
						</button>
					</div>
				</TooltipProvider>
			</div>
		</footer>
	);
};

export default Footer;
