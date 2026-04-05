import { notFound } from "next/navigation";
import AnimatedGridItem from "@/src/components/blog/AnimatedGridItem";
import Pagination from "@/src/components/blog/Pagination";
import PostCard from "@/src/components/post/PostCard";
import PostGrid from "@/src/components/post/PostGrid";
import FadeIn from "@/src/components/shared/atoms/FadeIn";
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
				<FadeIn>
					<PageTitle>{categoryMetadata.label}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{categoryMetadata.description}
						<br />
						Showing {paginationResult.items.length} of{" "}
						{paginationResult.totalItems} posts
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
}
