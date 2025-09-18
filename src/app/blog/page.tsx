"use client";

import ArticleCard from "@/src/components/article/ArticleCard";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";

export default function BlogPage() {
	return (
		<StandardLayout>
			<div className="py-3 text-center">
				<div className="mb-1">
					<h4 className="text-xl font-semibold">Blog</h4>
				</div>
				<div className="max-w-[640px] mx-auto mb-7">
					Welcome to my blog! Hope you will enjoy my tech articles and learn
					something!
				</div>
				<h5 className="text-lg font-medium mb-3" style={{ fontWeight: 450 }}>
					New Articles
				</h5>
				<div className="flex justify-center mt-3 mb-7">
					<ArticleCard
						title="Setting up your Project"
						description="What is the proper way to setup a group project? How do we make the best our of our IDE to increase code quality and productivity?"
						href="/blog/6"
					/>
				</div>
				<h5 className="text-lg font-medium mb-3" style={{ fontWeight: 450 }}>
					Previous Articles
				</h5>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
					<ArticleCard
						title="Understanding React Hooks"
						description="A comprehensive guide to understanding and implementing React Hooks in your applications effectively."
						href="/blog/1"
					/>
					<ArticleCard
						title="Building with TypeScript"
						description="Learn how to leverage TypeScript for better code quality and developer experience in your projects."
						href="/blog/2"
					/>
					<ArticleCard
						title="Modern CSS Techniques"
						description="Explore modern CSS features and techniques to create beautiful and responsive web interfaces."
						href="/blog/3"
					/>
					<ArticleCard
						title="Performance Optimization"
						description="Tips and techniques for optimizing your web applications for better performance and user experience."
						href="/blog/4"
					/>
					<ArticleCard
						title="API Design Best Practices"
						description="Learn the fundamentals of designing robust and scalable APIs that developers love to use."
						href="/blog/5"
					/>
				</div>
				<GoogleAds slotId="9667543473" />
			</div>
		</StandardLayout>
	);
}
