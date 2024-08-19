'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export type ListenerRes = {
	message: string
	// roomId: string
	userName: string
	timeStamp: string
}

type AllUsersPointsRes = {
	message: ListenerRes[]
	// roomId: string
	userName: string
	timeStamp: string
}

const socket = io()

export function socketRoomEmitter(
	emitterName: string,
	message: string | ListenerRes[],
	userName: string,
	timeStamp: string,
	roomId: string,
) {
	socket.emit(emitterName, message, userName, timeStamp, roomId)
}

export function useAllUsersPointsListener(listenerName: string) {
	const [listenerRes, setListenerRes] = useState<AllUsersPointsRes>()
	useEffect(() => {
		function onListenerRes(
			message: ListenerRes[],
			// roomId: string,
			userName: string,
			timeStamp: string,
		) {
			setListenerRes({ message, userName, timeStamp })
			// setListenerRes({ message, roomId, userName, timeStamp })
		}
		socket.on(listenerName, onListenerRes)

		return () => {
			socket.off(listenerName, onListenerRes)
		}
	}, [listenerName])
	return listenerRes
}

export function useSocketListener(listenerName: string) {
	const [listenerRes, setListenerRes] = useState<ListenerRes>()
	useEffect(() => {
		function onListenerRes(
			message: string,
			// roomId: string,
			userName: string,
			timeStamp: string,
		) {
			setListenerRes({ message, userName, timeStamp })
			// setListenerRes({ message, roomId, userName, timeStamp })
		}
		socket.on(listenerName, onListenerRes)

		return () => {
			socket.off(listenerName, onListenerRes)
		}
	}, [listenerName])

	return listenerRes
}

// Only use this listener for the SocketIoInfo component to display
// events for testing purposes
export function useListenerEvents(
	joinListener: string,
	dataListener: string,
	pointsListener: string,
	usersPointsListener: string,
) {
	const [events, setEvents] = useState<ListenerRes[]>([])

	useEffect(() => {
		function onListenerResponse(
			message: string,
			userName: string,
			timeStamp: string,
		) {
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

// Generic Socket.io Emitter.
//Not sure it is needed, but keeping for now
export function socketEmitter<T extends unknown[]>(
	emitterName: string,
	message: string,
	...args: T
) {
	socket.emit(emitterName, message, ...args)
}
// EXAMPLE: socket.emit('client-message', message, roomId)

//
//
//
//
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


*/
