"use client";

import { Search } from "lucide-react";
import { Button } from "@/src/components/shared/ui/button";

// Global event emitter for search dialog
let globalOpenSearch: (() => void) | null = null;

export const setOpenSearchHandler = (handler: () => void) => {
	globalOpenSearch = handler;
	return () => {
		globalOpenSearch = null;
	};
};

export const SearchTrigger = () => {
	const handleClick = () => {
		globalOpenSearch?.();
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleClick}
			aria-label="Search"
			className="gap-2"
		>
			<Search className="h-4 w-4" />
			<span className="hidden sm:inline">Search</span>
			<kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
				<span className="text-xs">⌘</span>K
			</kbd>
		</Button>
	);
};
