import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// @testing-library/jest-dom ships augmentations for Jest/Vitest, not bun:test.
// Re-declare them against Bun's Matchers so `toBeInTheDocument` et al type-check.
declare module "bun:test" {
	interface Matchers<T>
		extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}

	interface AsymmetricMatchers extends TestingLibraryMatchers<unknown, void> {}
}
