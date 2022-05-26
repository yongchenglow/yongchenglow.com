# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --network-timeout 1000000

# Build the app
FROM node:16-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Run app
FROM node:16-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Only copy files required to run the app
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next


USER nextjs

EXPOSE 3000
CMD ["node_modules/.bin/next","start"]

# docker build -t <tag_name> <path>
# docker build -t example ./

# docker save <tag_name> > <tag_name>.tar
# docker save example example.tar

# docker load < example.tar

# docker images

# docker run -d -p <exposed_port>:<container_port> <image_name>
# docker run -d -p 3000:3000 example
