import { Roboto } from "next/font/google";

const primaryFont = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	style: ["normal", "italic"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

export { primaryFont };
