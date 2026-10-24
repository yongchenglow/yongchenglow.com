export const SITE_URL = "https://www.yongchenglow.com";

/**
 * Every published date is written in this offset. The `Article` JSON-LD needs
 * it to stamp a timezone, and a bare `YYYY-MM-DD` is not a valid dateTime.
 */
export const SITE_TIMEZONE_OFFSET = "+08:00";

export const SITE_AUTHOR = {
	name: "Yong Cheng Low",
	url: `${SITE_URL}/about`,
	image: "/img/yong-cheng-metasprint.jpeg",
} as const;

export const SITE_NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "/blog" },
] as const;

export const SITE_SOCIAL_LINKS = {
	linkedin: "https://www.linkedin.com/in/yong-cheng-low/",
	github: "https://github.com/yongchenglow",
	instagram: "https://www.instagram.com/yclow88/",
} as const;
