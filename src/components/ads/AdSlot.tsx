"use client";

import { useEffect, useRef, useState } from "react";
import {
	AD_FILL_TIMEOUT_MS,
	AD_PLACEMENTS,
	type AdPlacement,
} from "@/src/config/ads";
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

	// The adsbygoogle queue is a plain array until the loader script replaces it,
	// so pushing here works whether or not the script has arrived yet. The loader
	// itself lives in the root layout, shared by every placement.
	useEffect(() => {
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

		// A blocked or failed loader never writes data-ad-status at all, so fall
		// back to collapsing rather than reserving space indefinitely.
		const timeout = setTimeout(() => {
			setAdState((current) =>
				current === "loading" ? "unavailable" : current,
			);
		}, AD_FILL_TIMEOUT_MS);

		return () => {
			observer.disconnect();
			clearTimeout(timeout);
		};
	}, []);

	if (!clientId) return null;

	return (
		<aside
			aria-label="Advertisement"
			data-ad-placement={placement}
			data-ad-state={adState}
			className={cn(
				"mx-auto my-8 border-t border-border/50 pt-2",
				config.containerClassName,
				adState === "unavailable" && "hidden",
			)}
		>
			<p className="mb-2 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
				Sponsored &middot; Advertisement
			</p>
			<ins
				ref={adElementRef}
				className={cn("adsbygoogle w-full", config.reservedSpaceClassName)}
				style={{ display: "block", textAlign: "center" }}
				data-ad-layout={config.layout}
				data-ad-format={config.format}
				data-ad-client={clientId}
				data-ad-slot={config.slotId}
			/>
		</aside>
	);
};
