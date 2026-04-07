import { notFound, redirect } from "next/navigation";
import { getAllPostYears } from "@/src/lib/blog";

interface YearPageProps {
	params: Promise<{
		year: string;
	}>;
}

export const generateStaticParams = async () => {
	const years = getAllPostYears();
	return years.map((year) => ({ year: String(year) }));
};

export const YearPage = async ({ params }: YearPageProps) => {
	const { year } = await params;
	const yearNumber = Number.parseInt(year, 10);

	// Validate year
	if (Number.isNaN(yearNumber)) {
		notFound();
	}

	// Redirect to page 1
	redirect(`/blog/year/${year}/1`);
};

export default YearPage;
