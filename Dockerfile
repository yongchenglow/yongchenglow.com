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

# Start the application on the Bun runtime
CMD ["bun", "server.js"]
