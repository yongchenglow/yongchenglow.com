# BUN_VERSION is extracted from package.json (packageManager) by CI. DHI
# publishes an exact patch tag, so the base images below resolve to the same
# Bun the lockfile and `engines` declare rather than drifting with the 1.4
# series. DHI_BUN_TAG stays a separate argument because CI still passes it.
ARG BUN_VERSION=1.4.2
ARG DHI_BUN_TAG=1.4.2

# Stage 1: Builder
FROM dhi.io/bun:${DHI_BUN_TAG}-debian-dev AS builder
WORKDIR /app

# Install all dependencies including dev dependencies for build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Runner
FROM dhi.io/bun:${DHI_BUN_TAG}-debian AS runner

# Metadata arguments. BUN_VERSION is redeclared because an ARG set before the
# first FROM goes out of scope inside a build stage.
ARG BUN_VERSION
ARG DHI_BUN_TAG
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
      org.opencontainers.image.base.name="dhi.io/bun:${DHI_BUN_TAG}-debian"

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder --chown=65532:65532 /app/public ./public
COPY --from=builder --chown=65532:65532 /app/.next/standalone ./
COPY --from=builder --chown=65532:65532 /app/.next/static ./.next/static

# DHI runtime images run as the nonroot user (UID 65532) and intentionally do
# not include a shell or package manager.
USER 65532:65532

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application on the Bun runtime
CMD ["bun", "server.js"]
