import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register a DOM before anything imports React / testing-library.
// An explicit URL is required: next/image resolves relative `src` values
// against document.location, which throws "Invalid URL" on an about:blank base.
GlobalRegistrator.register({ url: "http://localhost:3000" });

const { afterEach, mock } = await import("bun:test");
const { vi } = await import("./bun-test-utils");

// Bun does not ship jest-dom's matchers; register the Vitest-compatible entry.
await import("@testing-library/jest-dom/vitest");

// Vitest unmounts rendered trees automatically between tests; Bun does not, so
// without this the DOM accumulates across test files.
const { cleanup } = await import("@testing-library/react");
afterEach(cleanup);

// Mock Next.js navigation
mock.module("next/navigation", () => ({
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
