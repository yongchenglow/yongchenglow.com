"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	atomOneDark,
	atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

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

	if (!mounted) {
		return (
			<div className={`text-center mb-7 ${className}`.trim()}>
				<div className="inline-block bg-muted p-8 text-left">
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
};
