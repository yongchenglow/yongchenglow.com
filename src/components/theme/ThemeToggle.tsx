"use client";

import { Switch } from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div className="h-8 w-16 rounded-full border bg-muted" />;
	}

	const isDark = resolvedTheme === "dark";

	const toggle = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Switch
			checked={isDark}
			onCheckedChange={toggle}
			aria-label="Toggle theme"
			className={cn(
				"relative flex h-8 w-14 cursor-pointer items-center rounded-full border bg-muted p-1",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			)}
			data-slot="switch"
		>
			<Sun
				data-testid="sun-icon"
				className={cn(
					"absolute z-10 h-4 w-4 transition-opacity",
					"left-2",
					isDark ? "opacity-40" : "opacity-100",
				)}
			/>
			<Moon
				data-testid="moon-icon"
				className={cn(
					"absolute z-10 h-4 w-4 transition-opacity",
					"left-8",
					isDark ? "opacity-100" : "opacity-40",
				)}
			/>
			<div
				className={cn(
					"absolute z-0 h-6 w-6 rounded-full bg-background shadow-sm transition-transform duration-200",
					isDark ? "translate-x-6" : "translate-x-0",
				)}
			/>
		</Switch>
	);
};
