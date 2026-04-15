import { cn } from "@/src/lib/utils";

interface ImageSkeletonProps {
	className?: string;
	aspectRatio?: "square" | "landscape" | "portrait" | string;
}

/**
 * Skeleton loader with shimmer effect for image loading states.
 * Shows an animated gradient while the image loads.
 */
export const ImageSkeleton = ({
	className,
	aspectRatio = "landscape",
}: ImageSkeletonProps) => {
	// Calculate aspect ratio classes
	const aspectClass =
		aspectRatio === "square"
			? "aspect-square"
			: aspectRatio === "portrait"
				? "aspect-[3/4]"
				: aspectRatio === "landscape"
					? "aspect-[16/10]"
					: aspectRatio;

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-lg",
				"bg-gradient-to-r from-muted via-muted-foreground/10 to-muted",
				"animate-shimmer",
				aspectClass,
				className,
			)}
		/>
	);
};
