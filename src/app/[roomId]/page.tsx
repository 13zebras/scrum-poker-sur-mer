'use client'

import { useEffect, useState, useRef } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import NewUserDialog from '@/components/NewUserDialog'

type Params = {
	roomId: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')
	const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)
	console.log('%c>>> params', 'color: red', params)

	const { roomId } = params

	const hostRoomInfo = useSocketListener('host-room-info')
	// const roomUrl = hostRoomInfo ? hostRoomInfo.message : ''
	const hostName = hostRoomInfo ? hostRoomInfo.userName : ''
	// console.log('%c>>> UserRoom: roomUrl', 'color: #0fd', roomUrl)
	console.log('%c>>> UserRoom: hostName', 'color: #5fb', hostName)

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
		socketEmitter('join-room', {
			roomId: roomId,
			message: 'join',
			userName: formValues.userName,
		})
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
			<RoomInfo hostName={hostName} userName={user} />
			<div className='h-full w-full pt-10 flex flex-col justify-start items-center'>
				<RoomMainUi roomId={roomId} userName={user} />
			</div>

			{/*** Socket.io DevTools - Remove Before Release ***/}
			{/* <SocketIoInfo roomId={roomId} userName={user} /> */}
		</main>
	)
}
