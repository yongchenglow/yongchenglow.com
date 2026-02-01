import AboutMeSection from "@/src/components/home/AboutMeSection";
import IntroSection from "@/src/components/home/IntroSection";
import LatestArticlesSection from "@/src/components/home/LatestArticlesSection";
import ProjectsSection from "@/src/components/home/ProjectsSection";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { getFeaturedPost } from "@/src/lib/blog";

export default function HomePage() {
	const featuredPost = getFeaturedPost();

	return (
		<StandardLayout>
			<IntroSection />
			<LatestArticlesSection post={featuredPost} />
			<ProjectsSection />
			<GoogleAds slotId="5500217699" />
			<AboutMeSection />
			<GoogleAds slotId="8155985403" />
		</StandardLayout>
	);
}
