# bun-api-hono

A lightweight Bun API server using Hono framework with automatic port discovery.

## Features

- Built with [Hono](https://hono.dev/) - Fast, Lightweight, Web Standards
- Automatic port discovery (starts with PORT env or 3000, increments if in use)
- TypeScript support
- Clean, minimalist API design

## Installation

To install dependencies:

```bash
bun install
```

## Usage

To run in development mode with hot reloading:

```bash
bun dev
```

To run in production mode:

```bash
bun start
```

Or run directly:

```bash
bun run index.ts
```

## How it works

This project uses a serverFactory utility that automatically finds an available port if the specified one is already in use. This means your Hono server will always start, even if the default port is occupied.

Basic usage example:

```typescript
import { Hono } from "hono";
import { createServer } from "./utils/serverFactory";

const app = new Hono();
app.get("/", (c) => c.text("Hello Bun!"));

const server = createServer({
  fetch: app.fetch,
});

console.log(`🚀 Server running at ${server.url}`);
```

You can also specify options:

```typescript
createServer({
  port: 8080, // Try this port first (defaults to PORT env or 3000)
  silent: true, // Don't log port retry messages
  fetch: app.fetch,
});
```
