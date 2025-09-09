import {
	type ElementType,
	forwardRef,
	type HTMLAttributes,
	type TdHTMLAttributes,
	type ThHTMLAttributes,
} from "react";

import { cn } from "@/src/lib/utils";

const Table = forwardRef<
	HTMLTableElement,
	HTMLAttributes<HTMLTableElement> & { sx?: { minWidth?: number } }
>(({ className, sx, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cn("w-full caption-bottom text-sm", className)}
			style={{
				...(sx?.minWidth && { minWidth: `${sx.minWidth}px` }),
			}}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

const TableHeader = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0", className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className,
		)}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className,
		)}
		{...props}
	/>
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
	HTMLTableCellElement,
	ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			"h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";

// MUI-compatible components
const TableContainer = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & { component?: ElementType }
>(({ className, component, children, ...props }, ref) => {
	const Comp = component || "div";
	return (
		<Comp
			ref={ref}
			className={cn("relative w-full overflow-auto", className)}
			{...props}
		>
			{children}
		</Comp>
	);
});
TableContainer.displayName = "TableContainer";

const Paper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		/>
	),
);
Paper.displayName = "Paper";

const StyledTableCell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement> & {
		component?: "th" | "td";
		align?: "left" | "center" | "right";
	}
>(({ className, component = "td", align = "left", ...props }, ref) => {
	const Comp = component as keyof JSX.IntrinsicElements;
	return (
		<Comp
			ref={ref}
			className={cn(
				"border-b px-4 py-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 bg-muted/50 font-bold",
				align === "center" && "text-center",
				align === "right" && "text-right",
				className,
			)}
			{...props}
		/>
	);
});
StyledTableCell.displayName = "StyledTableCell";

const StyledTableRow = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className,
		)}
		{...props}
	/>
));
StyledTableRow.displayName = "StyledTableRow";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	TableContainer,
	Paper,
	StyledTableCell,
	StyledTableRow,
};
