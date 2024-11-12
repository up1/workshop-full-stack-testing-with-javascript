# Use an official Node.js runtime based on Alpine Linux as the base image
FROM node:20-alpine AS builder
# Set the working directory inside the container
WORKDIR /usr/src/app
# Install dependencies required for the build
RUN apk add --no-cache bash openssl3
# Copy package.json, package-lock.json, and TypeScript configuration files
COPY package.json yarn.lock tsconfig.json ./
# Install the application dependencies
RUN yarn
# Copy the application code and other necessary files into the container
COPY . ./
# Make the script executable and build the application
RUN npx prisma generate && \
    yarn build

# Use a new, clean base image for the runtime
FROM node:20-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache bash
COPY --from=builder /usr/src/app/ ./
EXPOSE 5000
CMD ["node", "dist/index.js"]