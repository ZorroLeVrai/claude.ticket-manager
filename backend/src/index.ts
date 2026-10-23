import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { prisma } from "./lib/prisma";
import { auth } from "./lib/auth";
import { requireAuth } from "./middleware/requireAuth";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Must be mounted before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "unreachable" });
  }
});

app.get("/api/me", requireAuth, (_req, res) => {
  res.json(res.locals.user);
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
