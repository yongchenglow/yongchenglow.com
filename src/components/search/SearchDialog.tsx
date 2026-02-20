"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/src/components/shared/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/src/components/shared/ui/dialog";
import { Input } from "@/src/components/shared/ui/input";
import { useSearch } from "@/src/hooks/useSearch";

interface SearchDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({
	open,
	onOpenChange,
}: SearchDialogProps) {
	const [query, setQuery] = useState("");
	const { search, results, isLoading, clearResults, initializeIndex } =
		useSearch();
	const router = useRouter();

	useEffect(() => {
		if (open) {
			initializeIndex();
		}
	}, [open, initializeIndex]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (query.trim()) {
				search(query);
			} else {
				clearResults();
			}
		}, 200);

		return () => clearTimeout(timeoutId);
	}, [query, search, clearResults]);

	const handleSelect = useCallback(
		(url: string) => {
			onOpenChange(false);
			setQuery("");
			clearResults();
			router.push(url);
		},
		[onOpenChange, clearResults, router],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				onOpenChange(false);
			}
		},
		[onOpenChange],
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Search className="h-5 w-5" />
						Search Blog Posts
					</DialogTitle>
				</DialogHeader>

				<div className="relative">
					<Input
						type="text"
						placeholder="Search for posts, topics, or tags..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						className="w-full"
						autoFocus
					/>
					{isLoading && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						</div>
					)}
				</div>

				<div className="max-h-96 overflow-y-auto">
					{results.length > 0 ? (
						<div className="space-y-2">
							{results.map((result) => (
								<button
									key={result.id}
									type="button"
									onClick={() => handleSelect(result.url)}
									className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors group"
								>
									<div className="flex items-start justify-between gap-2">
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold truncate group-hover:text-primary">
												{result.title}
											</h3>
											{result.subtitle && (
												<p className="text-sm text-muted-foreground truncate">
													{result.subtitle}
												</p>
											)}
											<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
												{result.description}
											</p>
											{result.tags && result.tags.length > 0 && (
												<div className="flex flex-wrap gap-1 mt-2">
													{result.tags.map((tag) => (
														<Badge
															key={tag}
															variant="secondary"
															className="text-xs"
														>
															{tag}
														</Badge>
													))}
												</div>
											)}
										</div>
										<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1" />
									</div>
								</button>
							))}
						</div>
					) : query.trim() && !isLoading ? (
						<div className="text-center py-8 text-muted-foreground">
							<p>No results found for "{query}"</p>
							<p className="text-sm mt-2">
								Try different keywords or check spelling
							</p>
						</div>
					) : !query.trim() ? (
						<div className="text-center py-8 text-muted-foreground">
							<Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
							<p>Start typing to search blog posts</p>
						</div>
					) : null}
				</div>

				<div className="text-xs text-muted-foreground border-t pt-3">
					<p>💡 Tip: Search by title, description, content, or tags</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
