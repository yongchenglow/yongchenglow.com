# Test guide

Run tests with `bun test`. The runner is `bun:test`; import test APIs such as `describe`, `it`, and `expect` from `"bun:test"`.

Test files mirror the source path: `src/components/blog/Pagination.tsx` is tested by `test/components/blog/Pagination.test.tsx`.

## The `vi` shim

`test/bun-test-utils.ts` exposes a narrow Vitest-shaped `vi` compatibility object over Bun's primitives. Import it by relative path from the test file; for example, a file two levels below `test/` uses `import { vi } from "../../bun-test-utils"`.

For module mocking, import `mock` from `"bun:test"` and call `mock.module`:

```ts
import { mock } from "bun:test";

mock.module("@/src/lib/blog", () => ({ getAllBlogPosts: () => [] }));
```

`mock.module` does not hoist. Register it at module scope before invoking the code under test. Keep per-file module mocks out of `describe` and `it` blocks.

## Setup runs automatically

`bunfig.toml` preloads `test/setup.ts`. It provides:

- A happy-dom DOM at `http://localhost:3000`, which gives `next/image` a valid base for relative sources.
- jest-dom's matchers, loaded through their `/vitest` entry.
- Mocks for `next/navigation` and `IntersectionObserver`.
- `afterEach(cleanup)` to unmount rendered trees between tests.

Add only suite-wide setup there; keep test-specific mocks beside the test.

Type declarations for the jest-dom matchers live in `test/matchers.d.ts`, which augments `bun:test` directly.

## Blog data is cached at module scope

`src/lib/blog.ts` memoizes parsed posts for the process lifetime. When a test changes filesystem fixtures between cases, call `resetBlogCache()` in `beforeEach` so each case observes its own content.

## Finish a test change

Run the narrowest affected test while iterating, then satisfy the repository-wide `bun test` and `bun run check:all` gates before completion. Confirm tests pass both individually and as part of the full suite when shared mocks or module state are involved.
