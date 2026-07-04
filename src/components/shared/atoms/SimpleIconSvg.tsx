import type { SimpleIcon } from "simple-icons";

interface SimpleIconSvgProps {
	icon: SimpleIcon;
	size?: number;
}

const SimpleIconSvg = ({ icon, size = 20 }: SimpleIconSvgProps) => (
	<svg
		role="img"
		viewBox="0 0 24 24"
		width={size}
		height={size}
		fill="currentColor"
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
);

export { SimpleIconSvg };
