import Link from "next/link";
import { ThemeToggle } from "@/src/components/theme-toggle";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";

const pages = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "/blog" },
];

const ResponsiveAppBar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{pages.map((page) => (
					<NavigationMenuItem key={page.name}>
						<NavigationMenuLink
							asChild
							className={navigationMenuTriggerStyle()}
						>
							<Link
								href={page.href}
								className="text-white hover:text-gray-200 transition-colors duration-200"
							>
								{page.name}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
				<div className="ml-4">
					<ThemeToggle />
				</div>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
export default ResponsiveAppBar;
