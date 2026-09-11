# Blog API

The blog API provides paginated access to published posts. All endpoints use `GET`, return JSON, and require no authentication.

The base path is `/api/blog`.

## Response behavior

- Posts are sorted from newest to oldest.
- Draft posts are excluded.
- Each page contains up to 12 posts, as set by `BLOG_CONFIG.postsPerPage` in `src/config/blog.ts`.
- A page above the available range is clamped to the last page.
- An empty result uses `currentPage: 1` and `totalPages: 0`.
- A valid category with no matching posts and an unknown category both return an empty result.

## Get the latest posts

```http
GET /api/blog/latest?page=1
```

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| `page` | No | `1` | A positive page number |

Example request

```bash
curl "http://localhost:3000/api/blog/latest?page=1"
```

## Get posts in a category

```http
GET /api/blog/category?category=development&page=1
```

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| `category` | Yes | None | A category slug from `src/config/blog.ts` |
| `page` | No | `1` | A positive page number |

Current category slugs are `development`, `process`, `design`, and `career`.

Example request

```bash
curl "http://localhost:3000/api/blog/category?category=development&page=1"
```

## Get posts from a year

```http
GET /api/blog/year?year=2026&page=1
```

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| `year` | Yes | None | The publication year |
| `page` | No | `1` | A positive page number |

Example request

```bash
curl "http://localhost:3000/api/blog/year?year=2026&page=1"
```

## Successful response

All three endpoints return the same structure.

```json
{
  "items": [
    {
      "slug": "example-post",
      "frontmatter": {
        "title": "Example post",
        "subtitle": "Optional subtitle",
        "description": "A short summary",
        "date": "2026-09-12",
        "lastUpdated": "2026-09-13",
        "author": "yongchenglow",
        "tags": ["web-development"],
        "image": "/img/example.jpg",
        "draft": false,
        "featured": true
      },
      "content": "## Introduction\n\nThe complete MDX source.",
      "readingTime": "1 min read",
      "wordCount": 120,
      "excerpt": "## Introduction"
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalItems": 1,
  "hasNextPage": false,
  "hasPreviousPage": false
}
```

Optional frontmatter fields are omitted when a post does not define them.

### Pagination fields

| Field | Type | Meaning |
| --- | --- | --- |
| `items` | `BlogPost[]` | Posts on the selected page |
| `currentPage` | `number` | Page returned after range clamping |
| `totalPages` | `number` | Number of available pages |
| `totalItems` | `number` | Number of matching posts |
| `hasNextPage` | `boolean` | Whether a later page exists |
| `hasPreviousPage` | `boolean` | Whether an earlier page exists |

### Blog post fields

| Field | Type | Meaning |
| --- | --- | --- |
| `slug` | `string` | Filename without `.md` or `.mdx` |
| `frontmatter` | `object` | Validated metadata from the post |
| `content` | `string` | Complete MDX body |
| `readingTime` | `string` | Human-readable reading estimate |
| `wordCount` | `number` | Word count calculated from the body |
| `excerpt` | `string` | First content block, limited to 200 characters |

The TypeScript definitions are in `src/types/blog.ts`. The runtime frontmatter rules are in `src/content/schema.ts`.

## Errors

Invalid requests return status `400`.

| Condition | Response |
| --- | --- |
| Missing `category` | `{ "error": "Category parameter required" }` |
| Missing `year` | `{ "error": "Year parameter required" }` |
| Invalid `page` | `{ "error": "Invalid page number" }` |
| Invalid `year` or `page` on the year endpoint | `{ "error": "Invalid year or page number" }` |

An unexpected content or server error returns status `500` with this body.

```json
{
  "error": "Failed to fetch posts"
}
```

Server logs contain the original error. The response does not expose internal details.
