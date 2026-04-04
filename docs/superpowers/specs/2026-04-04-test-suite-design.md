# Test Suite Design

**Date:** 2026-04-04
**Scope:** Unit and component tests for blog utility logic, pagination, navigation filters, and shared layout.

## Goals

- Test structure and logic, not content (content changes frequently and makes snapshot tests fragile)
- Full coverage of pagination edge cases and blog filtering functions
- Component tests verify correct links and rendering conditions, not visual appearance

## Out of Scope

- Individual blog post page tests
- Visual regression / snapshot tests for new components
- End-to-end tests

---

## File Structure

```
test/
  index.test.tsx                        ← existing (snapshot, keep as-is)
  lib/
    blog.test.ts                        ← utility function tests
  components/
    blog/
      Pagination.test.tsx
      CategoryNavigation.test.tsx
      YearFilter.test.tsx
    shared/
      StandardLayout.test.tsx
```

**Framework:** Vitest + `@testing-library/react` (already configured). No new dependencies required.

---

## Section 1: `test/lib/blog.test.ts`

Mock `node:fs` via `vi.mock("node:fs")` so tests never touch the real filesystem. Each describe block sets up its own minimal in-memory MDX frontmatter strings.

### Test cases

**`getAllBlogSlugs`**
- Returns slugs for `.mdx` files
- Returns slugs for `.md` files
- Ignores files without `.mdx`/`.md` extension

**`getAllBlogPosts`**
- Sorts posts by date descending (newest first)
- Filters out posts where `draft: true` by default
- Includes draft posts when `includesDrafts = true`

**`getFeaturedPost`**
- Returns the post with `featured: true` when one exists
- Falls back to the first (most recent) post when no featured post exists
- Returns `null` when there are no posts

**`getBlogPostsByTag`**
- Returns posts that include the given tag
- Returns empty array when no posts match the tag

**`getBlogPostNavigation`**
- Returns correct `previous` and `next` for a middle post
- Returns `null` for `previous` on the first post
- Returns `null` for `next` on the last post

**`getAllPostYears`**
- Returns unique years in descending order
- Deduplicates years when multiple posts share a year

**`getBlogPostsByYear`**
- Returns only posts from the given year
- Returns empty array for a year with no posts

**`getPaginatedPosts`**
- Returns correct slice for page 1
- Returns correct slice for page 2
- Clamps page 0 to page 1
- Clamps page beyond total to last page
- `hasNextPage` is true when not on last page
- `hasPreviousPage` is false on page 1
- `hasPreviousPage` is true on page 2+

**`getPaginatedPostsByCategory`**
- Filters posts by category tags before paginating
- Returns empty result for unknown category slug

**`getPaginatedPostsByYear`**
- Filters posts by year before paginating

---

## Section 2: `test/components/blog/Pagination.test.tsx`

No mocking required — pure props-driven component.

### Test cases

- Returns null when `totalPages <= 1`
- Renders all page numbers when `totalPages <= 7` (no ellipsis)
- Renders ellipsis when `totalPages > 7` and current page is in the middle
- Renders ellipsis correctly when on page 1 (near start)
- Renders ellipsis correctly when on last page (near end)
- Previous button is disabled on page 1
- Next button is disabled on the last page
- Previous button links to `baseUrl + (currentPage - 1)`
- Next button links to `baseUrl + (currentPage + 1)`
- Active page is rendered as a `<span>` (not a link) and is disabled

---

## Section 3: `test/components/blog/CategoryNavigation.test.tsx`

Mock `@/src/lib/blog` via `vi.mock` to control categories and counts.

### Test cases

- Renders a badge for each category returned by `getAllCategories`
- Each badge links to `/blog/category/<slug>/1`
- Displays post count alongside category label

---

## Section 4: `test/components/blog/YearFilter.test.tsx`

Mock `@/src/lib/blog` via `vi.mock` to control years and counts.

### Test cases

- Renders a badge for each year returned by `getAllPostYears`
- Each badge links to `/blog/year/<year>/1`
- Displays post count alongside year label
- Returns null when `getAllPostYears` returns an empty array

---

## Section 5: `test/components/shared/StandardLayout.test.tsx`

Mock `NavigationBar`, `Footer`, and `Container` to keep the test focused on layout structure.

### Test cases

- Renders `NavigationBar`
- Renders `Footer`
- Renders children passed to the layout

---

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Filesystem mocking | `vi.mock("node:fs")` | No fixture files needed, tests stay fast and isolated |
| `@/src/lib/blog` mocking | `vi.mock` in component tests | Decouples component rendering from data layer |
| No new snapshots | Behavioural assertions only | Snapshots for new components create fragile tests that break on dependency updates |
