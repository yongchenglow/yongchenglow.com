#!/bin/sh
# The one entry point inside the Playwright image. e2e/docker.sh runs it
# locally and .github/workflows/e2e.yml runs it in CI, so both environments
# install and test with identical steps.
#
# Usage: sh e2e/run-in-container.sh [playwright test arguments]
set -eu

cd "$(dirname "$0")/.."

BUN_VERSION=$(node -p 'require("./package.json").packageManager.replace(/^bun@/, "")')
npm install --global --silent "bun@$BUN_VERSION"
bun install --frozen-lockfile --silent

exec bunx playwright test "$@"
