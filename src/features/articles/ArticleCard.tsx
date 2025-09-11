import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";

interface ArticleCardProps {
	title: string;
	description: string;
	href: string;
	buttonText?: string;
}

export default function ArticleCard({
	title,
	description,
	href,
	buttonText = "Read Now",
}: ArticleCardProps) {
	return (
		<Link
			href={href}
			className="block hover:shadow-xl transition-shadow duration-200"
		>
			<Card sx={{ maxWidth: 384, marginX: 2 }} className="overflow-hidden">
				<CardContent>
					<h3 className="text-xl font-semibold mb-4">{title}</h3>
					<p className="text-muted-foreground leading-relaxed">{description}</p>
				</CardContent>
				<CardFooter sx={{ justifyContent: "center" }}>
					<span className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 border-none cursor-pointer inline-block text-center">
						{buttonText}
					</span>
				</CardFooter>
			</Card>
		</Link>
	);
}
