'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export type ListenerRes = {
	message: string | number
	userName: string
	userId: string
	// imageNumber: number
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
	userId: string
	// imageNumber?: number
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
		userId: options.userId,
		timeStamp: timeStamp,
		// imageNumber: options.imageNumber,
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
			// const { message, userName, userId, imageNumber, timeStamp } = options
			const { message, userName, userId, timeStamp } = options
			console.log(
				'%c>>> onListenerRes socket.id, event, options:\n',
				'color: red',
				eventName,
				'\n',
				socket.id,
				options,
			)

			// setListenerRes({ message, userName, userId, imageNumber, timeStamp })
			setListenerRes({ message, userName, userId, timeStamp })

			// config?.onChange({ message, userName, userId, imageNumber, timeStamp })
			config?.onChange({ message, userName, userId, timeStamp })
		}
		socket.on(eventName, onListenerRes)

		return () => {
			socket.off(eventName, onListenerRes)
		}
	}, [eventName, config])

	return listenerRes
}
