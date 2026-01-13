FROM oven/bun:1 as base
WORKDIR /app

COPY package.json .
COPY prisma ./prisma
RUN bun install

COPY . .
RUN bun x prisma generate

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
