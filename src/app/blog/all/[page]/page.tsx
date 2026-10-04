import { notFound } from "next/navigation";
import { BlogBreadcrumb } from "@/src/components/blog/BlogBreadcrumb";
import { LatestPostsView } from "@/src/components/blog/LatestPostsView";
import { PostContainer } from "@/src/components/post/PostContainer";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { BLOG_UI } from "@/src/config/blog-ui";
import {
	getListing,
	getListingApiUrl,
	getListingBaseUrl,
	getListingPageCount,
	paginationSummary,
	parsePage,
} from "@/src/lib/blog-listing";

interface AllPostsPageProps {
	params: Promise<{
		page: string;
	}>;
}

const scope = { kind: "all" } as const;

export const generateMetadata = async ({ params }: AllPostsPageProps) => {
	const { page } = await params;
	return {
		title: `${BLOG_UI.allPosts.pageHeading} - Page ${page}`,
		alternates: { canonical: `${getListingBaseUrl(scope)}${page}` },
	};
};

export const generateStaticParams = async () => {
	const totalPages = getListingPageCount(scope);
	return Array.from({ length: totalPages }, (_, index) => ({
		page: String(index + 1),
	}));
};

// Page counts derive from the post files. See the note in
// `src/app/blog/[slug]/page.tsx` for why unlisted params must not render.
export const dynamicParams = false;

export const AllPostsPage = async ({ params }: AllPostsPageProps) => {
	const { page } = await params;
	const pageNumber = parsePage(page);

	if (pageNumber === null) {
		notFound();
	}

	const listing = getListing(scope, pageNumber);

	// The listing clamps API consumers to the final page, but a page route
	// outside the generated range is not a canonical URL.
	if (pageNumber > Math.max(listing.totalPages, 1)) {
		notFound();
	}

	const apiUrl = getListingApiUrl(scope);

	return (
		<StandardLayout>
			<PostContainer>
				<BlogBreadcrumb
					current={{
						label: BLOG_UI.allPosts.pageHeading,
						href: `${getListingBaseUrl(scope)}1`,
					}}
				/>
				<div className="text-center">
					<FadeIn>
						<PageTitle>{BLOG_UI.allPosts.pageHeading}</PageTitle>
					</FadeIn>
					<FadeIn delay={0.1}>
						<PageSubtitle>{paginationSummary(listing)}</PageSubtitle>
					</FadeIn>
				</div>

				{apiUrl && (
					<LatestPostsView
						paginationResult={listing}
						baseUrl={getListingBaseUrl(scope)}
						apiUrl={apiUrl}
					/>
				)}
			</PostContainer>
		</StandardLayout>
	);
};

export default AllPostsPage;
