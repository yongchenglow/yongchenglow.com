import type React from "react";
import Footer from "@/src/components/organisms/footer";
import NavigationBar from "@/src/components/organisms/navigation-bar";

const StandardLayout = ({ children }): React.ReactElement => {
	return (
		<div className="min-h-screen pt-16 flex flex-col">
			<NavigationBar />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default StandardLayout;
