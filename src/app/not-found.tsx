import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";

export const metadata: Metadata = {
	title: "Page Not Found",
	robots: { index: false, follow: false },
};

const NotFound = () => {
	return (
		<StandardLayout>
			<div className="py-16 text-center max-w-2xl mx-auto">
				<FadeIn>
					<PageTitle>404</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						This page wandered off. Try one of these instead.
					</PageSubtitle>
				</FadeIn>
				<FadeIn delay={0.2}>
					<div className="flex flex-wrap gap-3 justify-center mt-8">
						<Button asChild>
							<Link href="/">Home</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/blog">Blog</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/blog/all">All posts</Link>
						</Button>
					</div>
				</FadeIn>
			</div>
		</StandardLayout>
	);
};

export default NotFound;
