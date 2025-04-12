/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'standalone',
};

const withBundleAnalyzer = (() => {
  if (process.env.ANALYZE === 'true') {
    try {
      const bundleAnalyzer = require('@next/bundle-analyzer');
      return bundleAnalyzer({ enabled: true });
    } catch (err) {
      console.warn(
        '⚠️  @next/bundle-analyzer is not installed. Skipping bundle analysis.',
      );
    }
  }
  return (config) => config;
})();

module.exports = withBundleAnalyzer(baseConfig);
