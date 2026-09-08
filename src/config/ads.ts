export type AdPlacement =
	| "home-end"
	| "about-end"
	| "blog-index"
	| "article-mid"
	| "article-end";

interface AdPlacementConfig {
	slotId: string;
	format: "fluid";
	layout: "in-article";
	containerClassName: string;
	reservedSpaceClassName: string;
}

/**
 * How long to wait for AdSense to report a fill status before collapsing the
 * placement. Without this, a blocked or failed script leaves a labelled empty
 * frame holding reserved space forever.
 */
export const AD_FILL_TIMEOUT_MS = 3000;

/**
 * Posts shorter than this render the end placement only. A mid-article break
 * needs enough surrounding prose to read as a pause rather than an interruption.
 */
export const AD_MID_ARTICLE_MIN_WORDS = 1000;

/**
 * Every unit provisioned in AdSense is of type In-article, so each placement
 * declares the matching fluid format. Slot IDs are shared across posts rather
 * than assigned per post, so adding a post needs no dashboard work.
 */
export const AD_PLACEMENTS: Record<AdPlacement, AdPlacementConfig> = {
	"home-end": {
		slotId: "5500217699",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-3xl",
		reservedSpaceClassName: "min-h-20 sm:min-h-28",
	},
	"about-end": {
		slotId: "9784761849",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-3xl",
		reservedSpaceClassName: "min-h-20 sm:min-h-28",
	},
	"blog-index": {
		slotId: "9667543473",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-3xl",
		reservedSpaceClassName: "min-h-20 sm:min-h-28",
	},
	"article-mid": {
		slotId: "6890117148",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-prose",
		reservedSpaceClassName: "min-h-20 sm:min-h-28",
	},
	"article-end": {
		slotId: "7964413716",
		format: "fluid",
		layout: "in-article",
		containerClassName: "max-w-prose",
		reservedSpaceClassName: "min-h-20 sm:min-h-28",
	},
};
