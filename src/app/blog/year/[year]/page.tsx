import { redirect } from "next/navigation";
import { getAllPostYears } from "@/src/lib/blog";

interface YearPageProps {
	params: Promise<{
		year: string;
	}>;
}

export async function generateStaticParams() {
	const years = getAllPostYears();
	return years.map((year) => ({ year: String(year) }));
}

export default async function YearPage({ params }: YearPageProps) {
	const { year } = await params;
	const yearNumber = Number.parseInt(year, 10);

	// Validate year
	if (Number.isNaN(yearNumber)) {
		throw new Error("Invalid year");
	}

	// Redirect to page 1
	redirect(`/blog/year/${year}/1`);
}
