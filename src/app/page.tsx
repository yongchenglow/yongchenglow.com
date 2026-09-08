import { AdSlot } from "@/src/components/ads/AdSlot";
import { AboutMeSection } from "@/src/components/home/AboutMeSection";
import { IntroSection } from "@/src/components/home/IntroSection";
import { LatestPostsSection } from "@/src/components/home/LatestPostsSection";
import { ProjectsSection } from "@/src/components/home/ProjectsSection";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { getFeaturedPost } from "@/src/lib/blog";

export const HomePage = () => {
	const featuredPost = getFeaturedPost();

	return (
		<StandardLayout>
			<IntroSection />
			<LatestPostsSection post={featuredPost} />
			<ProjectsSection />
			<AdSlot placement="home-after-projects" />
			<AboutMeSection />
		</StandardLayout>
	);
};

export default HomePage;
