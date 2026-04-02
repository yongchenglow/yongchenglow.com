import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/src/components/shared/ui/separator";
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
			<div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
					{/* Site name + tagline */}
					<div>
						<p className="font-semibold text-foreground">Yong Cheng Low</p>
						<p className="text-sm text-muted-foreground mt-1">
							Software Engineer &amp; Tech Writer
						</p>
					</div>

					{/* Quick links */}
					<div>
						<p className="font-semibold text-foreground mb-2">Quick Links</p>
						<ul className="space-y-1 text-sm">
							{[
								{ label: "Home", href: "/" },
								{ label: "Blog", href: "/blog" },
								{ label: "About", href: "/about" },
							].map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="text-muted-foreground hover:text-foreground transition-colors duration-200"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Social icons */}
					<div>
						<p className="font-semibold text-foreground mb-2">Connect</p>
						<TooltipProvider>
							<div className="flex gap-4 justify-center sm:justify-start">
								{socialLinks.map(({ href, label, icon: Icon }) => (
									<Tooltip key={label}>
										<TooltipTrigger asChild>
											<a
												href={href}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={label}
												className="text-muted-foreground hover:text-foreground transition-colors duration-200"
											>
												<Icon size={22} />
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
											className="text-muted-foreground hover:text-foreground transition-colors duration-200"
										>
											<Mail size={22} />
										</a>
									</TooltipTrigger>
									<TooltipContent>lowyongcheng@hotmail.com</TooltipContent>
								</Tooltip>
							</div>
						</TooltipProvider>
					</div>
				</div>

				<Separator className="my-6" />

				<p className="text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} Yong Cheng Low. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
