"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/shared/ui/card";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export default function TableOfContents() {
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
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
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

	return (
		<Card className="mb-8 max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Table of Contents</CardTitle>
			</CardHeader>
			<CardContent>
				<nav className="text-left">
					<ul className="space-y-2">
						{headings.map((heading) => (
							<li
								key={heading.id}
								style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
							>
								<a
									href={`#${heading.id}`}
									className={`hover:text-primary transition-colors ${
										activeId === heading.id ? "text-primary font-semibold" : ""
									}`}
								>
									{heading.text}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</CardContent>
		</Card>
	);
}
