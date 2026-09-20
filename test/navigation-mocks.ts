import { vi } from "./bun-test-utils";

export const notFoundMock = vi.fn(() => {
	throw new Error("NEXT_NOT_FOUND");
});

export const redirectMock = vi.fn();
