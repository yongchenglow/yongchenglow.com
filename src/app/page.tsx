"use client";

import AboutMeSection from "@/src/components/home/AboutMeSection";
import IntroSection from "@/src/components/home/IntroSection";
import LatestArticlesSection from "@/src/components/home/LatestArticlesSection";
import ProjectsSection from "@/src/components/home/ProjectsSection";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

export default function HomePage() {
	return (
		<StandardLayout>
			<IntroSection />
			<LatestArticlesSection />
			<ProjectsSection />
			<GoogleAds slotId="5500217699" />
			<AboutMeSection />
			<GoogleAds slotId="8155985403" />
		</StandardLayout>
	);
}
