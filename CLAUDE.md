# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`tienda-en-linea` is a Node.js/Express REST API backend for an online store. The frontend directory exists but is empty — all active code lives under `backent/`.

## Commands

```bash
# Start the database (required before running the app)
cd backent && docker compose up -d

# Run the server
cd backent && node src/app.js

# Generate RSA key pair for JWT signing (run once on setup)
cd backent && node generator.js
```

There are no lint or test scripts configured. The `npm test` script in `package.json` is a stub.

## Environment Setup

Copy and populate `backent/.env`:

```
DB_HOST=localhost
DB_USER=<pg_user>
DB_PASSWORD=<pg_password>
DB_NAME=tiendaOnline
DB_PORT=5432
PORT_SERVER=3000
PRIVATE_KEY_PATH=./src/key/private.key
PUBLIC_KEY_PATH=./src/key/public.key
```

RSA keys must exist at the paths above before starting the server. Run `generator.js` to create them.

## Architecture

The app follows a **Controller → Service → Model** layered pattern.

- `src/app.js` — Express app entry, mounts all routers
- `src/routes/` — Route definitions, apply auth/role middleware here
- `src/controllers/` — Parse requests, call services, send responses
- `src/services/` — Business logic (no direct HTTP concerns)
- `src/models/sequelize/` — Sequelize model definitions
- `src/models/index.js` — All inter-model relationships (hasMany, belongsTo) defined here
- `src/middlewares/jwt.js` — Verifies Bearer token; attaches decoded payload to `req`
- `src/middlewares/roles.js` — Checks `req` payload for `type: "admin"`

## Data Model

```
User ──< Cart >── Product ──> Category
User ──< Order ──< DetailOrder >── Product
Order ──  Pay
```

Key fields: `User.type` is either `"user"` or `"admin"`. Admin status flows from the JWT payload checked in `roles.js`.

## Authentication

- **Registration/Login:** `POST /api/user/` and `POST /api/user/login` via `Auth.service.js`
- **Token:** JWT signed with RSA private key (RS256, 1h expiry)
- **Protected routes:** require `Authorization: Bearer <token>` header
- **Admin routes:** additionally require `type: "admin"` in the token payload

## Database

PostgreSQL is managed via Docker Compose (`backent/Docker-compose.yml`). Adminer is available at `http://localhost:8080` for GUI access. Sequelize syncs models on startup — schema changes go through model definitions, not raw migrations.
