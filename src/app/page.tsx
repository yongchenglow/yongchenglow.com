import { AdSlot } from "@/src/components/ads/AdSlot";
import { AboutMeSection } from "@/src/components/home/AboutMeSection";
import { IntroSection } from "@/src/components/home/IntroSection";
import { LatestPostsSection } from "@/src/components/home/LatestPostsSection";
import { ProjectsSection } from "@/src/components/home/ProjectsSection";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { blog } from "@/src/lib/blog";

export const HomePage = () => {
	const featuredPost = blog.getFeaturedPost();

	return (
		<StandardLayout>
			<IntroSection />
			<LatestPostsSection post={featuredPost} />
			<ProjectsSection />
			<AboutMeSection />
			<AdSlot placement="home-end" />
		</StandardLayout>
	);
};

export default HomePage;
