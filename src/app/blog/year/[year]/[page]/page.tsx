import { notFound } from "next/navigation";
import { AnimatedGridItem } from "@/src/components/blog/AnimatedGridItem";
import { Pagination } from "@/src/components/blog/Pagination";
import { PostCard } from "@/src/components/post/PostCard";
import { PostGrid } from "@/src/components/post/PostGrid";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_CONFIG } from "@/src/config/blog";
import { BLOG_LABELS } from "@/src/config/blog-ui";
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

export const generateMetadata = async ({ params }: YearPageProps) => {
	const { year, page } = await params;
	return {
		title: `Posts from ${year} - Page ${page}`,
		alternates: {
			canonical: `/blog/year/${year}/${page}`,
		},
	};
};

export const generateStaticParams = async () => {
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
};

export const YearPageWithPagination = async ({ params }: YearPageProps) => {
	const { year, page } = await params;
	const yearNumber = Number.parseInt(year, 10);
	const pageNumber = Number.parseInt(page, 10);

	// Validate year and page
	if (Number.isNaN(yearNumber) || Number.isNaN(pageNumber) || pageNumber < 1) {
		notFound();
	}

	const paginationResult = getPaginatedPostsByYear(yearNumber, pageNumber);

	// If page is out of bounds, throw error
	if (paginationResult.items.length === 0 && pageNumber > 1) {
		notFound();
	}

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://www.yongchenglow.com",
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Blog",
								item: "https://www.yongchenglow.com/blog",
							},
							{
								"@type": "ListItem",
								position: 3,
								name: `Posts from ${year}`,
								item: `https://www.yongchenglow.com/blog/year/${year}/1`,
							},
							...(pageNumber > 1
								? [
										{
											"@type": "ListItem",
											position: 4,
											name: `Page ${pageNumber}`,
											item: `https://www.yongchenglow.com/blog/year/${year}/${pageNumber}`,
										},
									]
								: []),
						],
					}}
				/>
				<FadeIn>
					<PageTitle>Posts from {year}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{BLOG_LABELS.pagination.showingText
							.replace("{current}", String(paginationResult.items.length))
							.replace("{total}", String(paginationResult.totalItems))}{" "}
						published in {year}
						{paginationResult.totalPages > 1 &&
							` (Page ${paginationResult.currentPage} of ${paginationResult.totalPages})`}
					</PageSubtitle>
				</FadeIn>

				<PostGrid>
					{paginationResult.items.map((post, index) => (
						<AnimatedGridItem key={post.slug} index={index}>
							<PostCard
								title={post.frontmatter.title}
								description={post.frontmatter.description}
								href={`/blog/${post.slug}`}
								readingTime={post.readingTime}
								date={post.frontmatter.date}
								tags={post.frontmatter.tags}
							/>
						</AnimatedGridItem>
					))}
				</PostGrid>

				<Pagination
					currentPage={paginationResult.currentPage}
					totalPages={paginationResult.totalPages}
					baseUrl={`/blog/year/${year}/`}
				/>
			</div>
		</StandardLayout>
	);
};

export default YearPageWithPagination;
