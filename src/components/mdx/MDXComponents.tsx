import type { MDXComponents } from "mdx/types";
import Admonition from "@/src/components/mdx/Admonition";
import PostCodeBlock from "@/src/components/post/PostCodeBlock";
import PostDefinition from "@/src/components/post/PostDefinition";
import PostImage from "@/src/components/post/PostImage";
import PostList from "@/src/components/post/PostList";
import PostParagraph from "@/src/components/post/PostParagraph";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/shared/ui/table";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Map HTML elements to custom components
		p: PostParagraph,
		ul: (props) => <PostList type="unordered" {...props} />,
		ol: (props) => <PostList type="ordered" {...props} />,
		img: PostImage,
		code: PostCodeBlock,

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

		// Allow overrides
		...components,
	};
}
