FROM node:19-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json . /
COPY quiz ./quiz

RUN npm install
RUN npm run build-server

FROM node:19-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/quiz/build/index.mjs ./
COPY quiz/animedb.sqlite /app/animedb.sqlite

CMD ["node", "index.mjs"]