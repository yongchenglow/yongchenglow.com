export type AdPlacement = "home-after-projects" | "blog-index" | "article-end";

interface AdPlacementConfig {
	slotId: string;
	format: "auto" | "fluid";
	layout?: "in-article";
	containerClassName: string;
	reservedSpaceClassName: string;
}

export const AD_PLACEMENTS: Record<AdPlacement, AdPlacementConfig> = {
	"home-after-projects": {
		slotId: "5500217699",
		format: "auto",
		containerClassName: "max-w-4xl",
		reservedSpaceClassName: "min-h-24 sm:min-h-32",
	},
	"blog-index": {
		slotId: "9667543473",
		format: "auto",
		containerClassName: "max-w-3xl",
		reservedSpaceClassName: "min-h-24 sm:min-h-32",
	},
	"article-end": {
		slotId: "6890117148",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-prose",
		reservedSpaceClassName: "min-h-32 sm:min-h-44",
	},
};
