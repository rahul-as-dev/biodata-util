# --- Build stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Build React app
COPY . .
RUN npm run build

# --- Serve stage ---
FROM node:18-alpine
WORKDIR /app

# Install lightweight static server
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=builder /app/build ./build

# Cloud Run expects the app to listen on $PORT
ENV PORT=8080

# Expose for local debugging (optional)
EXPOSE 8080

# Use serve to serve the static files
CMD ["serve", "-s", "build", "-l", "8080"]
