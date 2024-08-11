'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import ConnectionManager from '@/components/ConnectionManager'
import Events from '@/components/Events'
import MessageForm from '@/components/MessageForm'

export type ChatEvent = {
	message: string
	timeStamp: string
	room: string
}

const user = Math.random().toString(36).substring(9).toUpperCase()

export default function Rooms({ params }: { params: { room: string } }) {
	const [isConnected, setIsConnected] = useState(false)
	const [transport, setTransport] = useState('N/A')
	const [roomId, setRoomId] = useState('')
	const [userName, setUserName] = useState('')
	const [chatEvents, setChatEvents] = useState<ChatEvent[]>([])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (socket.connected) {
			onConnect()
		}

		const { room } = params

		socket.emit('join-room', room, user)

		setRoomId(room)
		setUserName(user)

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
	}, [])

	useEffect(() => {
		function onChatEvent(message: string, roomIdServer: string) {
			const unixTimestamp = Date.now().toString()
			setChatEvents((previous) => [
				...previous,
				{ message: message, timeStamp: unixTimestamp, room: roomIdServer },
			])
		}
		function onUserConnectedEvent(roomId: string, userName: string) {
			console.log('%c>>> userName, roomId:', 'color: #5f0', userName, roomId)
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
		<main className='px-16 py-12 flex flex-col'>
			<div className='w-full h-5/6'>
				<h1>Scrum Diving Room </h1>
				<div className='text-2xl text-zinc-500'>Main player ui</div>
			</div>
			<div className='w-full max-w-[700px] flex flex-row items-center justify-start gap-2 font-mono'>
				<span className='text-gray-300'>Room:</span>
				<span className='text-gray-300'>{roomId}</span>
			</div>
			<div className='w-full max-w-[700px] flex flex-row items-center justify-start gap-2 font-mono'>
				<span className='text-gray-300'>User:</span>
				<span className='text-gray-300'>{userName}</span>
			</div>
			<div className='pt-8 flex flex-col text-zinc-300'>
				<span className='font-bold pb-1 font-mono'>Socket ID: {socket.id}</span>
				<span className=''>
					Status: {isConnected ? 'connected' : 'disconnected'}
				</span>
				<span className=''>Transport: {transport}</span>
			</div>
			<ConnectionManager />
			<MessageForm room={roomId} />
			<Events events={chatEvents} />
		</main>
	)
}
