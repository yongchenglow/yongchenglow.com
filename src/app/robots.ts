import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: "*",
		allow: "/",
		disallow: "/api/",
	},
	sitemap: "https://www.yongchenglow.com/sitemap.xml",
});

export default robots;
