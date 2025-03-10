import { Hono } from "hono";
import { createServer } from "./utils/serverFactory";

const app = new Hono();
app
  .get("/", (c) => c.text("Hello Bun!"))
  .get("/users", (c) =>
    c.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ])
  );

const server = createServer({
  fetch: app.fetch,
});

console.log(`🚀 Server running at ${server.url}`);
