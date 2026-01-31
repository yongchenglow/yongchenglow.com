const createMDX = require("@next/mdx");

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const baseConfig = {
	output: "standalone",
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
