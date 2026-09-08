import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import { Admonition } from "@/src/components/mdx/Admonition";
import { MermaidDiagram } from "@/src/components/mdx/MermaidDiagram";
import { PostCodeBlock } from "@/src/components/post/PostCodeBlock";
import { PostDefinition } from "@/src/components/post/PostDefinition";
import { PostImage } from "@/src/components/post/PostImage";
import { PostList } from "@/src/components/post/PostList";
import { PostParagraph } from "@/src/components/post/PostParagraph";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/shared/ui/table";

interface CodeElementProps {
	children?: ReactNode;
	className?: string;
}

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
	return {
		// Map HTML elements to custom components
		p: PostParagraph,
		ul: (props) => <PostList type="unordered" {...props} />,
		ol: (props) => <PostList type="ordered" {...props} />,
		img: PostImage,
		code: (props) => <code {...props} />,

		// Table components
		table: Table,
		thead: TableHeader,
		tbody: TableBody,
		tr: TableRow,
		th: TableHead,
		td: TableCell,

		// Custom components
		PostDefinition,
		PostCodeBlock,
		Admonition,
		MermaidDiagram,

		// MDX wraps fenced code in pre > code. Handle the block at the pre level so
		// inline code remains phrasing content and can safely appear in paragraphs.
		pre: ({ children, ...props }) => {
			const child =
				Children.count(children) === 1 ? Children.only(children) : null;

			if (isValidElement<CodeElementProps>(child)) {
				const { children: code, className = "" } = child.props;

				if (
					className.includes("language-mermaid") ||
					className.includes("mermaid")
				) {
					return <MermaidDiagram>{String(code ?? "")}</MermaidDiagram>;
				}

				return (
					<PostCodeBlock
						language={className.replace(/^language-/, "") || "text"}
					>
						{String(code ?? "")}
					</PostCodeBlock>
				);
			}

			return <pre {...props}>{children}</pre>;
		},

		// Allow overrides
		...components,
	};
};
