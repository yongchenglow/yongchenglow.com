import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_AUTHOR } from "@/src/config/site";

export const runtime = "edge";

const MAX_TITLE_LENGTH = 200;
const MAX_TAGS = 6;
const MAX_TAG_LENGTH = 32;
const AVATAR_FETCH_TIMEOUT_MS = 3000;

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const title = (searchParams.get("title") ?? SITE_AUTHOR.name).slice(
		0,
		MAX_TITLE_LENGTH,
	);
	const tagsParam = searchParams.get("tags") ?? "";
	const tags = tagsParam
		.split(",")
		.map((t) => t.trim().slice(0, MAX_TAG_LENGTH))
		.filter(Boolean)
		.slice(0, MAX_TAGS);

	const avatarUrl = new URL(SITE_AUTHOR.image, request.url).toString();
	let avatarSrc: string | null = null;
	try {
		const response = await fetch(avatarUrl, {
			signal: AbortSignal.timeout(AVATAR_FETCH_TIMEOUT_MS),
		});
		if (response.ok) {
			const avatarBase64 = Buffer.from(await response.arrayBuffer()).toString(
				"base64",
			);
			avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;
		}
	} catch {
		// Avatar is decorative: render the card without it rather than failing.
	}

	return new ImageResponse(
		<div
			style={{
				width: "1200px",
				height: "630px",
				display: "flex",
				alignItems: "center",
				background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
				padding: "60px",
				fontFamily: "sans-serif",
			}}
		>
			{/* Avatar */}
			{avatarSrc && (
				<div
					style={{
						width: "140px",
						height: "140px",
						borderRadius: "70px",
						overflow: "hidden",
						flexShrink: 0,
						marginRight: "48px",
						border: "3px solid #334155",
					}}
				>
					{/* biome-ignore lint/performance/noImgElement: next/image cannot be used inside ImageResponse (Satori edge runtime) */}
					<img
						src={avatarSrc}
						width={140}
						height={140}
						style={{ objectFit: "cover" }}
						alt=""
					/>
				</div>
			)}

			{/* Text content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					height: "100%",
					justifyContent: "center",
				}}
			>
				{/* Title */}
				<div
					style={{
						fontSize: "52px",
						fontWeight: 700,
						color: "#f8fafc",
						lineHeight: 1.2,
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						marginBottom: "20px",
					}}
				>
					{title}
				</div>

				{/* Tags */}
				{tags.length > 0 && (
					<div
						style={{
							fontSize: "22px",
							color: "#94a3b8",
							marginBottom: "auto",
						}}
					>
						{tags.join(" · ")}
					</div>
				)}

				{/* Site URL */}
				<div
					style={{
						fontSize: "20px",
						color: "#64748b",
						marginTop: "auto",
						alignSelf: "flex-end",
					}}
				>
					yongchenglow.com
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			headers: {
				"Cache-Control": "public, max-age=3600, immutable",
			},
		},
	);
};
