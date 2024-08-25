'use client'

import { useEffect, useState, useRef } from 'react'
import { socketRoomEmitter } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import NewUserDialog from '@/components/NewUserDialog'

type Params = {
	room: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')
	const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)
	console.log('%c>>> params', 'color: red', params)

	const { room } = params

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}, [])

	function handleOnSubmit(formValues: { userName: string }) {
		console.log('%c>>> formValues', 'color: #5f0', formValues)
		if (!formValues.userName) {
			setDisplayErrorMessage(true)
			return
		}
		setUser(formValues.userName)
		// const timeStamp = Date.now().toString()
		socketRoomEmitter(
			'join-room',
			'join',
			formValues.userName,
			// timeStamp,
			room,
		)
		if (dialogRef.current) {
			dialogRef.current.close()
		}
	}

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-8 w-full animate-fade-in-500'>
			<NewUserDialog
				dialogRef={dialogRef}
				onSubmit={handleOnSubmit}
				displayError={displayErrorMessage}
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
