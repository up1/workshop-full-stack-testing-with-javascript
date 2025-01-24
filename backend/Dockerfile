FROM node:20-alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache openssl3
COPY package.json yarn.lock tsconfig.json ./
RUN yarn
COPY . ./
RUN npx prisma generate && \
    yarn build

FROM node:20-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache bash curl
COPY --from=builder /usr/src/app/ ./
EXPOSE 5000
CMD ["node", "dist/index.js"]