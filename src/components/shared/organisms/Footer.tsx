import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/shared/ui/tooltip";

const socialLinks = [
	{
		href: "https://www.linkedin.com/in/yong-cheng-low/",
		label: "LinkedIn",
		icon: Linkedin,
	},
	{
		href: "https://github.com/yongchenglow",
		label: "GitHub",
		icon: Github,
	},
	{
		href: "https://www.instagram.com/yclow88/",
		label: "Instagram",
		icon: Instagram,
	},
];

const Footer = () => {
	return (
		<footer className="mt-auto bg-card text-card-foreground border-t">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<TooltipProvider>
					<div className="flex items-center justify-center gap-6 mb-4">
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
										<Icon size={20} />
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
				</TooltipProvider>

				<p className="text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} Yong Cheng Low. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
