"use client";

import type { ReactNode } from "react";
import Container from "@/src/components/shared/atoms/Container";
import Footer from "@/src/components/shared/organisms/Footer";
import NavigationBar from "@/src/components/shared/organisms/Navigationbar";

interface StandardLayoutProps {
	children: ReactNode;
}

const StandardLayout = ({ children }: StandardLayoutProps) => {
	return (
		<div className="min-h-screen pt-16 flex flex-col">
			<NavigationBar />
			<Container>{children}</Container>
			<Footer />
		</div>
	);
};

export default StandardLayout;
