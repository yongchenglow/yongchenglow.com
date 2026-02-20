import { NextResponse } from "next/server";
import { getPaginatedPostsByCategory } from "@/src/lib/blog";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const page = Number.parseInt(searchParams.get("page") || "1", 10);

	if (!category) {
		return NextResponse.json(
			{ error: "Category parameter required" },
			{ status: 400 },
		);
	}

	if (Number.isNaN(page) || page < 1) {
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
}
