type BulletListProps = {
	bullets?: string[];
	className?: string;
};

export const BulletList = ({ bullets, className }: BulletListProps) => {
	if (!bullets?.length) return null;

	return (
		<ul
			className={`list-disc space-y-1 pl-5 text-sm text-muted-foreground ${className ?? ""}`}
		>
			{bullets.map((bullet, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: bullet text is not guaranteed unique
				<li key={i} className="leading-relaxed">
					{bullet}
				</li>
			))}
		</ul>
	);
};
