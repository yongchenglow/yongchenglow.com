"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FadeIn } from "@/src/components/shared/atoms/FadeIn";
import { PageSubtitle } from "@/src/components/shared/atoms/PageSubtitle";
import { PageTitle } from "@/src/components/shared/atoms/PageTitle";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<StandardLayout>
			<div className="py-16 text-center max-w-2xl mx-auto">
				<FadeIn>
					<PageTitle>Something broke</PageTitle>
				</FadeIn>
				<FadeIn delay={0.1}>
					<PageSubtitle>
						An unexpected error occurred while rendering this page.
					</PageSubtitle>
				</FadeIn>
				{error.digest && (
					<p className="mt-2 text-xs text-muted-foreground font-mono">
						ref: {error.digest}
					</p>
				)}
				<FadeIn delay={0.2}>
					<div className="flex flex-wrap gap-3 justify-center mt-8">
						<Button onClick={reset}>Try again</Button>
						<Button variant="outline" asChild>
							<Link href="/">Home</Link>
						</Button>
					</div>
				</FadeIn>
			</div>
		</StandardLayout>
	);
};

export default ErrorPage;
