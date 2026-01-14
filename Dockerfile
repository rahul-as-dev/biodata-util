# --- Build stage ---
FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build React app
# Vite typically outputs to "dist"
RUN pnpm run build

# --- Serve stage ---
FROM node:18-alpine
WORKDIR /app

# Install lightweight static server
# We can stick with standard npm for this global tool, or use pnpm. It doesn't matter much for runtime.
# But since we are just running a binary, npm run is fine.
RUN npm install -g serve

# Copy build output from previous stage
# CHANGE: "build" -> "dist" (Vite default)
COPY --from=builder /app/dist ./build

# Cloud Run expects the app to listen on $PORT
ENV PORT=8080

# Expose for local debugging (optional)
EXPOSE 8080

# Use serve to serve the static files
# serve -s build (because we copied dist INTO a folder named build on line 32)
CMD ["serve", "-s", "build", "-l", "8080"]
