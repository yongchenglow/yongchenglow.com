"use client";

import Link from "next/link";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import { Button } from "@/src/components/shared/ui/button";
import { Card, CardContent } from "@/src/components/shared/ui/card";
import { Typography } from "@/src/components/ui/typography";

export default function BlogPage() {
	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<div className="mb-1">
					<Typography variant="h4">Blog</Typography>
				</div>
				<div className="max-w-[640px] mx-auto mb-7">
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something!
				</div>
				<Typography variant="h5" style={{ fontWeight: 450 }}>
					New Articles
				</Typography>
				<div className="flex justify-center mt-3 mb-7">
					<Card className="max-w-[350px] mx-1">
						<CardContent>
							<Typography variant="h6" mb={1}>
								Setting up your Project
							</Typography>
							<Typography variant="body1">
								What is the proper way to setup a group project? How do we make
								the best our of our IDE to increase code quality and
								productivity?
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/6" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
				</div>
				<Typography variant="h5" style={{ fontWeight: 450 }}>
					Previous Articles
				</Typography>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
					<Card className="max-w-[350px]">
						<CardContent>
							<Typography variant="h6" mb={1}>
								Understanding React Hooks
							</Typography>
							<Typography variant="body1">
								A comprehensive guide to understanding and implementing React
								Hooks in your applications effectively.
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/1" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
					<Card className="max-w-[350px]">
						<CardContent>
							<Typography variant="h6" mb={1}>
								Building with TypeScript
							</Typography>
							<Typography variant="body1">
								Learn how to leverage TypeScript for better code quality and
								developer experience in your projects.
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/2" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
					<Card className="max-w-[350px]">
						<CardContent>
							<Typography variant="h6" mb={1}>
								Modern CSS Techniques
							</Typography>
							<Typography variant="body1">
								Explore modern CSS features and techniques to create beautiful
								and responsive web interfaces.
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/3" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
					<Card className="max-w-[350px]">
						<CardContent>
							<Typography variant="h6" mb={1}>
								Performance Optimization
							</Typography>
							<Typography variant="body1">
								Tips and techniques for optimizing your web applications for
								better performance and user experience.
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/4" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
					<Card className="max-w-[350px]">
						<CardContent>
							<Typography variant="h6" mb={1}>
								API Design Best Practices
							</Typography>
							<Typography variant="body1">
								Learn the fundamentals of designing robust and scalable APIs
								that developers love to use.
							</Typography>
						</CardContent>
						<div className="flex justify-center pb-4">
							<Link href="/blog/5" style={{ textDecoration: "none" }}>
								<Button size="sm">Read Now</Button>
							</Link>
						</div>
					</Card>
				</div>
				<GoogleAds slotId="9667543473" />
			</div>
		</StandardLayout>
	);
}
