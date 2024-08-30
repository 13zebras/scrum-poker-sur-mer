'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export type ListenerRes = {
	message: string
	userName: string
	timeStamp: string
}

export type AllListenerRes = {
	message: ListenerRes[]
	userName: string
	timeStamp: string
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
	message: string | ListenerRes[] | string[]
	userName: string
	localStorageName?: string
}

const socket = io()

// NOTE: this can be used with any options, both on server and client.
// Emmitters, listeners, & server now use options object pattern.
export function socketEmitter(eventName: string, options: EmitterOptions) {
	const timeStamp = Date.now().toString()
	console.log(
		'%c>>> services-socketEmitter:\n',
		'color: #f0c',
		eventName,
		'\n',
		options.localStorageName,
		options,
	)
	socket.emit(eventName, {
		roomId: options.roomId,
		message: options.message,
		userName: options.userName,
		timeStamp: timeStamp,
	})
	if (options.localStorageName)
		localStorage.setItem(options.localStorageName, JSON.stringify(options.message))
}

// TODO: consider deleting useSocketEmitterLocal once certain
// updated socketEmitter with options (above)
// works as intended and the same way as this hook.
// I don't think app will need this useEffect to run any emits.
export function useSocketEmitterLocal(eventName: string, options: EmitterOptions) {
	useEffect(() => {
		const timeStamp = Date.now().toString()
		socket.emit(eventName, {
			roomId: options.roomId,
			message: options.message,
			userName: options.userName,
			timeStamp: timeStamp,
		})

		if (options.localStorageName)
			localStorage.setItem(options.localStorageName, JSON.stringify(options.message))
	}, [eventName, options])
}

type Config = {
	onChange: (data: ListenerRes) => void
}

type OnListenerOptions = {
	message: string
	userName: string
	timeStamp: string
}

export function useSocketListener(eventName: EventName, config?: Config) {
	const [listenerRes, setListenerRes] = useState<ListenerRes>()

	useEffect(() => {
		function onListenerRes(options: OnListenerOptions) {
			const { message, userName, timeStamp } = options
			setListenerRes({ message, userName, timeStamp })
			// console.log('%c>>> config ', 'color: red', config)
			config?.onChange({ message, userName, timeStamp })
		}
		socket.on(eventName, onListenerRes)

		return () => {
			socket.off(eventName, onListenerRes)
		}
	}, [eventName, config])

	return listenerRes
}

// Generic Socket.io Emitter.
//Not sure it is needed, but keeping for now
export function socketEmitterGeneric<T extends unknown[]>(
	eventName: string,
	message: string,
	...args: T
) {
	socket.emit(eventName, message, ...args)
}

/* 
***************************************************
TODO: delete useListenerEvents once sure 
SocketIoInfo component is no longer needed. 
It was only for dev purposes.
***************************************************

export function useListenerEvents(
	joinListener: string,
	dataListener: string,
	pointsListener: string,
	usersPointsListener: string,
) {
	const [events, setEvents] = useState<ListenerRes[]>([])

	useEffect(() => {
		function onListenerResponse(message: string, userName: string, timeStamp: string) {
			setEvents((previous: ListenerRes[]) => [
				{
					message: message,
					userName: userName,
					timeStamp: timeStamp,
				},
				...previous,
			])
		}
		socket.on(joinListener, onListenerResponse)
		socket.on(dataListener, onListenerResponse)
		socket.on(pointsListener, onListenerResponse)
		socket.on(usersPointsListener, onListenerResponse)

		return () => {
			socket.off(joinListener, onListenerResponse)
			socket.off(dataListener, onListenerResponse)
			socket.off(pointsListener, onListenerResponse)
			socket.off(usersPointsListener, onListenerResponse)
		}
	}, [joinListener, dataListener, pointsListener, usersPointsListener])

	return events
}

***************************************************
*/

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
