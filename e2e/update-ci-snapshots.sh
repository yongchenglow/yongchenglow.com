#!/bin/sh
# Downloads the x64 visual baselines that CI rendered for the current commit
# into e2e/visual.e2e.ts-snapshots/. The Review App run uploads them whenever
# a visual snapshot changed or was added, and fails until they are committed.
#
# Commit and push the downloaded files yourself; that push re-runs the checks.
set -eu

cd "$(dirname "$0")/.."

SHA=$(git rev-parse HEAD)
RUN_ID=$(gh run list --workflow review-app.yml --commit "$SHA" --limit 1 \
	--json databaseId --jq '.[0].databaseId // empty')

if [ -z "$RUN_ID" ]; then
	echo "No Review App run for $SHA. Push the commit and open a pull request first." >&2
	exit 1
fi

echo "Waiting for Review App run $RUN_ID to finish..."
gh run watch "$RUN_ID" >/dev/null

if ! gh run download "$RUN_ID" --name visual-snapshots-x64 --dir e2e/visual.e2e.ts-snapshots; then
	echo "Run $RUN_ID uploaded no changed baselines; the x64 snapshots already match." >&2
	exit 1
fi

echo "Review the changed PNGs, then commit and push them:"
git status --short e2e/visual.e2e.ts-snapshots
