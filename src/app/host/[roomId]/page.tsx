// HOST ROOM
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketEmitterLocal } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import HostControlButton from '@/components/HostControlButton'
import HostSettingsButton from '@/components/HostSettingsButton'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const [allUserPointData, setAllUserPointData] = useState<ListenerRes[]>([])
	// const storyPointRes = useSocketListener('story-points')
	// const joinRoomRes = useSocketListener('join-room')

	const { roomId } = params
	// console.log('%c>>> params', 'color: yellow', params)

	console.count('>>> Host room component body')

	useSocketListener('story-points', {
		onChange: (storyPointRes: ListenerRes) => {
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
		},
	})

	useSocketListener('join-room', {
		onChange: (joinRoomRes: ListenerRes) => {
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
		},
	})

	const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
	const hostName = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostName

	useEffect(() => {
		socketEmitter('join-room', roomId, 'join', hostName)
	}, [roomId, hostName])

	useSocketEmitterLocal(
		'all-users-story-points',
		roomId,
		allUserPointData,
		hostName,
		'scrumDivingStoryPoints',
	)

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', roomId, true as unknown as string, hostName)
	}

	const handleClearPoints = () => {
		const clearedPoints = allUserPointData.map((data: ListenerRes) => {
			return { ...data, message: '-' }
		})
		setAllUserPointData(clearedPoints)
		socketEmitter('show-disable-reset-points', roomId, false as unknown as string, hostName)
	}

	return (
		<main className='px-16 py-12 relative flex flex-col justify-start items-center gap-8 w-full animate-in fade-in-0 duration-1000'>
			<h1 className='text-3xl text-gray-300'>Host Scrum Diving Room</h1>
			<RoomInfo roomId={roomId} userName={hostName} />
			<div className='pt-2 w-full flex flex-col justify-start items-center gap-10'>
				<div className='w-full flex flex-row justify-end gap-12'>
					<HostControlButton handler={handleShowPoints} color='success'>
						Show points
					</HostControlButton>
					<HostControlButton handler={handleClearPoints} color='error'>
						Clear Points
					</HostControlButton>
				</div>
				<RoomMainUi roomId={roomId} userName={hostName} />
			</div>

			<div className='w-28 absolute top-10 right-16 flex flex-col gap-4'>
				<HostSettingsButton />
			</div>

			{/* TODO: Remove when development is done */}
			<div className='w-32 absolute top-10 left-16'>
				<Link href='/host' className='underline text-sky-500 hover:text-sky-300 text-sm'>
					Host Create Room
				</Link>
			</div>
		</main>
	)
}
