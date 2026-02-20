import { redirect } from "next/navigation";
import { getAllCategories, getCategoryMetadata } from "@/src/lib/blog";

interface CategoryPageProps {
	params: Promise<{
		category: string;
	}>;
}

export async function generateStaticParams() {
	const categories = getAllCategories();
	return categories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;
	const categoryMetadata = getCategoryMetadata(category);

	if (!categoryMetadata) {
		throw new Error("Invalid category");
	}

	// Redirect to page 1
	redirect(`/blog/category/${category}/1`);
}
