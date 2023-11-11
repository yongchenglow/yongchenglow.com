# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --network-timeout 1000000

# Build the app
FROM node:20-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Run app
FROM node:20-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Only copy files required to run the app
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
