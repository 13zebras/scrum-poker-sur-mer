// HOST ROOM
'use client'

import { useEffect, useState } from 'react'
import SocketIoInfo from '@/components/socketIoDevTools/SocketIoInfo'

import { socketRoomEmitter } from '@/services/socket'
import HostSettingsButton from '@/components/HostSettingsButton'
import HostControls from '@/components/HostControls'
import RoomMainUi from '@/components/RoomMainUi'

export default function HostRooms({ params }: { params: { room: string } }) {
	const { room } = params

	console.log('%c>>> HOST ROOM roomId:', 'color: #5f0', room)

	const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
	const hostData = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)

	console.log(
		'%c>>> HOST ROOM hostData from LocalStorage',
		'color: yellow',
		hostData,
	)
	const hostFirstName = hostData?.hostName

	useEffect(() => {
		socketRoomEmitter('join-room', 'Room Joined', room, hostFirstName)
	}, [room, hostFirstName])

	return (
		<main className='px-16 py-12 flex flex-col justify-start items-center gap-12 w-full animate-fade-in-150'>
			<h1 className='text-3xl text-pink-600 pb-8'>
				HOST Scrum Diving Room
			</h1>
			<div className='text-2xl text-zinc-500 w-full flex flex-col justify-start items-center gap-10'>
				<HostControls />
				<RoomMainUi />
			</div>

			{/*** Socket.io DevTools - Remove Before Release ***/}
			<SocketIoInfo roomId={room} userName={hostFirstName} />
			<HostSettingsButton />
		</main>
	)
}
