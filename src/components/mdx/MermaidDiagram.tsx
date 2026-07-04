"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";

interface MermaidDiagramProps {
	children: string;
	className?: string;
}

export const MermaidDiagram = ({
	children,
	className = "",
}: MermaidDiagramProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		let mounted = true;

		const renderDiagram = async () => {
			if (!containerRef.current) return;

			try {
				const mermaid = (await import("mermaid")).default;
				mermaid.initialize({
					startOnLoad: false,
					theme: resolvedTheme === "dark" ? "dark" : "default",
					securityLevel: "loose",
					fontFamily: "inherit",
				});

				const id = `mermaid-${Math.round(Math.random() * 1e7)}`;
				const { svg } = await mermaid.render(id, children.trim());

				if (mounted && containerRef.current) {
					containerRef.current.innerHTML = svg;
					setIsLoading(false);
				}
			} catch (err) {
				if (mounted && containerRef.current) {
					const message = err instanceof Error ? err.message : String(err);
					containerRef.current.innerHTML = `<pre class="text-destructive whitespace-pre-wrap">${message}</pre>`;
					setIsLoading(false);
				}
			}
		};

		renderDiagram();

		return () => {
			mounted = false;
		};
	}, [children, resolvedTheme]);

	return (
		<div
			className={cn(
				"docusaurus-mermaid-container mb-7 flex justify-center",
				className,
			)}
		>
			{isLoading && (
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
			)}
			<div
				ref={containerRef}
				className={cn(
					"max-w-full [&>svg]:max-w-full [&>svg]:h-auto",
					isLoading && "hidden",
				)}
			/>
		</div>
	);
};
