import type React from "react";
import ResponsiveAppBar from "@/src/components/organisms/appbar";
import Footer from "@/src/components/organisms/footer";

const StandardLayout = ({ children }): React.ReactElement => {
	return (
		<div className="min-h-screen pt-16 flex flex-col">
			<ResponsiveAppBar />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default StandardLayout;
