import { notFound, redirect } from "next/navigation";
import { getAllCategories, getCategoryMetadata } from "@/src/lib/blog";

interface CategoryPageProps {
	params: Promise<{
		category: string;
	}>;
}

export const generateStaticParams = async () => {
	const categories = getAllCategories();
	return categories.map((category) => ({ category: category.slug }));
};

export const CategoryPage = async ({ params }: CategoryPageProps) => {
	const { category } = await params;
	const categoryMetadata = getCategoryMetadata(category);

	if (!categoryMetadata) {
		notFound();
	}

	// Redirect to page 1
	redirect(`/blog/category/${category}/1`);
};

export default CategoryPage;
