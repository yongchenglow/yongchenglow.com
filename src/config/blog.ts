import type { Category } from "@/src/types/blog";

export const BLOG_CONFIG = {
	postsPerPage: 12,
} as const;

export const BLOG_CATEGORIES: Record<string, Category> = {
	development: {
		slug: "development",
		label: "Development",
		tags: [
			"web-development",
			"database",
			"sql",
			"postgresql",
			"setup",
			"ide",
			"vscode",
		],
		description:
			"Articles about web development, databases, and development tools",
	},
	process: {
		slug: "process",
		label: "Process & Agile",
		tags: [
			"agile",
			"scrum",
			"project-management",
			"sprint-planning",
			"product-management",
			"teamwork",
		],
		description:
			"Insights on agile methodologies, project management, and team collaboration",
	},
	design: {
		slug: "design",
		label: "Design",
		tags: [
			"design",
			"ui-ux",
			"prototyping",
			"user-experience",
			"design-thinking",
		],
		description:
			"UI/UX design, prototyping, and user experience best practices",
	},
	career: {
		slug: "career",
		label: "Career & Learning",
		tags: ["career", "beginners", "best-practices", "normalization"],
		description: "Career guidance and learning resources for developers",
	},
} as const;
