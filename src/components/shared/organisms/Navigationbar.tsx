"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchTrigger from "@/src/components/search/SearchTrigger";
import Container from "@/src/components/shared/atoms/Container";
import InternalLink from "@/src/components/shared/atoms/InternalLink";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/src/components/shared/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/src/components/shared/ui/sheet";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { cn } from "@/src/lib/utils";

const pages = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "/blog" },
];

const NavigationBar = () => {
	const pathname = usePathname();
	const [sheetOpen, setSheetOpen] = useState(false);

	const isActive = (href: string) => {
		if (!pathname) {
			return false;
		}
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-navbar backdrop-blur-xl">
			<Container className="py-3 flex items-center justify-between">
				{/* Desktop nav */}
				<NavigationMenu className="hidden sm:flex">
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

				{/* Mobile hamburger */}
				<div className="sm:hidden">
					<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
						<SheetTrigger asChild>
							<button
								type="button"
								aria-label="Open navigation menu"
								className="cursor-pointer p-2 rounded-md hover:bg-accent transition-colors"
							>
								<Menu className="h-5 w-5" />
							</button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64">
							<SheetHeader>
								<SheetTitle>Navigation</SheetTitle>
							</SheetHeader>
							<nav className="mt-6 flex flex-col gap-2">
								{pages.map((page) => (
									<InternalLink
										key={page.name}
										href={page.href}
										onClick={() => setSheetOpen(false)}
										className={cn(
											"px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
											isActive(page.href)
												? "bg-accent text-accent-foreground"
												: "text-foreground",
										)}
									>
										{page.name}
									</InternalLink>
								))}
								<div className="mt-4 flex flex-col gap-3 pt-4">
									<SearchTrigger />
									<ThemeToggle />
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden sm:flex items-center gap-3">
						<SearchTrigger />
						<ThemeToggle />
					</div>
				</div>
			</Container>
		</header>
	);
};
export default NavigationBar;
