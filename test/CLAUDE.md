# Tests

Run with `bun test`. The runner is `bun:test`, not Jest or Vitest — import `describe`, `it`, and `expect` from `"bun:test"`.

Test files mirror the source path: `src/components/blog/Pagination.tsx` is tested by `test/components/blog/Pagination.test.tsx`.

## The `vi` shim

`test/bun-test-utils.ts` exposes a Vitest-shaped `vi` over Bun's primitives, so existing call sites like `vi.fn()` and `vi.spyOn()` keep working. Import it by relative path from the test file — `import { vi } from "../../bun-test-utils"` from a file two levels deep.

`vi.mock` is deliberately absent. Module mocking is `mock.module`, imported from `"bun:test"`:

```ts
import { mock } from "bun:test";

mock.module("@/src/lib/blog", () => ({ getAllBlogPosts: () => [] }));
```

`mock.module` does not hoist. Call it at the top level of the file, above the code under test, rather than inside a `describe` or `it`.

## Setup runs automatically

`bunfig.toml` preloads `test/setup.ts` before every file, which registers a happy-dom DOM at `http://localhost:3000`, loads jest-dom's matchers through their `/vitest` entry, mocks `next/navigation` and `IntersectionObserver`, and calls `afterEach(cleanup)` — Bun does not unmount rendered trees on its own. Add a globally-needed mock there; keep a single test's mock in that test.

Type declarations for the jest-dom matchers live in `test/matchers.d.ts`, which augments `bun:test` directly.

## Blog data is cached at module scope

`src/lib/blog.ts` memoizes parsed posts for the process lifetime. A test that swaps `fs` fixtures between cases calls `resetBlogCache()` in `beforeEach`, or the previous case's content leaks into the next one.
