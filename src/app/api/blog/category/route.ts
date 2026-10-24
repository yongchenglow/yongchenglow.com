import { NextResponse } from "next/server";
import { getListing, parsePage } from "@/src/lib/blog-listing";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const page = parsePage(searchParams.get("page") ?? "1");

	if (!category) {
		return NextResponse.json(
			{ error: "Category parameter required" },
			{ status: 400 },
		);
	}

	if (page === null) {
		return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
	}

	try {
		return NextResponse.json(
			getListing({ kind: "category", slug: category }, page),
		);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
};
