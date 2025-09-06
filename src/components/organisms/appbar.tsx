import Link from "next/link";

const pages = ["Home", "About", "Blog"];

const ResponsiveAppBar = () => {
	return (
		<header className="bg-primary-500 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-center py-4">
					<div className="flex flex-grow justify-center">
						{pages.map((page) => (
							<Link
								key={page}
								href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
								className="text-white hover:text-gray-200 px-4 py-2 text-base font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer rounded-md hover:bg-white/10"
							>
								{page}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};
export default ResponsiveAppBar;
