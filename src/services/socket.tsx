import { useEffect, useState } from 'react'

export type ListenerRes = {
	message: string | number
	userName: string
	userId: string
	timeStamp: number
}

type EventName =
	| 'join-room'
	| 'host-room-info'
	| 'user-story-point'
	| 'show-disable-reset-points'
	| 'all-users-story-points'
	| 'allowed-story-points'
	| 'animation-setting'

type EmitterOptions = {
	roomId: string
	message: string | number | ListenerRes[] | string[]
	userName: string
	userId: string
}

type Payload = EmitterOptions & { event: string; timeStamp: number }

const listeners = new Map<string, Set<(data: ListenerRes) => void>>()
const maxRetryDelay = 30_000

// One connection per browser tab, to the room of the most recent emit.
let socket: WebSocket | undefined
let socketRoomId: string | undefined
let pending: Payload[] = []
let lastJoin: Payload | undefined
let retryDelay = 1_000
let retryTimer: ReturnType<typeof setTimeout> | undefined

function dispatch(data: string) {
	let payload: Payload
	try {
		payload = JSON.parse(data)
	} catch {
		return
	}
	const { message, userName, userId, timeStamp } = payload
	for (const listener of listeners.get(payload.event) ?? []) {
		listener({ message: message as ListenerRes['message'], userName, userId, timeStamp })
	}
}

function connect(roomId: string, isReconnect = false) {
	const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
	const ws = new WebSocket(`${protocol}://${window.location.host}/ws/${encodeURIComponent(roomId)}`)
	socket = ws
	socketRoomId = roomId

	ws.addEventListener('open', () => {
		retryDelay = 1_000
		// socket.io rejoined rooms automatically; do the same so the host
		// re-sends the room state after a dropped connection.
		if (isReconnect && lastJoin) ws.send(JSON.stringify({ ...lastJoin, timeStamp: Date.now() }))
		for (const payload of pending) ws.send(JSON.stringify(payload))
		pending = []
	})
	ws.addEventListener('message', (event) => dispatch(String(event.data)))
	ws.addEventListener('close', () => {
		// A replaced socket was closed on purpose; only retry the current one.
		if (socket !== ws) return
		socket = undefined
		retryTimer = setTimeout(() => connect(roomId, true), retryDelay)
		retryDelay = Math.min(retryDelay * 2, maxRetryDelay)
	})
}

function switchRoom(roomId: string) {
	clearTimeout(retryTimer)
	const previous = socket
	socket = undefined
	previous?.close()
	pending = []
	lastJoin = undefined
	connect(roomId)
}

export function socketEmitter(eventName: string, options: EmitterOptions) {
	const payload: Payload = {
		event: eventName,
		roomId: options.roomId,
		message: options.message,
		userName: options.userName,
		userId: options.userId,
		timeStamp: Date.now(),
	}

	if (socketRoomId !== options.roomId) switchRoom(options.roomId)
	if (eventName === 'join-room') lastJoin = payload

	if (socket?.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(payload))
	} else {
		pending.push(payload)
	}
}

type Config = {
	onChange: (data: ListenerRes) => void
}

export function useSocketListener(eventName: EventName, config?: Config) {
	const [listenerRes, setListenerRes] = useState<ListenerRes>()
	useEffect(() => {
		function onListenerRes(data: ListenerRes) {
			setListenerRes(data)
			config?.onChange(data)
		}
		const eventListeners = listeners.get(eventName) ?? new Set()
		listeners.set(eventName, eventListeners)
		eventListeners.add(onListenerRes)

		return () => {
			eventListeners.delete(onListenerRes)
		}
	}, [eventName, config])

	return listenerRes
}
