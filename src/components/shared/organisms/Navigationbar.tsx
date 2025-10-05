import { usePathname } from "next/navigation";
import Container from "@/src/components/shared/atoms/Container";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
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
		<header className="fixed top-0 left-0 right-0 z-50 bg-navbar border-b">
			<Container className="py-3 flex items-center justify-between">
				<NavigationMenu>
					<NavigationMenuList className="gap-3">
						{pages.map((page) => (
							<NavigationMenuItem key={page.name}>
								<NavigationMenuLink
									asChild
									className={cn(
										navigationMenuTriggerStyle(),
										isActive(page.href) && "bg-accent text-accent-foreground",
									)}
								>
									<InternalLink href={page.href}>{page.name}</InternalLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
				<ThemeToggle />
			</Container>
		</header>
	);
};
export default NavigationBar;
