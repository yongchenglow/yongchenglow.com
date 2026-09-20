import { NextResponse } from "next/server";
import { getPaginatedPostsByCategory } from "@/src/lib/blog";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const pageParam = searchParams.get("page") || "1";
	const page = Number.parseInt(pageParam, 10);

	if (!category) {
		return NextResponse.json(
			{ error: "Category parameter required" },
			{ status: 400 },
		);
	}

	if (!/^[1-9]\d*$/.test(pageParam) || Number.isNaN(page)) {
		return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
	}

	try {
		const result = getPaginatedPostsByCategory(category, page);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
};
