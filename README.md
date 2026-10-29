# Scrum Poker La Mer

Planning poker for scrum teams. TanStack Start on Cloudflare Workers.

- `src/routes`: pages (`/`, `/host`, `/host/$roomId`, `/$roomId`)
- `src/worker`: Worker entry and the `Room` Durable Object
  - `/ws/<roomId>` upgrades to a WebSocket held by that room's Durable Object
  - The Durable Object only relays messages to everyone in the room; the host's browser keeps the room state
- `src/services/socket.tsx`: browser WebSocket client with reconnect

## Scripts

```sh
pnpm run dev        # local dev server on http://localhost:3000
pnpm run test
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run deploy     # wrangler deploy (production)
pnpm run cf-typegen # regenerate worker-configuration.d.ts after editing wrangler.jsonc
```
