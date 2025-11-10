FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build the application
COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies based on lockfile
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output and required assets from the build stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.* ./
COPY --from=base /app/next.config.ts ./next.config.ts
COPY --from=base /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]

