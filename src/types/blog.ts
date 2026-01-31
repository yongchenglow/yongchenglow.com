export interface BlogFrontmatter {
	title: string;
	subtitle?: string;
	description: string;
	date: string; // ISO 8601 format
	lastUpdated?: string;
	author: string;
	tags?: string[];
	image?: string;
	draft?: boolean;
	featured?: boolean;
	adsSlotId?: string;
}

export interface BlogPost {
	slug: string;
	frontmatter: BlogFrontmatter;
	content: string;
	readingTime: string;
	excerpt?: string;
}
