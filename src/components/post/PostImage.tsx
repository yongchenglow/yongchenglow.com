"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageSkeleton } from "@/src/components/shared/atoms/ImageSkeleton";
import { cn, getBlurDataURL, getImagePlaceholder } from "@/src/lib/utils";

interface PostImageProps extends Omit<ImageProps, "width" | "height"> {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

export const PostImage = ({
	src,
	alt,
	width = 1280,
	height = 853,
	priority = false,
	style = { width: "100%", height: "auto" },
	className = "",
	sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
	...props
}: PostImageProps) => {
	const [isLoading, setIsLoading] = useState(true);

	// Calculate aspect ratio from width/height
	const aspectRatio = `${(width / height) * 100}%`;

	return (
		<div className={cn("max-w-3xl mx-auto mb-4", className)}>
			<div className="relative" style={{ paddingBottom: aspectRatio }}>
				{/* Skeleton loader - shown while image loads */}
				{isLoading && (
					<ImageSkeleton
						className="absolute inset-0"
						aspectRatio={aspectRatio}
					/>
				)}

				{/* Actual image */}
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					priority={priority}
					style={{
						...style,
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
					}}
					sizes={sizes}
					placeholder="blur"
					blurDataURL={getBlurDataURL(getImagePlaceholder(src))}
					quality={85}
					loading={priority ? "eager" : "lazy"}
					className={cn(
						"transition-opacity duration-500",
						isLoading ? "opacity-0" : "opacity-100",
					)}
					onLoad={() => setIsLoading(false)}
					{...props}
				/>
			</div>
		</div>
	);
};
