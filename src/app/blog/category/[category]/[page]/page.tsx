import { notFound } from "next/navigation";
import { AnimatedGridItem } from "@/src/components/blog/AnimatedGridItem";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";
import { Pagination } from "@/src/components/blog/Pagination";
import { PostCard } from "@/src/components/post/PostCard";
import { PostGrid } from "@/src/components/post/PostGrid";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { blog } from "@/src/lib/blog";
import {
	getListing,
	getListingBaseUrl,
	getListingPageCount,
	paginationSummary,
	parsePage,
} from "@/src/lib/blog-listing";

interface CategoryPageProps {
	params: Promise<{
		category: string;
		page: string;
	}>;
}

export const generateMetadata = async ({ params }: CategoryPageProps) => {
	const { category, page } = await params;
	const categoryMetadata = blog.getCategoryMetadata(category);
	const label = categoryMetadata?.label ?? category;
	return {
		title: `${label} - Page ${page}`,
		alternates: {
			canonical: `/blog/category/${category}/${page}`,
		},
	};
};

export const generateStaticParams = async () => {
	const categories = blog.getAllCategories();
	const params: { category: string; page: string }[] = [];

	for (const category of categories) {
		const totalPages = getListingPageCount({
			kind: "category",
			slug: category.slug,
		});

		for (let i = 1; i <= totalPages; i++) {
			params.push({
				category: category.slug,
				page: String(i),
			});
		}
	}

	return params;
};

// Page counts derive from the post files. See the note in
// `src/app/blog/[slug]/page.tsx` for why unlisted params must not render.
export const dynamicParams = false;

export const CategoryPageWithPagination = async ({
	params,
}: CategoryPageProps) => {
	const { category, page } = await params;
	const pageNumber = parsePage(page);

	// A page param that is not a canonical positive integer is not a URL.
	if (pageNumber === null) {
		notFound();
	}

	const categoryMetadata = blog.getCategoryMetadata(category);

	if (!categoryMetadata) {
		notFound();
	}

	const scope = { kind: "category", slug: category } as const;
	const listing = getListing(scope, pageNumber);

	// The listing clamps API consumers to the final page, but a page route
	// outside the generated range is not a canonical URL.
	if (pageNumber > Math.max(listing.totalPages, 1)) {
		notFound();
	}

	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<BlogBreadcrumb
					current={{
						label: categoryMetadata.label,
						href: getListingBaseUrl(scope) + "1",
					}}
				/>
				<FadeIn>
					<PageTitle>{categoryMetadata.label}</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						{categoryMetadata.description}
						<br />
						{paginationSummary(listing)}
					</PageSubtitle>
				</FadeIn>

				<PostGrid>
					{listing.items.map((post, index) => (
						<AnimatedGridItem key={post.slug} index={index}>
							<PostCard post={post} />
						</AnimatedGridItem>
					))}
				</PostGrid>

				<Pagination
					currentPage={listing.currentPage}
					totalPages={listing.totalPages}
					baseUrl={getListingBaseUrl(scope)}
				/>
			</div>
		</StandardLayout>
	);
};

export default CategoryPageWithPagination;
