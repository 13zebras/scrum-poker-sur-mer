'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

type ListenerRes = {
	messageServer: string
	roomIdServer: string
	userNameServer: string
}

export interface Event extends ListenerRes {
	timeStamp: string
}

const socket = io()

export function socketRoomEmitter(
	emitterName: string,
	message: string,
	roomId: string,
	userName: string,
) {
	socket.emit(emitterName, message, roomId, userName)
}

export function useSocketListener(listenerName: string) {
	const [listenerRes, setListenerRes] = useState<ListenerRes>({
		messageServer: '',
		roomIdServer: '',
		userNameServer: '',
	})
	useEffect(() => {
		function onListenerRes(
			messageServer: string,
			roomIdServer: string,
			userNameServer: string,
		) {
			setListenerRes({ messageServer, roomIdServer, userNameServer })
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
export function useListenerEvents(joinListener: string, dataListener: string) {
	const [events, setEvents] = useState<Event[]>([])

	useEffect(() => {
		function onListenerResponse(
			messageServer: string,
			roomIdServer: string,
			userNameServer: string,
		) {
			const unixTimestamp = Date.now().toString()
			setEvents((previous: Event[]) => [
				...previous,
				{
					messageServer: messageServer,
					roomIdServer: roomIdServer,
					userNameServer: userNameServer,
					timeStamp: unixTimestamp,
				},
			])
		}
		socket.on(joinListener, onListenerResponse)
		socket.on(dataListener, onListenerResponse)

		return () => {
			socket.off(joinListener, onListenerResponse)
			socket.off(dataListener, onListenerResponse)
		}
	}, [joinListener, dataListener])

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
	function onChatEvent(message: string, roomIdServer: string) {
		const unixTimestamp = Date.now().toString()
		setChatEvents((previous) => [
			...previous,
			{
				message: message,
				timeStamp: unixTimestamp,
				room: roomIdServer,
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
		const unixTimestamp = Date.now().toString()
		setChatEvents((previous) => [
			...previous,
			{ message: newMessage, timeStamp: unixTimestamp, room: roomId },
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
