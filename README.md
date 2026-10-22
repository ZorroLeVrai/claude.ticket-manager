# Ticket Manager

> **⚠️ Test application only — not for production use.**
> This project is a playground built for learning and experimentation. It has not been security-reviewed, hardened, or load-tested. Do not deploy it to production or use it with real customer data.

An AI-powered support ticket management system that classifies, summarizes, and suggests replies to incoming support tickets, freeing human agents to focus on complex issues.

See [`project-scope.md`](project-scope.md) for full requirements, [`tech-stack.md`](tech-stack.md) for the stack breakdown, and [`implementation-plan.md`](implementation-plan.md) for the phased task list.

## Planned Features

- Receive support emails and create tickets
- AI-powered ticket classification (general question, technical question, refund request)
- AI summaries and suggested replies, grounded in a knowledge base
- Ticket list with filtering and sorting, plus a ticket detail view
- Dashboard to view and manage all tickets
- User management (admin only), with Admin and Agent roles

> The project is under active development; not all features are implemented yet.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend (`frontend/`) | React 19, React Router v7, TypeScript, Tailwind CSS, Vite |
| Backend (`backend/`) | Bun, Express, TypeScript, Prisma, PostgreSQL |
| Auth | Database-backed sessions (session cookie, sent with `credentials: "include"`) |
| AI | Anthropic Claude API |

## Prerequisites

- [Bun](https://bun.sh/)
- A running PostgreSQL database

## Getting Started

```bash
# 1. Install dependencies (from the repo root; installs both workspaces)
bun install

# 2. Configure the backend
cp backend/.env.example backend/.env
# then edit backend/.env and set DATABASE_URL to your PostgreSQL instance

# 3. Set up the database
cd backend
bun run db:migrate
cd ..

# 4. Start both frontend and backend
bun run dev
```

Or run them individually:

```bash
cd backend && bun run dev    # API on http://localhost:3000 (override with PORT)
cd frontend && bun run dev   # Vite dev server
```

The frontend proxies `/api/*` requests to the backend. The target is configurable via the `VITE_API_URL` env var and defaults to `http://localhost:3000`.

## Useful Scripts

| Location | Command | Description |
|---|---|---|
| root | `bun run dev` | Run frontend and backend together |
| `backend/` | `bun run db:generate` | Generate the Prisma client |
| `backend/` | `bun run db:migrate` | Run Prisma migrations (dev) |
| `backend/` | `bun run db:studio` | Open Prisma Studio |
| `backend/` | `bun run build` | Type-check the backend |
| `frontend/` | `bun run build` | Type-check and build for production |
| `frontend/` | `bun run lint` | Lint with oxlint |

## Project Structure

```
ticket-manager/
├── backend/    # Express REST API (Bun, Prisma, PostgreSQL)
├── frontend/   # React SPA (Vite)
├── project-scope.md
├── tech-stack.md
└── implementation-plan.md
```

## Disclaimer

This is a test/learning project provided as-is, without warranty. It is **not intended for production** and should not handle real or sensitive data.
