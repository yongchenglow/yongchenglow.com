import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

const pages = ["Home", "About", "Blog"];

const ResponsiveAppBar = () => {
	return (
		<AppBar>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						justifyContent="center"
						sx={{
							flexGrow: 1,
							display: "flex",
						}}
					>
						{pages.map((page) => (
							<Link
								key={page}
								href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
								style={{ textDecoration: "none" }}
							>
								<Button
									sx={{
										color: "white",
										display: "block",
										textTransform: "unset",
									}}
								>
									{page}
								</Button>
							</Link>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
