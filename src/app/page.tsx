import { AboutMeSection } from "@/src/components/home/AboutMeSection";
import { IntroSection } from "@/src/components/home/IntroSection";
import { LatestPostsSection } from "@/src/components/home/LatestPostsSection";
import { ProjectsSection } from "@/src/components/home/ProjectsSection";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { AD_SLOTS } from "@/src/config/site";
import { getFeaturedPost } from "@/src/lib/blog";

export const HomePage = () => {
	const featuredPost = getFeaturedPost();

	return (
		<StandardLayout>
			<IntroSection />
			<LatestPostsSection post={featuredPost} />
			<ProjectsSection />
			<GoogleAds slotId={AD_SLOTS.homeTop} />
			<AboutMeSection />
			<GoogleAds slotId={AD_SLOTS.homeBottom} />
		</StandardLayout>
	);
};

export default HomePage;
