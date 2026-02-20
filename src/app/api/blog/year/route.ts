import { NextResponse } from "next/server";
import { getPaginatedPostsByYear } from "@/src/lib/blog";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const yearParam = searchParams.get("year");
	const page = Number.parseInt(searchParams.get("page") || "1", 10);

	if (!yearParam) {
		return NextResponse.json(
			{ error: "Year parameter required" },
			{ status: 400 },
		);
	}

	const year = Number.parseInt(yearParam, 10);

	if (Number.isNaN(year) || Number.isNaN(page) || page < 1) {
		return NextResponse.json(
			{ error: "Invalid year or page number" },
			{ status: 400 },
		);
	}

	try {
		const result = getPaginatedPostsByYear(year, page);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
}
