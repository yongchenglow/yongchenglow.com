import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get("title") ?? "Yong Cheng Low";
	const tagsParam = searchParams.get("tags") ?? "";
	const tags = tagsParam
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean);

	const avatarUrl = new URL(
		"/img/yong-cheng-metasprint.jpeg",
		request.url,
	).toString();
	const avatarData = await fetch(avatarUrl).then((res) => res.arrayBuffer());

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
				{/* @ts-expect-error: ImageResponse accepts ArrayBuffer for img src */}
				<img
					src={avatarData}
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
