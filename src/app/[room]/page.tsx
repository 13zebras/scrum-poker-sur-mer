'use client'

import { useEffect, useState } from 'react'
import SocketIoInfo from '@/components/socketIoDevTools/SocketIoInfo'
import { socketRoomEmitter } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import { getRandomName } from '@/utils/sampleData'

export default function UserRooms({ params }: { params: { room: string } }) {
	const [user, setUser] = useState('')
	const { room } = params

	useEffect(() => {
		const user = getRandomName()
		console.log('%c>>> roomId User params:', 'color: red', room, user)
		setUser(user)
		socketRoomEmitter('join-room', 'joined room', room, user)
	}, [room])

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-16 w-full animate-fade-in-500'>
			<h1 className='text-3xl text-green-400'>USER Scrum Diving Room</h1>
			<div className='text-2xl text-zinc-500 h-full w-full flex flex-col justify-start items-center'>
				<RoomMainUi />
			</div>

			{/*** Socket.io DevTools - Remove Before Release ***/}
			<SocketIoInfo roomId={room} userName={user} />
		</main>
	)
}
