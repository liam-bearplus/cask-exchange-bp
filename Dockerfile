###############################################################################
# 1. deps: Install all Node dependencies (including devDependencies)
###############################################################################
FROM node:20-alpine AS deps

# Install Python and other build tools required by node-gyp
RUN apk add --no-cache python3 make g++ git

WORKDIR /app

# Copy only package files to leverage caching
COPY package.json package-lock.json ./

# Clean install all dependencies (including devDependencies)
# Use --no-cache to ensure fresh packages
# Added --legacy-peer-deps flag to ignore peer dependency conflicts
RUN npm ci --no-cache --legacy-peer-deps


###############################################################################
# 2. builder: Build the Next.js app
###############################################################################
FROM node:20-alpine AS builder

# Install Python and build tools for the builder stage as well
RUN apk add --no-cache python3 make g++ git bash

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Now copy the entire project (node_modules is excluded via .dockerignore)
COPY . .

# Define build arguments for environment variables
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set environment variables for build time
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Run the build script to create the production .next directory
RUN npm run build

###############################################################################
# 3. production: Create a lean production image
###############################################################################
FROM node:20-alpine AS production

# Install Python and build tools for production dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

ENV NODE_ENV=production

# Copy only the needed files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Install only production dependencies with clean install
RUN npm ci --only=production --no-cache --legacy-peer-deps --ignore-scripts

EXPOSE 3000
CMD ["npm", "start"]