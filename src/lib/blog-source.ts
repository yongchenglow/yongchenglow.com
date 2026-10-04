import fs from "node:fs";
import path from "node:path";

/**
 * Where blog content comes from.
 *
 * The repository behind this seam owns slug resolution, frontmatter validation,
 * and caching; a source only has to hand over file names and their contents.
 * Two adapters justify the seam: the filesystem in production and the build,
 * an in-memory map in tests.
 */
export interface ContentSource {
	/** Every file name in the content directory, unfiltered. */
	listFiles(): string[];
	/** The raw text of one file, frontmatter included. */
	readFile(fileName: string): string;
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");

/** Production adapter: the `content/blog` directory. */
export const fsContentSource: ContentSource = {
	listFiles: () => fs.readdirSync(BLOG_CONTENT_PATH),
	readFile: (fileName) =>
		fs.readFileSync(path.join(BLOG_CONTENT_PATH, fileName), "utf8"),
};

/**
 * Test adapter: a plain map of file name to contents. Pass one per case
 * instead of swapping filesystem fixtures.
 */
export const inMemoryContentSource = (
	files: Record<string, string>,
): ContentSource => ({
	listFiles: () => Object.keys(files),
	readFile: (fileName) => {
		const contents = files[fileName];
		if (contents === undefined) {
			throw new Error(`No such content file: ${fileName}`);
		}
		return contents;
	},
});
