FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install --verbose --no-progress

COPY game ./game
RUN npm run build-server
Run npm prune --production

FROM node:23-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/game/build/index.mjs ./

CMD ["node", "index.mjs"]