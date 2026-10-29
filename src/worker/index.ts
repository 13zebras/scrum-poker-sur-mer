import start from '@tanstack/react-start/server-entry'

export { Room } from './room'

const roomSocketPath = /^\/ws\/([A-Za-z0-9_-]{1,64})$/

export default {
	fetch(request: Request, env: Env): Promise<Response> | Response {
		const match = new URL(request.url).pathname.match(roomSocketPath)
		if (!match) return start.fetch(request)
		if (request.headers.get('Upgrade') !== 'websocket') {
			return new Response('Expected a WebSocket upgrade', { status: 426 })
		}
		return env.ROOMS.getByName(match[1]).fetch(request)
	},
} satisfies ExportedHandler<Env>
