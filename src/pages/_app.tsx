import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { primaryFont } from "../font";
import AppHead from "./_head";
import AppScript from "./_scripts";
import "../styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<AppHead />
			<AppScript />
			<main className={primaryFont.className}>
				<Component {...pageProps} />
			</main>
		</>
	);
};

export default App;
