import type React from "react";

interface StyledTableCellProps {
	children: React.ReactNode;
	className?: string;
	isHeader?: boolean;
	align?: "left" | "center" | "right" | "justify";
	component?: string; // Temporary prop for MUI migration compatibility
	scope?: string; // HTML scope attribute
}

const StyledTableCell: React.FC<StyledTableCellProps> = ({
	children,
	className = "",
	isHeader = false,
	align = "left",
	component,
	scope,
}) => {
	const baseClasses = "px-4 py-2 border-b border-gray-200";
	const headerClasses = "bg-black text-white text-xl font-medium";
	const bodyClasses = "text-lg";
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
		justify: "text-justify",
	};

	const cellClasses = `${baseClasses} ${isHeader ? headerClasses : bodyClasses} ${alignClasses[align]} ${className}`;

	// Use component prop if provided, otherwise default based on isHeader or "td"
	const Component = component === "th" ? "th" : isHeader ? "th" : "td";

	const props: React.HTMLAttributes<HTMLTableCellElement> & { scope?: string } =
		{ className: cellClasses };
	if (scope) props.scope = scope;

	return <Component {...props}>{children}</Component>;
};

interface StyledTableRowProps {
	children: React.ReactNode;
	className?: string;
	isOdd?: boolean;
	key?: string; // Allow key prop
}

const StyledTableRow: React.FC<StyledTableRowProps> = ({
	children,
	className = "",
	isOdd = false,
	...props
}) => {
	const baseClasses = "transition-colors duration-150";
	const hoverClasses = "hover:bg-gray-50";
	const stripeClasses = isOdd ? "bg-gray-50" : "bg-white";

	const rowClasses = `${baseClasses} ${hoverClasses} ${stripeClasses} ${className}`;

	return (
		<tr className={rowClasses} {...props}>
			{children}
		</tr>
	);
};

// MUI-compatible components for migration
interface PaperProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const Paper: React.FC<PaperProps> = ({
	children,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		borderRadius: "4px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		...style,
	};

	return (
		<div className={className} style={computedStyle} {...props}>
			{children}
		</div>
	);
};

interface TableContainerProps {
	children: React.ReactNode;
	component?: React.ElementType;
	className?: string;
	style?: React.CSSProperties;
}

export const TableContainer: React.FC<TableContainerProps> = ({
	children,
	component: Component = "div",
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		overflow: "auto",
		...style,
	};

	return (
		<Component className={className} style={computedStyle} {...props}>
			{children}
		</Component>
	);
};

interface TableProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	sx?: {
		minWidth?: number;
		[key: string]: string | number | undefined;
	};
}

export const Table: React.FC<TableProps> = ({
	children,
	className = "",
	style,
	sx,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		width: "100%",
		borderCollapse: "collapse",
		...style,
		...(sx?.minWidth && { minWidth: `${sx.minWidth}px` }),
	};

	return (
		<table className={className} style={computedStyle} {...props}>
			{children}
		</table>
	);
};

interface TableHeadProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const TableHead: React.FC<TableHeadProps> = ({
	children,
	className = "",
	style,
	...props
}) => {
	return (
		<thead className={className} style={style} {...props}>
			{children}
		</thead>
	);
};

interface TableBodyProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const TableBody: React.FC<TableBodyProps> = ({
	children,
	className = "",
	style,
	...props
}) => {
	return (
		<tbody className={className} style={style} {...props}>
			{children}
		</tbody>
	);
};

interface TableRowProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const TableRow: React.FC<TableRowProps> = ({
	children,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		borderBottom: "1px solid #e0e0e0",
		...style,
	};

	return (
		<tr className={className} style={computedStyle} {...props}>
			{children}
		</tr>
	);
};

interface TableCellProps {
	children: React.ReactNode;
	component?: "td" | "th";
	className?: string;
	style?: React.CSSProperties;
}

export const TableCell: React.FC<TableCellProps> = ({
	children,
	component: Component = "td",
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		padding: "16px",
		textAlign: "left",
		...style,
	};

	return (
		<Component className={className} style={computedStyle} {...props}>
			{children}
		</Component>
	);
};

export { StyledTableCell, StyledTableRow };
