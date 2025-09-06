import { Box, Container } from "@mui/material";
import type React from "react";
import ResponsiveAppBar from "@/src/components/organisms/appbar";
import Footer from "@/src/components/organisms/footer";

const StandardLayout = ({ children }): React.ReactElement => {
	return (
		<Box height="100vh" paddingTop={8} display="flex" flexDirection="column">
			<ResponsiveAppBar />
			<Container maxWidth="xl">{children}</Container>
			<Footer />
		</Box>
	);
};

export default StandardLayout;
