import type { APIRequestContext } from "@playwright/test";

/**
 * Reads the site's own sitemap and returns each page as a path. The sitemap
 * lists absolute production URLs, so only the path is kept; the suite then
 * resolves it against whichever environment it is testing.
 */
export const getSitemapPaths = async (
	request: APIRequestContext,
): Promise<string[]> => {
	const response = await request.get("/sitemap.xml");
	if (!response.ok()) {
		throw new Error(`GET /sitemap.xml returned ${response.status()}`);
	}

	const xml = await response.text();
	const locations = xml.matchAll(/<loc>(.*?)<\/loc>/g);

	return Array.from(locations, ([, url]) => new URL(url).pathname);
};
