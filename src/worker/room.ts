import { DurableObject } from 'cloudflare:workers'

// Room messages are small JSON objects; this bounds anything unexpected.
const MAX_MESSAGE_LENGTH = 64_000

/**
 * One instance per room. Like the old socket.io server, it only relays: every
 * message goes to everyone in the room, including the sender. The host's
 * browser keeps the room state. Hibernation keeps idle rooms from being billed.
 */
export class Room extends DurableObject<Env> {
	async fetch(): Promise<Response> {
		const [client, server] = Object.values(new WebSocketPair())
		this.ctx.acceptWebSocket(server)
		return new Response(null, { status: 101, webSocket: client })
	}

	async webSocketMessage(_socket: WebSocket, message: string | ArrayBuffer) {
		if (typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) return
		for (const socket of this.ctx.getWebSockets()) {
			try {
				socket.send(message)
			} catch {
				// The socket is closing; it will be dropped from getWebSockets().
			}
		}
	}

	async webSocketClose(socket: WebSocket, code: number, reason: string) {
		socket.close(code, reason)
	}
}
