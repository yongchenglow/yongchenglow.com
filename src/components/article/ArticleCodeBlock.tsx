"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	atomOneDark,
	atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface ArticleCodeBlockProps {
	children: string;
	language?: string;
	className?: string;
}

export default function ArticleCodeBlock({
	children,
	language = "bash",
	className = "",
}: ArticleCodeBlockProps) {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className={`text-center mb-7 ${className}`.trim()}>
				<div className="inline-block bg-gray-100 dark:bg-gray-800 p-8 text-left">
					<pre>{children.trim()}</pre>
				</div>
			</div>
		);
	}

	return (
		<div className={`text-center mb-7 ${className}`.trim()}>
			<SyntaxHighlighter
				language={language}
				style={theme === "dark" ? atomOneDark : atomOneLight}
				customStyle={{
					textAlign: "left",
					display: "inline-block",
					padding: "0 2rem",
				}}
			>
				{children.trim()}
			</SyntaxHighlighter>
		</div>
	);
}
