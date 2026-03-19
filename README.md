# Trekking Challenge Tracker

## Getting Started

There are two ways to set up the development environment:

### Option 1: Using Dev Container (recommended — requires Docker only)

1. Open the project in a dev container (e.g. via VS Code's "Reopen in Container" feature).
2. Install dependencies:
   ```sh
   bun install
   ```
3. Start the database:
   ```sh
   docker compose up
   ```
4. Start the development server:
   ```sh
   bun run dev
   ```

### Option 2: Local Development (requires Bun and Docker)

1. Install dependencies:
   ```sh
   bun install
   ```
2. Start the database:
   ```sh
   docker compose up
   ```
3. Start the development server:
   ```sh
   bun run dev
   ```

## Building

To create a production version of your app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.
