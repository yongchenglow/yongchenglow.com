import { NextResponse } from "next/server";
import { getPaginatedPosts } from "@/src/lib/blog";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const pageParam = searchParams.get("page") || "1";
	const page = Number.parseInt(pageParam, 10);

	if (!/^[1-9]\d*$/.test(pageParam) || Number.isNaN(page)) {
		return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
	}

	try {
		const result = getPaginatedPosts(page);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
};
