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

export const generateMetadata = async ({ params }: CategoryPageProps) => {
	const { category, page } = await params;
	const categoryMetadata = getCategoryMetadata(category);
	const label = categoryMetadata?.label ?? category;
	return {
		title: `${label} - Page ${page}`,
		alternates: {
			canonical: `/blog/category/${category}/${page}`,
		},
	};
};

export const generateStaticParams = async () => {
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
};

export const CategoryPageWithPagination = async ({
	params,
}: CategoryPageProps) => {
	const { category, page } = await params;
	const pageNumber = Number.parseInt(page, 10);

	// Validate page number
	if (Number.isNaN(pageNumber) || pageNumber < 1) {
		notFound();
	}

	const categoryMetadata = getCategoryMetadata(category);

	if (!categoryMetadata) {
		notFound();
	}

	const paginationResult = getPaginatedPostsByCategory(category, pageNumber);

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
								name: categoryMetadata.label,
								item: `https://www.yongchenglow.com/blog/category/${category}/1`,
							},
							...(pageNumber > 1
								? [
										{
											"@type": "ListItem",
											position: 4,
											name: `Page ${pageNumber}`,
											item: `https://www.yongchenglow.com/blog/category/${category}/${pageNumber}`,
										},
									]
								: []),
						],
					}}
				/>
				<FadeIn>
					<PageTitle>{categoryMetadata.label}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{categoryMetadata.description}
						<br />
						{BLOG_LABELS.pagination.showingText
							.replace("{current}", String(paginationResult.items.length))
							.replace("{total}", String(paginationResult.totalItems))}
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
					baseUrl={`/blog/category/${category}/`}
				/>
			</div>
		</StandardLayout>
	);
};

export default CategoryPageWithPagination;
