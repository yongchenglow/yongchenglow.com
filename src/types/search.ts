export interface SearchablePost {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	content: string;
	tags?: string[];
	date: string;
	url: string;
	[key: string]: unknown;
}

export interface SearchResult {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	url: string;
	tags?: string[];
	date: string;
	excerpt?: string;
}

export interface SerializedSearchIndex {
	posts: Record<string, SearchablePost>;
	timestamp: number;
}
