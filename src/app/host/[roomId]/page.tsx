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

	const [isCopied, setIsCopied] = useState(false)

	const { roomId } = params

	console.count('>>> Host room component body')

	const defaultStoryPointValues = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100']
	const allowedPointsLocalStorage = localStorage.getItem('scrumDivingAllowedStoryPoints')
	console.log('%c>>> allowedPointsLocalStorage', 'color: #f60', allowedPointsLocalStorage)
	const startingAllowedPoints = allowedPointsLocalStorage
		? JSON.parse(allowedPointsLocalStorage)
		: defaultStoryPointValues
	console.log('%c>>> startingAllowedPoints', 'color: red', startingAllowedPoints)

	const [allowedStoryPoints, setAllowedStoryPoints] = useState<string[]>(startingAllowedPoints)

	const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
	const hostName = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostName
	const roomUrl: string = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.roomUrl

	// emitter for host joining room
	useEffect(() => {
		socketEmitter('join-room', { roomId: roomId, message: 'join', userName: hostName })
	}, [roomId, hostName])

	useSocketListener('user-story-point', {
		onChange: (storyPointRes) => {
			// console.log('%c>>> storypoints listener', 'color: red', storyPointRes)

			setAllUserPointData((prevUsersPoints) => {
				const index = prevUsersPoints.findIndex((data) => {
					return data.userName === storyPointRes.userName
				})
				// TODO: Consider updating entire object for user and not only message
				// if timestamp is used to remove users who have not submitted points
				//in a specfic time frame.
				let newAllPointsState: ListenerRes[] = []
				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]
					noDuplicates[index].message = storyPointRes.message
					// console.log('%c>>> noDuplicates SP', 'color: red', noDuplicates)
					newAllPointsState = noDuplicates
				} else {
					newAllPointsState = [...prevUsersPoints, storyPointRes]
				}
				console.log('%c>>> newAllPointsState storyPoints:', 'color: #5f0', newAllPointsState)
				// when someone joins the room, emit the allUserPointData
				allUsersPointsEmitter(newAllPointsState)
				// set the allUserPointData state with new user data
				return newAllPointsState
			})
		},
	})

	useSocketListener('join-room', {
		onChange: (joinRoomRes) => {
			// console.log('%c>>> joinRoomRes', 'color: red', joinRoomRes)

			setAllUserPointData((prevUsersPoints) => {
				const index = prevUsersPoints.findIndex((data) => {
					return data.userName === joinRoomRes.userName
				})
				let newAllPointsState: ListenerRes[] = []
				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]
					noDuplicates[index].message = joinRoomRes.message
					// console.log('%c>>> noDuplicates JR', 'color: #f0f', noDuplicates)
					newAllPointsState = noDuplicates
				} else {
					newAllPointsState = [...prevUsersPoints, joinRoomRes]
					console.log('%c>>> newAllPointsState join:', 'color: #f0f', newAllPointsState)
				}
				// when someone joins the room, emit the allUserPointData
				allUsersPointsEmitter(newAllPointsState)
				// set the allUserPointData state with new user data
				return newAllPointsState
			})

			// TODO: consider consolidating host-room-info and
			// allowed-story-points into one emitter.
			// This would require message use an object like this:
			// { roomUrl: string, allowedPoints: string[] }

			// when someone joins the room, emit allowedStoryPoints
			allowedPointsEmitter(allowedStoryPoints)

			// when someone joins the room, emit hostName & roomUrl
			socketEmitter('host-room-info', {
				roomId: roomId,
				message: roomUrl,
				userName: hostName,
			})
		},
	})

	function allowedPointsEmitter(allowedPoints: string[], localStorage = false) {
		console.log('%c>>> allowedPointsEmitter', 'color: #5f0', allowedPoints)
		const localStorageValue = localStorage ? 'scrumDivingAllowedStoryPoints' : ''
		socketEmitter('allowed-story-points', {
			roomId: roomId,
			message: allowedPoints,
			userName: hostName,
			localStorageName: localStorageValue,
		})
	}

	function allUsersPointsEmitter(allUserPointData: ListenerRes[]) {
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUserPointData,
			userName: hostName,
			localStorageName: 'scrumDivingStoryPoints',
		})
	}

	// TODO: delete useSocketEmitterLocal below
	// once certain updated socketEmitter with options
	// works as intended and the same way as this hook.

	// useSocketEmitterLocal('all-users-story-points', {
	// 	roomId: roomId,
	// 	message: allUserPointData,
	// 	userName: hostName,
	// 	localStorageName: 'scrumDivingStoryPoints',
	// })

	const handleCopyUrl = () => {
		navigator.clipboard.writeText(roomUrl)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 5000)
	}

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: true as unknown as string,
			userName: hostName,
		})
	}

	const handleClearPoints = () => {
		const clearedPoints = allUserPointData.map((data: ListenerRes) => {
			return { ...data, message: '-' }
		})
		setAllUserPointData(clearedPoints)
		allUsersPointsEmitter(clearedPoints)
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: false as unknown as string,
			userName: hostName,
		})
	}

	return (
		<main className='px-16 py-12 relative flex flex-col justify-start items-center gap-8 w-full animate-in fade-in-0 duration-1000'>
			<div className='flex flex-col justify-start items-center gap-6'>
				<h1 className='text-3xl text-gray-300'>Host Scrum Diving Room</h1>
				<RoomInfo roomUrl={roomUrl} hostName={hostName} />
			</div>
			<div className='pt-2 w-full flex flex-col justify-start items-center gap-12'>
				<div className='w-[calc(50%+5rem)] flex flex-row justify-between items-start self-end gap-x-12'>
					<button
						type='button'
						onClick={handleCopyUrl}
						className={`w-40 btn btn-xs ${isCopied ? 'btn-copied' : 'btn-copy'}`}
					>
						{isCopied ? 'Copied to Clipboard' : 'Copy Room URL'}
					</button>
					<div className='flex flex-row flex-wrap-reverse justify-end items-center gap-x-8 gap-y-4'>
						<HostControlButton handler={handleShowPoints} color='success'>
							Show points
						</HostControlButton>
						<HostControlButton handler={handleClearPoints} color='error'>
							Clear Points
						</HostControlButton>
					</div>
				</div>
				<RoomMainUi roomId={roomId} userName={hostName} />
			</div>

			<div className='w-8 absolute top-6 right-16'>
				<HostSettingsButton
					roomId={roomId}
					roomUrl={roomUrl}
					allowedPointsEmitter={allowedPointsEmitter}
					defaultStoryPointValues={defaultStoryPointValues}
					setAllowedStoryPoints={setAllowedStoryPoints}
				/>
			</div>

			{/* TODO: Remove when development is done */}
			<div className='w-32 absolute top-2 left-8'>
				<Link href='/host' className='underline text-sky-500 hover:text-sky-300 text-sm'>
					Create Room
				</Link>
			</div>
		</main>
	)
}
