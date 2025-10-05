import type React from "react";
import Container from "@/src/components/shared/atoms/Container";
import Footer from "@/src/components/shared/organisms/Footer";
import NavigationBar from "@/src/components/shared/organisms/NavigationBar";

const StandardLayout = ({ children }): React.ReactElement => {
	return (
		<div className="min-h-screen pt-16 flex flex-col">
			<NavigationBar />
			<Container>{children}</Container>
			<Footer />
		</div>
	);
};

export default StandardLayout;
