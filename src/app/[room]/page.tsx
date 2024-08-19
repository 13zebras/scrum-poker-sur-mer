'use client'

import { useEffect, useState } from 'react'
import SocketIoInfo from '@/components/socketIoDevTools/SocketIoInfo'
import { socketRoomEmitter } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import { getRandomName } from '@/utils/sampleData'

type Params = {
	room: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')

	console.log('%c>>> params', 'color: red', params)

	const { room } = params

	useEffect(() => {
		if (user) return
		const newUser = getRandomName()
		const timeStamp = Date.now().toString()
		setUser(newUser)
		socketRoomEmitter('join-room', 'join', newUser, timeStamp, room)
		// }, [])
	}, [room, user])

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-12 w-full animate-fade-in-500'>
			<h1 className='text-3xl text-pink-600 pb-8'>
				USER Scrum Diving Room
			</h1>
			<div className='text-2xl text-zinc-500 h-full w-full flex flex-col justify-start items-center'>
				<RoomMainUi roomId={room} userName={user} />
			</div>

			{/*** Socket.io DevTools - Remove Before Release ***/}
			{/* <SocketIoInfo roomId={room} userName={user} /> */}
		</main>
	)
}
