'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import SocketIoTestSection from '@/components/socketIoTest/SocketIoTestSection'
import StoryPoints from '@/components/StoryPoints'
import CardsContainer from '@/components/CardsContainer'

export type ChatEvent = {
	message: string
	timeStamp: string
	room: string
}

export default function UserRooms({ params }: { params: { room: string } }) {
	const [roomId, setRoomId] = useState('')
	const [userName, setUserName] = useState('')
	// const [chatEvents, setChatEvents] = useState<ChatEvent[]>([])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const { room } = params

		console.log('%c>>> on user page load roomId:', 'color: red', room)

		const user = 'Bob'

		socket.emit('join-room', room, user)

		setRoomId(room)
		setUserName(user)
	}, [])

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-12 w-full'>
			<h1 className='text-3xl text-green-400'>USER Scrum Diving Room</h1>
			<div className='text-2xl text-zinc-500 h-[60vh] w-full flex flex-col justify-start items-center gap-8'>
				<div className='text-2xl text-zinc-500 h-full w-full flex flex-row gap-8 justify-start items-center'>
					<StoryPoints />
					<CardsContainer />
				</div>
			</div>

			{/*** Socket.io Test Section ***/}
			<SocketIoTestSection userName={userName} roomId={roomId} />
		</main>
	)
}
