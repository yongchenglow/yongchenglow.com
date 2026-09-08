"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { AD_PLACEMENTS, type AdPlacement } from "@/src/config/ads";
import { cn } from "@/src/lib/utils";

declare global {
	interface Window {
		adsbygoogle: Record<string, unknown>[];
	}
}

interface AdSlotProps {
	placement: AdPlacement;
}

type AdState = "loading" | "filled" | "unavailable";

export const AdSlot = ({ placement }: AdSlotProps) => {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
	const config = AD_PLACEMENTS[placement];
	const adElementRef = useRef<HTMLModElement>(null);
	const initializedRef = useRef(false);
	const [adState, setAdState] = useState<AdState>("loading");

	const initializeAd = useCallback(() => {
		if (initializedRef.current || !adElementRef.current) return;

		try {
			window.adsbygoogle = window.adsbygoogle || [];
			window.adsbygoogle.push({});
			initializedRef.current = true;
		} catch {
			setAdState("unavailable");
		}
	}, []);

	useEffect(() => {
		const adElement = adElementRef.current;
		if (!adElement) return;

		const updateAvailability = () => {
			const status = adElement.dataset.adStatus;
			if (status === "filled") setAdState("filled");
			if (status === "unfilled") setAdState("unavailable");
		};

		const observer = new MutationObserver(updateAvailability);
		observer.observe(adElement, {
			attributes: true,
			attributeFilter: ["data-ad-status"],
		});
		updateAvailability();

		return () => observer.disconnect();
	}, []);

	if (!clientId) return null;

	return (
		<>
			<Script
				id="google-adsense"
				strategy="lazyOnload"
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
				crossOrigin="anonymous"
				onReady={initializeAd}
				onError={() => setAdState("unavailable")}
			/>
			<aside
				aria-label="Advertisement"
				data-ad-placement={placement}
				data-ad-state={adState}
				className={cn(
					"mx-auto my-12 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-4 py-5 sm:px-6",
					config.containerClassName,
					adState === "unavailable" && "hidden",
				)}
			>
				<p className="mb-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
					Advertisement
				</p>
				<ins
					ref={adElementRef}
					className={cn("adsbygoogle w-full", config.reservedSpaceClassName)}
					style={{ display: "block", textAlign: "center" }}
					data-ad-layout={config.layout}
					data-ad-format={config.format}
					data-full-width-responsive={
						config.format === "auto" ? "true" : undefined
					}
					data-ad-client={clientId}
					data-ad-slot={config.slotId}
				/>
			</aside>
		</>
	);
};
