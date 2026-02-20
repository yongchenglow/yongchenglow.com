"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/shared/ui/button";
import SearchDialog from "./SearchDialog";

export default function SearchTrigger() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<Button
				variant="outline"
				size="sm"
				onClick={() => setOpen(true)}
				className="gap-2"
			>
				<Search className="h-4 w-4" />
				<span className="hidden sm:inline">Search</span>
				<kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>

			<SearchDialog open={open} onOpenChange={setOpen} />
		</>
	);
}
