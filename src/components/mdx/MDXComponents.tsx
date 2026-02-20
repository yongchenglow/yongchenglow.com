import type { MDXComponents } from "mdx/types";
import ArticleCodeBlock from "@/src/components/article/ArticleCodeBlock";
import ArticleDefinition from "@/src/components/article/ArticleDefinition";
import ArticleImage from "@/src/components/article/ArticleImage";
import ArticleList from "@/src/components/article/ArticleList";
import ArticleParagraph from "@/src/components/article/ArticleParagraph";
import Admonition from "@/src/components/mdx/Admonition";
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
		p: ArticleParagraph,
		ul: (props) => <ArticleList type="unordered" {...props} />,
		ol: (props) => <ArticleList type="ordered" {...props} />,
		img: ArticleImage,
		code: ArticleCodeBlock,

		// Table components
		table: Table,
		thead: TableHeader,
		tbody: TableBody,
		tr: TableRow,
		th: TableHead,
		td: TableCell,

		// Custom components
		ArticleDefinition,
		ArticleCodeBlock,
		Admonition,

		// Allow overrides
		...components,
	};
}
