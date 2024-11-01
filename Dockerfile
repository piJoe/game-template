FROM node:19 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY game ./game
RUN npm run build-server
Run npm prune --production

FROM node:19

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/game/build/index.mjs ./

CMD ["node", "index.mjs"]