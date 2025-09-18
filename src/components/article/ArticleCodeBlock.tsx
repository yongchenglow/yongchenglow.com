import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";

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
	return (
		<div className={`text-center mb-7 ${className}`.trim()}>
			<SyntaxHighlighter
				language={language}
				style={docco}
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
