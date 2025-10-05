"use client";

import NewArticlesSection from "@/src/components/blog/NewArticlesSection";
import PreviousArticlesSection from "@/src/components/blog/PreviousArticlesSection";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import PageSubtitle from "@/src/components/shared/atoms/PageSubtitle";
import PageTitle from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

export default function BlogPage() {
	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<PageTitle>Blog</PageTitle>
				<PageSubtitle>
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something!
				</PageSubtitle>
				<NewArticlesSection />
				<PreviousArticlesSection />
				<GoogleAds slotId="9667543473" />
			</div>
		</StandardLayout>
	);
}
