# Blog API

Base path: `/api/blog`

All endpoints return JSON and do not require authentication.

## Endpoints

### GET /api/blog/latest

Retrieves a paginated list of all blog posts, sorted by date (newest first).

**Request**

Query parameters:

| Parameter | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| `page`    | number | `1`     | Page number (1-indexed)  |

**Response**

```json
{
  "items": [
    {
      "slug": "my-blog-post",
      "frontmatter": {
        "title": "My Blog Post",
        "subtitle": "A subtitle",
        "description": "Post description",
        "date": "2024-01-15T00:00:00.000Z",
        "author": "Yong Cheng Low",
        "tags": ["nextjs", "typescript"],
        "image": "/images/posts/my-blog-post.jpg",
        "draft": false,
        "featured": true
      },
      "content": "# My Blog Post\n\nFull MDX content...",
      "readingTime": "5 min read",
      "excerpt": "First paragraph of the post..."
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "totalItems": 42,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

**Errors**

- `400 Bad Request` - Invalid page number

---

### GET /api/blog/category

Retrieves a paginated list of blog posts filtered by category.

**Request**

Query parameters:

| Parameter | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| `category` | string | (required) | Category slug (e.g., `ai`, `coding`, `life`) |
| `page`    | number | `1`     | Page number (1-indexed)  |

**Response**

Same shape as `/api/blog/latest`.

**Errors**

- `400 Bad Request` - Missing `category` parameter or invalid page number

---

### GET /api/blog/year

Retrieves a paginated list of blog posts filtered by year.

**Request**

Query parameters:

| Parameter | Type    | Default | Description              |
| --------- | ------- | ------- | ------------------------ |
| `year`    | number  | (required) | Year (e.g., `2024`)     |
| `page`    | number  | `1`     | Page number (1-indexed)  |

**Response**

Same shape as `/api/blog/latest`.

**Errors**

- `400 Bad Request` - Missing `year` parameter or invalid year/page number

---

## Shared Types

### PaginationResult

```typescript
interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

### BlogPost

```typescript
interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
  excerpt?: string;
}
```

### BlogFrontmatter

```typescript
interface BlogFrontmatter {
  title: string;
  subtitle?: string;
  description: string;
  date: string;        // ISO 8601 format
  lastUpdated?: string;
  author: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
  featured?: boolean;
  adsSlotId?: string;
}
```
