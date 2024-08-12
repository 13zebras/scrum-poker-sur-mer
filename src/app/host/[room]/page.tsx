// HOST ROOM
'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import SocketIoTestSection from '@/components/socketIoTest/SocketIoTestSection'
import HostSettingsButton from '@/components/HostSettingsButton'
import HostControls from '@/components/HostControls'
import StoryPoints from '@/components/StoryPoints'
import CardsContainer from '@/components/CardsContainer'

export type ChatEvent = {
	message: string
	timeStamp: string
	room: string
}

export default function HostRooms({ params }: { params: { room: string } }) {
	const [roomId, setRoomId] = useState('')
	const [userName, setUserName] = useState('')

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const { room } = params

		console.log('%c>>> on load HOST ROOM roomId:', 'color: red', room)

		const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
		const hostData =
			hostDataLocalStorage && JSON.parse(hostDataLocalStorage)

		console.log('%c>>> hostData LocalStorage', 'color: red', hostData)
		const hostFirstName = hostData?.hostName

		socket.emit('join-room', room, hostFirstName)

		setRoomId(room)
		setUserName(hostFirstName)
	}, [])

	return (
		<main className='px-16 py-12 flex flex-col items-center gap-12 w-full'>
			<h1 className='text-3xl text-pink-600 pb-8'>
				HOST Scrum Diving Room
			</h1>
			<HostSettingsButton />
			<div className='text-2xl text-zinc-500 h-[60vh] w-full flex flex-col justify-start items-center gap-8'>
				<HostControls />
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
