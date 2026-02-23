# Devcontainer base image for Node + pnpm + Docker CLI (features add tooling)
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install helpful packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Default workdir is handled by devcontainer.json features.