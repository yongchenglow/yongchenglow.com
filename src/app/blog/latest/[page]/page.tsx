import { notFound } from "next/navigation";
import { LatestPostsView } from "@/src/components/blog/LatestPostsView";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_CONFIG } from "@/src/config/blog";
import { BLOG_UI } from "@/src/config/blog-ui";
import { SITE_URL } from "@/src/config/site";
import { getAllBlogPosts, getPaginatedPosts } from "@/src/lib/blog";

interface LatestPageProps {
	params: Promise<{
		page: string;
	}>;
}

export const generateMetadata = async ({ params }: LatestPageProps) => {
	const { page } = await params;
	return {
		title: `${BLOG_UI.featured.pageHeading} - Page ${page}`,
		alternates: {
			canonical: `/blog/latest/${page}`,
		},
	};
};

export const generateStaticParams = async () => {
	const allPosts = getAllBlogPosts();
	const totalPages = Math.ceil(allPosts.length / BLOG_CONFIG.postsPerPage);

	return Array.from({ length: totalPages }, (_, i) => ({
		page: String(i + 1),
	}));
};

export const LatestPage = async ({ params }: LatestPageProps) => {
	const { page } = await params;
	const pageNumber = Number.parseInt(page, 10);

	// Validate page number
	if (Number.isNaN(pageNumber) || pageNumber < 1) {
		notFound();
	}

	const paginationResult = getPaginatedPosts(pageNumber);

	// If page is out of bounds, redirect would be handled by Next.js 404
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
								item: SITE_URL,
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Blog",
								item: `${SITE_URL}/blog`,
							},
							{
								"@type": "ListItem",
								position: 3,
								name: BLOG_UI.featured.pageHeading,
								item: `${SITE_URL}/blog/latest/1`,
							},
							...(pageNumber > 1
								? [
										{
											"@type": "ListItem",
											position: 4,
											name: `Page ${pageNumber}`,
											item: `${SITE_URL}/blog/latest/${pageNumber}`,
										},
									]
								: []),
						],
					}}
				/>
				<FadeIn>
					<PageTitle>{BLOG_UI.featured.pageHeading}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{BLOG_UI.pagination.showingText
							.replace("{current}", String(paginationResult.items.length))
							.replace("{total}", String(paginationResult.totalItems))}
						{paginationResult.totalPages > 1 &&
							` (Page ${paginationResult.currentPage} of ${paginationResult.totalPages})`}
					</PageSubtitle>
				</FadeIn>

				<LatestPostsView
					paginationResult={paginationResult}
					baseUrl="/blog/latest/"
				/>
			</div>
		</StandardLayout>
	);
};

export default LatestPage;
