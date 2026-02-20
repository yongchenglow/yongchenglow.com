import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
import Pagination from "@/src/components/blog/Pagination";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_CONFIG } from "@/src/config/blog";
import {
	getAllCategories,
	getBlogPostsByCategory,
	getCategoryMetadata,
	getPaginatedPostsByCategory,
} from "@/src/lib/blog";

interface CategoryPageProps {
	params: Promise<{
		category: string;
		page: string;
	}>;
}

export async function generateStaticParams() {
	const categories = getAllCategories();
	const params: { category: string; page: string }[] = [];

	for (const category of categories) {
		const posts = getBlogPostsByCategory(category.slug);
		const totalPages = Math.ceil(posts.length / BLOG_CONFIG.postsPerPage);

		// Generate params for each page
		for (let i = 1; i <= totalPages; i++) {
			params.push({
				category: category.slug,
				page: String(i),
			});
		}
	}

	return params;
}

export default async function CategoryPageWithPagination({
	params,
}: CategoryPageProps) {
	const { category, page } = await params;
	const pageNumber = Number.parseInt(page, 10);

	// Validate page number
	if (Number.isNaN(pageNumber) || pageNumber < 1) {
		throw new Error("Invalid page number");
	}

	const categoryMetadata = getCategoryMetadata(category);

	if (!categoryMetadata) {
		throw new Error("Invalid category");
	}

	const paginationResult = getPaginatedPostsByCategory(category, pageNumber);

	// If page is out of bounds, throw error
	if (paginationResult.items.length === 0 && pageNumber > 1) {
		throw new Error("Page not found");
	}

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<PageTitle>{categoryMetadata.label}</PageTitle>
				<PageSubtitle>
					{categoryMetadata.description}
					<br />
					Showing {paginationResult.items.length} of{" "}
					{paginationResult.totalItems} articles
					{paginationResult.totalPages > 1 &&
						` (Page ${paginationResult.currentPage} of ${paginationResult.totalPages})`}
				</PageSubtitle>

				<ArticleGrid>
					{paginationResult.items.map((post) => (
						<div
							key={post.slug}
							className="w-full md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
						>
							<ArticleCard
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
						</div>
					))}
				</ArticleGrid>

				<Pagination
					currentPage={paginationResult.currentPage}
					totalPages={paginationResult.totalPages}
					baseUrl={`/blog/category/${category}/`}
				/>
			</div>
		</StandardLayout>
	);
}
