export const SITE_URL = "https://www.yongchenglow.com";

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

export const AD_SLOTS = {
	homeTop: "5500217699",
	homeBottom: "8155985403",
	about: "7158598508",
	blog: "9667543473",
} as const;
