#!/bin/sh
# Runs the end-to-end suite inside the official Playwright image, the same
# Linux environment CI uses. Visual snapshots are created and compared here
# because fonts render differently on macOS.
#
# Usage: sh e2e/docker.sh [playwright test arguments]
set -eu

cd "$(dirname "$0")/.."

# The image tag must match the installed @playwright/test exactly, otherwise
# the browsers bundled in the image and the test runner disagree.
PLAYWRIGHT_VERSION=$(node -p 'require("./package.json").devDependencies["@playwright/test"]')
IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

# Run the host's native architecture explicitly. Docker otherwise reuses
# whichever platform of the image was pulled last, and an emulated browser
# renders nondeterministically. Snapshots are stored per architecture.
case "$(uname -m)" in
	arm64 | aarch64) PLATFORM=linux/arm64 ;;
	*) PLATFORM=linux/amd64 ;;
esac

# node_modules and the Next.js build live in named volumes so the host's macOS
# binaries (sharp, swc) never reach Linux, and the container's never reach the
# host. The volumes also cache installs and builds between runs.
exec docker run --rm --init --ipc=host --platform "$PLATFORM" \
	--volume "$PWD:/work" \
	--volume yongchenglow-e2e-node-modules:/work/node_modules \
	--volume yongchenglow-e2e-next:/work/.next \
	--workdir /work \
	--env CI=true \
	"$IMAGE" \
	sh e2e/run-in-container.sh "$@"
