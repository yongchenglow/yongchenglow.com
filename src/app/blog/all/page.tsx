import { redirect } from "next/navigation";
import { BLOG_UI } from "@/src/config/blog-ui";
import { getListingBaseUrl } from "@/src/lib/blog-listing";

export const metadata = {
	title: BLOG_UI.allPosts.pageHeading,
	alternates: { canonical: "/blog/all/1" },
};

// The archive is paginated and its page number is part of the canonical URL,
// so the bare path is not a page. See the note in
// `src/app/blog/[slug]/page.tsx` for why unlisted params must not render.
export const AllPostsPage = async () => {
	redirect(`${getListingBaseUrl({ kind: "all" })}1`);
};

export default AllPostsPage;
