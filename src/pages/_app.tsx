import { CssBaseline, ThemeProvider } from "@mui/material";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import theme from "@/src/theme";
import { primaryFont } from "../font";
import AppHead from "./_head";
import AppScript from "./_scripts";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<AppHead />
			<ThemeProvider theme={theme}>
				<AppScript />
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<main className={primaryFont.className}>
					<Component {...pageProps} />
				</main>
			</ThemeProvider>
		</>
	);
};

export default App;
