// HOST ROOM
'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import ConnectionManager from '@/components/socketIoTest/ConnectionManager'
import Events from '@/components/socketIoTest/Events'
import MessageForm from '@/components/socketIoTest/MessageForm'

export type ChatEvent = {
	message: string
	timeStamp: string
	room: string
}

type Props = {
	userName: string
	roomId: string
}

export default function SocketIoTestSection({ userName, roomId }: Props) {
	const [chatEvents, setChatEvents] = useState<ChatEvent[]>([])

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

	return (
		<div className='w-full flex flex-col items-start justify-start pt-8 mt-12 border-t-2 border-blue-700/80'>
			<h1 className='text-xl text-gray-300 pb-4'>
				Socket.io Test Section
			</h1>

			<div className='w-full flex flex-row items-center justify-start gap-2 font-mono'>
				<span className='text-gray-400'>Room:</span>
				<span className='text-gray-300'>{roomId}</span>
			</div>
			<div className='w-full flex flex-row items-center justify-start gap-2 font-mono'>
				<span className='text-gray-400'>User:</span>
				<span className='text-gray-300'>{userName}</span>
			</div>

			<MessageForm room={roomId} />
			<Events events={chatEvents} />

			<ConnectionManager />
		</div>
	)
}
