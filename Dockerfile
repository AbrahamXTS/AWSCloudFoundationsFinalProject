FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS release
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

USER bun
EXPOSE 3000
CMD ["bun", "start"]
