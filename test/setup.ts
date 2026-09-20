import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register a DOM before anything imports React / testing-library.
// An explicit URL is required: next/image resolves relative `src` values
// against document.location, which throws "Invalid URL" on an about:blank base.
GlobalRegistrator.register({ url: "http://localhost:3000" });

const { afterEach, mock } = await import("bun:test");
const { vi } = await import("./bun-test-utils");
const { notFoundMock, redirectMock } = await import("./navigation-mocks");
const { createElement, forwardRef } = await import("react");

// Bun does not ship jest-dom's matchers; register the Vitest-compatible entry.
await import("@testing-library/jest-dom/vitest");

// Vitest unmounts rendered trees automatically between tests; Bun does not, so
// without this the DOM accumulates across test files.
const { cleanup } = await import("@testing-library/react");
afterEach(cleanup);

// Mock Next.js navigation
mock.module("next/navigation", () => ({
	notFound: notFoundMock,
	redirect: redirectMock,
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

// next/image reads Next config through the framework runtime, which is absent in
// component tests. Keep image semantics while removing optimizer-only behavior.
const MockImage = forwardRef<HTMLImageElement, Record<string, unknown>>(
	(
		{
			blurDataURL: _blurDataURL,
			fill: _fill,
			loader: _loader,
			placeholder: _placeholder,
			priority: _priority,
			quality: _quality,
			unoptimized: _unoptimized,
			...props
		},
		ref,
	) => createElement("img", { ...props, ref }),
);

mock.module("next/image", () => ({ default: MockImage }));

// Mock IntersectionObserver for Framer Motion useInView
class IntersectionObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
	writable: true,
	configurable: true,
	value: IntersectionObserverMock,
});
