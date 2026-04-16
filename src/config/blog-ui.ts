import blogUi from "@/content/blog-ui.json";

export const BLOG_UI = blogUi;

export const BLOG_LABELS = {
	blogTitle: blogUi.blogTitle,
	featured: {
		sectionHeading: blogUi.featured.sectionHeading,
		pageHeading: blogUi.featured.pageHeading,
		badge: blogUi.featured.badge,
	},
	previousPosts: {
		sectionHeading: blogUi.previousPosts.sectionHeading,
		viewAllLink: blogUi.previousPosts.viewAllLink,
	},
	categoryNavigation: {
		heading: blogUi.categoryNavigation.heading,
	},
	yearFilter: {
		heading: blogUi.yearFilter.heading,
	},
	pagination: {
		showingText: blogUi.pagination.showingText,
	},
} as const;
