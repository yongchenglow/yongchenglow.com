import Script from "next/script";
import { useId } from "react";

const AppScript = () => {
	const googleAnalyticsId = useId();
	return (
		<>
			<Script
				async
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
				crossOrigin="anonymous"
			/>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID}`}
			/>
			<Script async id={googleAnalyticsId} strategy="afterInteractive">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID}');
            `}
			</Script>
		</>
	);
};

export default AppScript;
