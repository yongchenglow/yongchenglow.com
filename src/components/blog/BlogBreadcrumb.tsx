import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/src/components/seo/JsonLd";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/shared/ui/breadcrumb";
import { BLOG_UI } from "@/src/config/blog-ui";
import { SITE_URL } from "@/src/config/site";
import { cn } from "@/src/lib/utils";

interface BlogBreadcrumbProps {
	current: {
		label: string;
		href: string;
	};
	compactOnMobile?: boolean;
	className?: string;
}

export const BlogBreadcrumb = ({
	current,
	compactOnMobile = false,
	className,
}: BlogBreadcrumbProps) => {
	const items = [
		{ label: BLOG_UI.breadcrumbs.home, href: "/" },
		{ label: BLOG_UI.breadcrumbs.blog, href: "/blog" },
		current,
	];

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: items.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: item.label,
						item: `${SITE_URL}${item.href}`,
					})),
				}}
			/>
			<Breadcrumb
				aria-label={BLOG_UI.breadcrumbs.ariaLabel}
				className={cn("mb-6 text-left", className)}
			>
				<BreadcrumbList>
					{items.map((item, index) => {
						const isCurrent = index === items.length - 1;
						const isCompactParent = index === items.length - 2;
						const responsiveClass =
							compactOnMobile && !isCompactParent
								? "hidden sm:inline-flex"
								: undefined;

						return (
							<Fragment key={item.href}>
								{index > 0 && (
									<BreadcrumbSeparator
										className={
											compactOnMobile ? "hidden sm:list-item" : undefined
										}
									/>
								)}
								<BreadcrumbItem className={responsiveClass}>
									{isCurrent ? (
										<BreadcrumbPage>{item.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link href={item.href}>{item.label}</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
};
