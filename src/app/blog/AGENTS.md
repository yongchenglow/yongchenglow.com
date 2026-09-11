# Blog authoring guide

Blog routes render one post per file from `content/blog/`. Prefer `.mdx`, the loader also accepts `.md`.

Keep only posts in `content/blog/`. The loader treats every `.md` and `.mdx` file there as a post, so documentation in that directory is parsed as content and fails validation.

## Slug

The filename stem is the URL slug. It must match `^[a-z0-9-]+$`: lowercase letters, digits, and hyphens. Any other value throws `InvalidBlogSlugError` before the slug reaches a filesystem path.

## Frontmatter

`BlogFrontmatterSchema` in `src/content/schema.ts` is the source of truth. Invalid frontmatter fails the build with the file and field named.

Required: `title`, `description`, `date`, `author`.

Optional: `subtitle`, `lastUpdated`, `tags`, `image`, `draft`, `featured`.

- Write `date` and `lastUpdated` as quoted `YYYY-MM-DD` strings so YAML round-trips them predictably.
- `author` is a filename stem under `content/authors/`.
- `image` is a path under `public/`, served from the root: `/img/example.png`.
- `draft: true` hides the post from every listing, sitemap, and search index while leaving its direct URL live.
- `featured: true` promotes the newest featured post to the featured slot. When none is featured, the newest post fills the slot.

## Tags drive category pages

A tag surfaces a post on a category page only when that exact tag appears in the category's `tags` list in `src/config/blog.ts`. An unlisted tag still receives `/blog/tag/<tag>` but belongs to no category. Reuse existing spellings; extend a category only when the taxonomy is intentionally changing.

## Excerpt and reading time

Do not add excerpt or reading-time fields. Both are derived from the body. The first paragraph, truncated to 200 characters, becomes listing copy.

## Finish a content change

After adding, renaming, or removing a post, run `bun run generate-search-index` and include the resulting `public/search-index.json` change. `bun run dev` and `bun run build` perform the same regeneration automatically.

Keep headings, badges, pagination labels, and other blog UI copy in `content/blog-ui.json`.
