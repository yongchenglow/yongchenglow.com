import type { MDXComponents } from "mdx/types";
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

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
	return {
		// Map HTML elements to custom components
		p: PostParagraph,
		ul: (props) => <PostList type="unordered" {...props} />,
		ol: (props) => <PostList type="ordered" {...props} />,
		img: PostImage,
		code: (props) => {
			if (
				props?.className?.includes("language-mermaid") ||
				props?.className?.includes("mermaid")
			) {
				return <MermaidDiagram>{props.children}</MermaidDiagram>;
			}
			return <PostCodeBlock {...props} />;
		},

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

		// Pre blocks - delegate to code handler (which detects mermaid)
		pre: (props) => <>{props.children}</>,

		// Allow overrides
		...components,
	};
};
