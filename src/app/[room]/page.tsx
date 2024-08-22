'use client'

import { useEffect, useState, useRef } from 'react'
// import SocketIoInfo from '@/components/socketIoDevTools/SocketIoInfo'
import { socketRoomEmitter } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import NewUserDialog from '@/components/NewUserDialog'

type Params = {
	room: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')
	const [isJoinClicked, setIsJoinClicked] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)
	console.log('%c>>> params', 'color: red', params)

	const { room } = params

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}, [])

	useEffect(() => {
		console.log('%c>>> user', 'color: red', user)
		if (!user || !isJoinClicked) return
		const timeStamp = Date.now().toString()
		socketRoomEmitter('join-room', 'join', user, timeStamp, room)
	}, [room, user, isJoinClicked])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setUser(event.target.value)
	}

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-8 w-full animate-fade-in-500'>
			<NewUserDialog
				dialogRef={dialogRef}
				handleOnChange={handleOnChange}
				onJoinClick={() => setIsJoinClicked(true)}
			/>
			<h1 className='text-3xl text-gray-300'>Scrum Diving Room</h1>
			<RoomInfo roomId={room} userName={user} />
			<div className='h-full w-full pt-14 flex flex-col justify-start items-center'>
				<RoomMainUi roomId={room} userName={user} />
			</div>

			{/*** Socket.io DevTools - Remove Before Release ***/}
			{/* <SocketIoInfo roomId={room} userName={user} /> */}
		</main>
	)
}
