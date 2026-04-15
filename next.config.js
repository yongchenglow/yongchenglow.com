const createMDX = require("@next/mdx");

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const baseConfig = {
	output: "standalone",
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [75, 85],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
};

const withBundleAnalyzer = (() => {
	if (process.env.ANALYZE === "true") {
		try {
			const bundleAnalyzer = require("@next/bundle-analyzer");
			return bundleAnalyzer({ enabled: true });
		} catch (_err) {
			console.warn(
				"⚠️  @next/bundle-analyzer is not installed. Skipping bundle analysis.",
			);
		}
	}
	return (config) => config;
})();

module.exports = withBundleAnalyzer(withMDX(baseConfig));
