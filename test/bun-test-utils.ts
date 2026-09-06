import { jest, mock } from "bun:test";

/**
 * Compatibility shim exposing a Vitest-shaped `vi` object on top of `bun:test`.
 *
 * Bun's runner provides the same primitives under different names (`mock`,
 * `jest.fn`, `jest.spyOn`), so the test suite keeps its existing call sites
 * instead of being rewritten wholesale.
 *
 * `vi.mock` is intentionally absent: Bun's module mocking is `mock.module`,
 * which is hoisting-free and must be awaited at the top of a test file. Import
 * `mock` from `bun:test` directly for that.
 */
export const vi = {
	fn: jest.fn,
	spyOn: jest.spyOn,
	clearAllMocks: jest.clearAllMocks,
	resetAllMocks: jest.restoreAllMocks,
	restoreAllMocks: jest.restoreAllMocks,
	useFakeTimers: jest.useFakeTimers,
	useRealTimers: jest.useRealTimers,
	/**
	 * Vitest's `vi.mocked` is a types-only cast at runtime; mirror that here so
	 * `vi.mocked(fn).mockReturnValue(...)` keeps type-checking and works.
	 */
	mocked: <T>(item: T): T & ReturnType<typeof jest.fn> =>
		item as T & ReturnType<typeof jest.fn>,
};

export { mock };
