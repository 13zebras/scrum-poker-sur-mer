'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export type ListenerRes = {
	message: string | number
	userName: string
	imageNumber: number
	timeStamp: number
}

type EventName =
	| 'join-room'
	| 'host-room-info'
	| 'user-story-point'
	| 'show-disable-reset-points'
	| 'all-users-story-points'
	| 'allowed-story-points'

type EmitterOptions = {
	roomId: string
	message: string | number | ListenerRes[] | string[]
	userName: string
	imageNumber?: number
	localStorageName?: string
}

const socket = io()

// NOTE: this emittercan be used with any options, both on server and client.
// Emmitters, listeners, & server now use options object pattern.
export function socketEmitter(eventName: string, options: EmitterOptions) {
	const timeStamp = Date.now()

	socket.emit(eventName, {
		roomId: options.roomId,
		message: options.message,
		userName: options.userName,
		timeStamp: timeStamp,
		imageNumber: options.imageNumber,
	})
	if (options.localStorageName)
		localStorage.setItem(options.localStorageName, JSON.stringify(options.message))
}

type Config = {
	onChange: (data: ListenerRes) => void
}

export function useSocketListener(eventName: EventName, config?: Config) {
	const [listenerRes, setListenerRes] = useState<ListenerRes>()
	useEffect(() => {
		function onListenerRes(options: ListenerRes) {
			const { message, userName, imageNumber, timeStamp } = options
			console.log('%c>>> onListenerRes event, options:', 'color: red', eventName, options)

			setListenerRes({ message, userName, imageNumber, timeStamp })

			config?.onChange({ message, userName, imageNumber, timeStamp })
		}
		socket.on(eventName, onListenerRes)

		return () => {
			socket.off(eventName, onListenerRes)
		}
	}, [eventName, config])

	return listenerRes
}

// Generic Socket.io Emitter.
// Not sure it is needed, but keeping for now
export function socketEmitterGeneric<T extends unknown[]>(
	eventName: string,
	message: string,
	...args: T
) {
	socket.emit(eventName, message, ...args)
}

/*
***************************************************
** Other Socket.io code from socketIoDevToolss
** Probably not needed, but keeping for now
***************************************************

if (socket.connected) {
	onConnect()
}

function onConnect() {
	setIsConnected(true)
	setTransport(socket.io.engine.transport.name)

	socket.io.engine.on('upgrade', (transport) => {
		setTransport(transport.name)
	})
}

function onDisconnect() {
	setIsConnected(false)
	setTransport('N/A')
}

socket.on('connect', onConnect)
socket.on('disconnect', onDisconnect)

return () => {
	socket.off('connect', onConnect)
	socket.off('disconnect', onDisconnect)
}

useEffect(() => {
	function onChatEvent(message: string, roomId: string) {
		const timeStamp = Date.now().toString()
		setChatEvents((previous) => [
			...previous,
			{
				message: message,
				timeStamp: timeStamp,
				room: roomId,
			},
		])
	}
	function onUserConnectedEvent(roomId: string, userName: string) {
		console.log(
			'%c>>> userName, roomId:',
			'color: #5f0',
			userName,
			roomId,
		)
		const newMessage = `${userName} has joined Room ${roomId}`
		const timeStamp = Date.now().toString()
		setChatEvents((previous) => [
			...previous,
			{ message: newMessage, timeStamp: timeStamp, room: roomId },
		])
	}

	socket.on('chat', onChatEvent)
	socket.on('user-connected', onUserConnectedEvent)

	return () => {
		socket.off('chat', onChatEvent)
		socket.off('user-connected', onUserConnectedEvent)
	}
}, [])

***************************************************
*/
