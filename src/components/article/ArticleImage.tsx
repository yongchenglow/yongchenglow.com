import Image, { type ImageProps } from "next/image";

interface ArticleImageProps extends Omit<ImageProps, "width" | "height"> {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

export default function ArticleImage({
	src,
	alt,
	width = 1280,
	height = 853,
	priority = false,
	style = { width: "100%", height: "auto" },
	className = "",
	...props
}: ArticleImageProps) {
	return (
		<div className={`max-w-3xl mx-auto mb-4 ${className}`.trim()}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				style={style}
				{...props}
			/>
		</div>
	);
}
