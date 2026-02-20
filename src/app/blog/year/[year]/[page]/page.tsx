import ArticleCard from "@/src/components/article/ArticleCard";
import ArticleGrid from "@/src/components/article/ArticleGrid";
import Pagination from "@/src/components/blog/Pagination";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_CONFIG } from "@/src/config/blog";
import {
	getAllPostYears,
	getBlogPostsByYear,
	getPaginatedPostsByYear,
} from "@/src/lib/blog";

interface YearPageProps {
	params: Promise<{
		year: string;
		page: string;
	}>;
}

export async function generateStaticParams() {
	const years = getAllPostYears();
	const params: { year: string; page: string }[] = [];

	for (const year of years) {
		const posts = getBlogPostsByYear(year);
		const totalPages = Math.ceil(posts.length / BLOG_CONFIG.postsPerPage);

		// Generate params for each page
		for (let i = 1; i <= totalPages; i++) {
			params.push({
				year: String(year),
				page: String(i),
			});
		}
	}

	return params;
}

export default async function YearPageWithPagination({
	params,
}: YearPageProps) {
	const { year, page } = await params;
	const yearNumber = Number.parseInt(year, 10);
	const pageNumber = Number.parseInt(page, 10);

	// Validate year and page
	if (Number.isNaN(yearNumber) || Number.isNaN(pageNumber) || pageNumber < 1) {
		throw new Error("Invalid year or page number");
	}

	const paginationResult = getPaginatedPostsByYear(yearNumber, pageNumber);

	// If page is out of bounds, throw error
	if (paginationResult.items.length === 0 && pageNumber > 1) {
		throw new Error("Page not found");
	}

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<PageTitle>Posts from {year}</PageTitle>
				<PageSubtitle>
					Showing {paginationResult.items.length} of{" "}
					{paginationResult.totalItems} articles published in {year}
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
					baseUrl={`/blog/year/${year}/`}
				/>
			</div>
		</StandardLayout>
	);
}
