"use client";

import { ArrowUp, Mail } from "lucide-react";
import { siGithub, siInstagram } from "simple-icons";
import { LinkedInIcon } from "@/src/components/shared/atoms/LinkedInIcon";
import { SimpleIconSvg } from "@/src/components/shared/atoms/SimpleIconSvg";
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
		icon: () => <LinkedInIcon size={20} />,
	},
	{
		href: SITE_SOCIAL_LINKS.github,
		label: "GitHub",
		icon: () => <SimpleIconSvg icon={siGithub} />,
	},
	{
		href: SITE_SOCIAL_LINKS.instagram,
		label: "Instagram",
		icon: () => <SimpleIconSvg icon={siInstagram} />,
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
