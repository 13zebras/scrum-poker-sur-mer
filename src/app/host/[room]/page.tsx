// HOST ROOM
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import SocketIoInfo from '@/components/socketIoDevTools/SocketIoInfo'
import { socketRoomEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import HostControlButton from '@/components/HostControlButton'
import HostSettingsButton from '@/components/HostSettingsButton'
import RoomMainUi from '@/components/RoomMainUi'

export default function HostRoom({ params }: { params: { room: string } }) {
	const [allUserPointData, setAllUserPointData] = useState<ListenerRes[]>([])
	const storyPointRes = useSocketListener('story-points')
	const joinRoomRes = useSocketListener('join-room')

	useEffect(() => {
		if (!storyPointRes) return

		console.log('%c>>> listener', 'color: red', storyPointRes)
		setAllUserPointData((prevUsersPoints) => {
			const index = prevUsersPoints.findIndex((data) => {
				return data.userName === storyPointRes.userName
			})
			if (index !== -1) {
				const noDuplicates = [...prevUsersPoints]
				noDuplicates[index].message = storyPointRes.message
				console.log('%c>>> noDuplicates SP', 'color: red', noDuplicates)
				return noDuplicates
			}
			return [...prevUsersPoints, storyPointRes]
		})
	}, [storyPointRes])

	useEffect(() => {
		if (!joinRoomRes) return

		console.log('%c>>> joinRoomRes', 'color: red', joinRoomRes)

		setAllUserPointData((prevUsersPoints) => {
			const index = prevUsersPoints.findIndex((data) => {
				return data.userName === joinRoomRes.userName
			})
			if (index !== -1) {
				const noDuplicates = [...prevUsersPoints]
				noDuplicates[index].message = joinRoomRes.message
				console.log('%c>>> noDuplicates JR', 'color: red', noDuplicates)
				return noDuplicates
			}
			return [...prevUsersPoints, joinRoomRes]
		})
	}, [joinRoomRes])

	const { room } = params

	const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
	const hostName =
		hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostName

	useEffect(() => {
		const timeStamp = Date.now().toString()
		socketRoomEmitter('join-room', 'join', hostName, timeStamp, room)
	}, [room, hostName])

	useEffect(() => {
		console.log(
			'%c>>> allUserPointData Host Room',
			'color: #f0f',
			allUserPointData,
		)
		const timeStamp = Date.now().toString()
		socketRoomEmitter(
			'all-users-story-points',
			allUserPointData,
			hostName,
			timeStamp,
			room,
		)
		localStorage.setItem(
			'scrumDivingStoryPoints',
			JSON.stringify([allUserPointData]),
		)
	}, [allUserPointData, room, hostName])

	const handleShowPoints = () => {
		const timeStamp = Date.now().toString()
		socketRoomEmitter('show-hide-points', 'show', hostName, timeStamp, room)
	}

	const handleClearPoints = () => {
		const timeStamp = Date.now().toString()
		socketRoomEmitter('show-hide-points', 'hide', hostName, timeStamp, room)
	}

	return (
		<main className='px-16 py-12 relative flex flex-col justify-start items-center gap-12 w-full animate-in fade-in-0 duration-1000'>
			<h1 className='text-3xl text-pink-600 pb-8'>
				HOST Scrum Diving Room
			</h1>
			<div className='text-2xl text-zinc-500 w-full flex flex-col justify-start items-center gap-10'>
				<RoomMainUi roomId={room} userName={hostName} />
			</div>
			<div className='w-36 absolute top-8 right-16 flex flex-col gap-4'>
				<HostSettingsButton />
				<HostControlButton handler={handleClearPoints} color='error'>
					Clear Points
				</HostControlButton>
				<HostControlButton handler={handleShowPoints} color='success'>
					Show points
				</HostControlButton>
			</div>

			{/*** Remove Before Release - DevTools ***/}
			<Link
				href='/host'
				className='absolute top-9 left-16 underline text-sky-500 hover:text-sky-300'
			>
				Host Create Room
			</Link>
			{/* <SocketIoInfo roomId={room} userName={hostName} /> */}
		</main>
	)
}
