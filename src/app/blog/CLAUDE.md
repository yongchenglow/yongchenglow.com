# Blog

Routes here render posts that live in `content/blog/`, one post per file. Prefer `.mdx`; `.md` is also read.

Keep this file and every other non-post document out of `content/blog/` — that directory is globbed by extension, so any `.md` placed there is parsed as a post and fails the build on missing frontmatter.

## Slug

The filename is the slug and the URL. It must match `^[a-z0-9-]+$` — lowercase, digits, hyphens. Anything else throws `InvalidBlogSlugError` at parse time, because slugs are joined straight onto a filesystem path.

## Frontmatter

Validated by `BlogFrontmatterSchema` in `src/content/schema.ts`. A violation fails the build with the file and field named.

Required: `title`, `description`, `date`, `author`.

Optional: `subtitle`, `lastUpdated`, `tags`, `image`, `draft`, `featured`, `adsSlotId`.

- `date` and `lastUpdated` are `YYYY-MM-DD`. Quote them — YAML parses a bare date into a `Date`, which the schema then coerces back to a string, so the quoted form is the one that round-trips predictably.
- `author` is a filename stem under `content/authors/`.
- `image` is a path under `public/`, served from the root: `/img/example.png`.
- `draft: true` hides the post from every listing, sitemap, and search index while leaving its direct URL live.
- `featured: true` promotes the post to the featured slot. Only the first such post wins; with none, the newest post fills the slot.

## Tags drive category pages

A tag surfaces a post on a category page only if that exact tag is listed under a category in `src/config/blog.ts`. An unlisted tag still gets its own `/blog/tag/<tag>` page but reaches no category. When a new post's tags belong to an existing category, reuse that category's spelling; when they do not, add them to the category in `src/config/blog.ts` deliberately.

## Excerpt and reading time

Both are derived, never authored. The excerpt is the first paragraph truncated to 200 characters, and reading time is computed from the body — so the opening paragraph doubles as listing copy.

## After adding or renaming a post

`bun run dev` and `bun run build` regenerate `public/search-index.json` first, so a post is searchable through either. Inspecting that file without running one of them shows a stale index; `bun run generate-search-index` refreshes it on its own.

Blog UI text — headings, badges, pagination labels — lives in `content/blog-ui.json`, not in components.
