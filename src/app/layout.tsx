import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/src/components/theme/ThemeProvider";
import { primaryFont } from "../components/theme/font";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.yongchenglow.com"),
	title: "Yong Cheng Low",
	description:
		"Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
	keywords:
		"Yong Cheng Low, YC, Glints, Le Wagon, NUS, Tech, Computing, Computer Enginering, Blog, NUS Students' Sports Club",
	authors: [{ name: "Yong Cheng Low" }],
	robots: "index, follow",
	openGraph: {
		type: "website",
		url: "https://www.yongchenglow.com",
		title: "Yong Cheng Low",
		description:
			"Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
		images: [
			{
				url: "/img/yong-cheng-metasprint.jpeg",
			},
		],
	},
	twitter: {
		card: "summary",
		title: "Yong Cheng Low",
		description:
			"Yong Cheng Low's personal website where he talks about tech, personal life, and his experiences",
		images: ["/img/yong-cheng-metasprint.jpeg"],
	},
	icons: {
		icon: "/img/YongCheng.jpg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html prefix="og: http://ogp.me/ns#" lang="en" suppressHydrationWarning>
			<body className={primaryFont.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="root">
						<main>{children}</main>
						<Script
							async
							src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
							crossOrigin="anonymous"
						/>
						<Script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID}`}
						/>
						<Script id="google-analytics" strategy="afterInteractive">
							{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){window.dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID}');
					`}
						</Script>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
