import { AboutMeSection } from "@/src/components/home/AboutMeSection";
import { IntroSection } from "@/src/components/home/IntroSection";
import { LatestPostsSection } from "@/src/components/home/LatestPostsSection";
import { ProjectsSection } from "@/src/components/home/ProjectsSection";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { getFeaturedPost } from "@/src/lib/blog";

export const HomePage = () => {
	const featuredPost = getFeaturedPost();

	return (
		<StandardLayout>
			<IntroSection />
			<LatestPostsSection post={featuredPost} />
			<ProjectsSection />
			<GoogleAds slotId="5500217699" />
			<AboutMeSection />
			<GoogleAds slotId="8155985403" />
		</StandardLayout>
	);
};

export default HomePage;
