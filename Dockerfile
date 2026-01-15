# --- Build Stage ---
# Use Node 24 Slim (Debian-based) to ensure Tailwind 4 & React-PDF binaries work
FROM node:24-bookworm-slim AS builder

# Enable pnpm using Corepack (Node's built-in package manager manager)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# --frozen-lockfile: ensures we use exact versions from lockfile
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the app
# Increased memory limit to prevent Vite/Tailwind crashing
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm run build

# --- Serve Stage ---
# We use the same Slim base for runtime to avoid "missing shared library" errors
FROM node:24-bookworm-slim

WORKDIR /app

# Install 'serve' globally to host the static files
# We use npm here because it's simple for a global tool and avoids setting up pnpm again
RUN npm install -g serve

# Copy only the build artifacts from the builder stage
COPY --from=builder /app/dist ./build

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port
EXPOSE 8080

# Start the server
CMD ["serve", "-s", "build", "-l", "8080"]
