# Build arguments for versioning and metadata
# BUN_VERSION is passed from CI (reads from package.json packageManager).
# The default keeps `docker build` working without --build-arg; keep it in sync
# with the `packageManager` field in package.json.
ARG BUN_VERSION=1.4.2

# Stage 1: Builder
FROM oven/bun:${BUN_VERSION}-alpine AS builder
WORKDIR /app

# Install all dependencies including dev dependencies for build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Runner
FROM oven/bun:${BUN_VERSION}-alpine AS runner

# Metadata arguments
ARG BUN_VERSION
ARG BUILD_DATE
ARG REVISION
ARG VERSION

# Add metadata labels to final image
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.authors="yongchenglow" \
      org.opencontainers.image.url="https://github.com/yongchenglow/yongchenglow" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${REVISION}" \
      org.opencontainers.image.title="Yong Cheng Low" \
      org.opencontainers.image.description="Personal website built with Next.js" \
      org.opencontainers.image.base.name="oven/bun:${BUN_VERSION}-alpine"

# Patch openssl ahead of the upstream base image. oven/bun:${BUN_VERSION}-alpine
# currently ships libcrypto3/libssl3 3.5.7-r0, which Trivy flags as HIGH under
# CVE-2026-14456; 3.5.8-r0 carries the fix. Drop this once upstream rebuilds.
RUN apk upgrade --no-cache libcrypto3 libssl3

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# The oven/bun image already provides a non-root `bun` user (uid/gid 1000)

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static

USER bun

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Probe with the Bun runtime that is already in the image, so the runner stage
# stays free of curl/wget. A non-2xx response exits non-zero and marks unhealthy.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD bun -e 'fetch("http://127.0.0.1:"+(process.env.PORT??3000)+"/").then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))'

# Start the application on the Bun runtime
CMD ["bun", "server.js"]
