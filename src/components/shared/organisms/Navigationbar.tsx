import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/src/components/shared/ui/navigation-menu";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { cn } from "@/src/lib/utils";

const pages = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "/blog" },
];

const NavigationBar = () => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				<NavigationMenu>
					<NavigationMenuList>
						{pages.map((page) => (
							<NavigationMenuItem key={page.name}>
								<NavigationMenuLink
									asChild
									className={cn(
										navigationMenuTriggerStyle(),
										isActive(page.href) && "bg-accent text-accent-foreground",
									)}
								>
									<Link href={page.href}>{page.name}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
				<ThemeToggle />
			</div>
		</header>
	);
};
export default NavigationBar;
