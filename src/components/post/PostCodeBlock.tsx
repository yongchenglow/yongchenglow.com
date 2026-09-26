"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	atomOneDark,
	atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { cn } from "@/src/lib/utils";

interface PostCodeBlockProps {
	children: string;
	language?: string;
	className?: string;
}

export const PostCodeBlock = ({
	children,
	language = "bash",
	className = "",
}: PostCodeBlockProps) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// The wrapper is the only scroll container, so keyboard users can focus it
	// and scroll long lines with the arrow keys.
	const scrollRegionProps = {
		className: cn("mb-7 w-full overflow-x-auto", className),
		role: "region",
		"aria-label": `${language} code`,
		tabIndex: 0,
	};

	if (!mounted) {
		return (
			<div {...scrollRegionProps}>
				<div className="bg-muted p-8 text-left">
					<pre>{children.trim()}</pre>
				</div>
			</div>
		);
	}

	return (
		<div {...scrollRegionProps}>
			<SyntaxHighlighter
				language={language}
				style={theme === "dark" ? atomOneDark : atomOneLight}
				customStyle={{
					textAlign: "left",
					padding: "1rem 2rem",
					margin: 0,
					overflow: "visible",
				}}
			>
				{children.trim()}
			</SyntaxHighlighter>
		</div>
	);
};
