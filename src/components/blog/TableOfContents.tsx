"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/shared/ui/card";
import { ScrollArea } from "@/src/components/shared/ui/scroll-area";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	variant?: "inline" | "sidebar";
}

export const TableOfContents = ({
	variant = "inline",
}: TableOfContentsProps) => {
	const [headings, setHeadings] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		// Extract all h2 and h3 headings from the page
		const elements = document.querySelectorAll("article h2, article h3");
		const items: TocItem[] = Array.from(elements).map((elem) => ({
			id: elem.id,
			text: elem.textContent || "",
			level: Number.parseInt(elem.tagName.substring(1), 10),
		}));
		setHeadings(items);

		// Intersection Observer for active heading
		const observer = new IntersectionObserver(
			(entries) => {
				const intersectingEntries = entries.filter(
					(entry) => entry.isIntersecting,
				);
				if (intersectingEntries.length > 0) {
					// Sort by position (top of viewport) and pick the topmost
					const topmost = intersectingEntries.reduce((prev, current) =>
						current.boundingClientRect.top < prev.boundingClientRect.top
							? current
							: prev,
					);
					setActiveId(topmost.target.id);
				}
			},
			{ rootMargin: "-100px 0px -80% 0px" },
		);

		for (const elem of elements) {
			observer.observe(elem);
		}
		return () => observer.disconnect();
	}, []);

	if (headings.length === 0) return null;

	const navContent = (
		<nav className="text-left">
			<ul className="space-y-2">
				{headings.map((heading) => (
					<li
						key={heading.id}
						style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
					>
						<a
							href={`#${heading.id}`}
							className={
								variant === "sidebar"
									? `block text-sm transition-colors border-l-2 pl-3 py-0.5 ${
											activeId === heading.id
												? "text-primary font-semibold pl-3"
												: "text-muted-foreground hover:text-foreground pl-3"
										}`
									: `hover:text-primary transition-colors ${
											activeId === heading.id
												? "text-primary font-semibold"
												: ""
										}`
							}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);

	if (variant === "sidebar") {
		return (
			<ScrollArea className="max-h-[calc(100vh-8rem)]">
				<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
					On this page
				</p>
				{navContent}
			</ScrollArea>
		);
	}

	return (
		<Card className="mb-8 max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Table of Contents</CardTitle>
			</CardHeader>
			<CardContent>{navContent}</CardContent>
		</Card>
	);
};
