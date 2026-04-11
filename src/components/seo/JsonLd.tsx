interface JsonLdProps {
	data: Record<string, unknown>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: controlled schema.org data, no user input
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
};
