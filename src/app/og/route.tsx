import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_AUTHOR } from "@/src/config/site";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get("title") ?? SITE_AUTHOR.name;
	const tagsParam = searchParams.get("tags") ?? "";
	const tags = tagsParam
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean);

	const avatarUrl = new URL(SITE_AUTHOR.image, request.url).toString();
	const avatarArrayBuffer = await fetch(avatarUrl).then((res) =>
		res.arrayBuffer(),
	);
	const avatarBase64 = Buffer.from(avatarArrayBuffer).toString("base64");
	const avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;

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
		},
	);
};
