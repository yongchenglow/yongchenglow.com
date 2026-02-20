import Link from "next/link";
import { Button } from "@/src/components/shared/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	baseUrl: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	baseUrl,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const getPageNumbers = (): (number | string)[] => {
		const pages: (number | string)[] = [];
		const showEllipsis = totalPages > 7;

		if (!showEllipsis) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
			return pages;
		}

		// Always show first page
		pages.push(1);

		// Calculate range around current page
		let rangeStart = Math.max(2, currentPage - 1);
		let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

		// Adjust range if near start
		if (currentPage <= 3) {
			rangeEnd = 5;
		}

		// Adjust range if near end
		if (currentPage >= totalPages - 2) {
			rangeStart = totalPages - 4;
		}

		// Add ellipsis before range if needed
		if (rangeStart > 2) {
			pages.push("start-ellipsis");
		}

		// Add range
		for (let i = rangeStart; i <= rangeEnd; i++) {
			pages.push(i);
		}

		// Add ellipsis after range if needed
		if (rangeEnd < totalPages - 1) {
			pages.push("end-ellipsis");
		}

		// Always show last page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav
			className="flex items-center justify-center gap-2 my-8"
			aria-label="Pagination"
		>
			{/* Previous Button */}
			{currentPage > 1 ? (
				<Button variant="outline" size="sm" asChild>
					<Link href={`${baseUrl}${currentPage - 1}`}>Previous</Link>
				</Button>
			) : (
				<Button variant="outline" size="sm" disabled>
					Previous
				</Button>
			)}

			{/* Page Numbers */}
			<div className="flex gap-1">
				{pageNumbers.map((page) => {
					if (page === "start-ellipsis" || page === "end-ellipsis") {
						return (
							<span key={page} className="px-3 py-1 text-sm">
								...
							</span>
						);
					}

					const pageNum = page as number;
					const isActive = pageNum === currentPage;

					return (
						<Button
							key={pageNum}
							variant={isActive ? "default" : "outline"}
							size="sm"
							asChild={!isActive}
							disabled={isActive}
						>
							{isActive ? (
								<span>{pageNum}</span>
							) : (
								<Link href={`${baseUrl}${pageNum}`}>{pageNum}</Link>
							)}
						</Button>
					);
				})}
			</div>

			{/* Next Button */}
			{currentPage < totalPages ? (
				<Button variant="outline" size="sm" asChild>
					<Link href={`${baseUrl}${currentPage + 1}`}>Next</Link>
				</Button>
			) : (
				<Button variant="outline" size="sm" disabled>
					Next
				</Button>
			)}
		</nav>
	);
}
