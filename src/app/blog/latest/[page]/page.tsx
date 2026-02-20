import LatestPostsView from "@/src/components/blog/LatestPostsView";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_CONFIG } from "@/src/config/blog";
import { getAllBlogPosts, getPaginatedPosts } from "@/src/lib/blog";

interface LatestPageProps {
	params: Promise<{
		page: string;
	}>;
}

export async function generateStaticParams() {
	const allPosts = getAllBlogPosts();
	const totalPages = Math.ceil(allPosts.length / BLOG_CONFIG.postsPerPage);

	return Array.from({ length: totalPages }, (_, i) => ({
		page: String(i + 1),
	}));
}

export default async function LatestPage({ params }: LatestPageProps) {
	const { page } = await params;
	const pageNumber = Number.parseInt(page, 10);

	// Validate page number
	if (Number.isNaN(pageNumber) || pageNumber < 1) {
		throw new Error("Invalid page number");
	}

	const paginationResult = getPaginatedPosts(pageNumber);

	// If page is out of bounds, redirect would be handled by Next.js 404
	if (paginationResult.items.length === 0 && pageNumber > 1) {
		throw new Error("Page not found");
	}

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<PageTitle>Latest Posts</PageTitle>
				<PageSubtitle>
					Showing {paginationResult.items.length} of{" "}
					{paginationResult.totalItems} articles
					{paginationResult.totalPages > 1 &&
						` (Page ${paginationResult.currentPage} of ${paginationResult.totalPages})`}
				</PageSubtitle>

				<LatestPostsView
					paginationResult={paginationResult}
					baseUrl="/blog/latest/"
				/>
			</div>
		</StandardLayout>
	);
}
