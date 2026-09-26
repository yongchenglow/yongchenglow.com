import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

// Port 3100 keeps the suite from silently reusing a `bun run dev` server on
// 3000, which would test development output instead of the production build.
const LOCAL_PORT = 3100;

// When BASE_URL is set, the suite targets an already deployed site, such as a
// review app or production, and no local server is started.
const remoteBaseURL = process.env.BASE_URL;
const baseURL = remoteBaseURL ?? `http://127.0.0.1:${LOCAL_PORT}`;

// Review apps are public today. If they move behind Cloudflare Access, a
// service token supplied through these variables authenticates every request.
const cloudflareAccessHeaders: Record<string, string> =
	process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET
		? {
				"CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID,
				"CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET,
			}
		: {};

export default defineConfig({
	testDir: "./e2e",
	// `bun test` collects every *.test.* and *.spec.* file in the repository.
	// A distinct suffix keeps Playwright specs out of the unit test run.
	testMatch: "**/*.e2e.ts",
	// Chromium antialiases text differently on arm64 and x64, so each
	// architecture keeps its own baselines: arm64 from Docker on Apple Silicon,
	// x64 from the CI runners. See e2e/AGENTS.md for how each is updated.
	snapshotPathTemplate: `{testDir}/{testFileName}-snapshots/{arg}{-projectName}{-platform}-${process.arch}{ext}`,
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 2 : undefined,
	reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
	expect: {
		toHaveScreenshot: {
			animations: "disabled",
			maxDiffPixelRatio: 0.01,
		},
	},
	use: {
		baseURL,
		extraHTTPHeaders: cloudflareAccessHeaders,
		reducedMotion: "reduce",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium-desktop",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "chromium-mobile",
			use: { ...devices["Pixel 7"] },
		},
	],
	webServer: remoteBaseURL
		? undefined
		: {
				command: "bun run build && bun run e2e:serve",
				url: baseURL,
				env: { PORT: String(LOCAL_PORT), HOSTNAME: "127.0.0.1" },
				reuseExistingServer: !isCI,
				// A cold production build takes a few minutes on a CI runner.
				timeout: 5 * 60 * 1000,
				stdout: "pipe",
			},
});
