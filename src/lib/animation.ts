/**
 * Calculate stagger delay for animation based on item index
 * @param index - The index of the item in the list
 * @param baseDelay - Base delay in seconds (default: 0.05)
 * @returns Delay in seconds for the animation
 */
export function getStaggerDelay(index: number, baseDelay = 0.05): number {
	return baseDelay * index;
}
