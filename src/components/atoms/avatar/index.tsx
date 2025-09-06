import Image from "next/image";
import type React from "react";

interface AvatarProps {
	alt: string;
	src: string;
	sx?: {
		width?: number;
		height?: number;
		margin?: string;
		[key: string]: string | number | undefined;
	};
	className?: string;
	style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
	alt,
	src,
	sx,
	className = "",
	style,
	...props
}) => {
	const computedStyle: React.CSSProperties = {
		borderRadius: "50%",
		objectFit: "cover",
		...style,
		...(sx?.width && { width: `${sx.width}px` }),
		...(sx?.height && { height: `${sx.height}px` }),
		...(sx?.margin && { margin: sx.margin }),
	};

	return (
		<Image
			src={src}
			alt={alt}
			className={className}
			style={computedStyle}
			width={sx?.width || 100}
			height={sx?.height || 100}
			{...props}
		/>
	);
};

export default Avatar;
