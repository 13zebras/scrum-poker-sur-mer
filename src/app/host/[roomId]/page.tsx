'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import HostControlButton from '@/components/HostControlButton'
import HostSettingsButton from '@/components/HostSettingsButton'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import HostDevButtons from '@/components/socketIoDevTools/HostDevButtons'

export const POINT_CODES = {
	JOIN: -99,
	HIDE_HOST: -77,
	RESET: -33,
	QUESTION: -1,
}

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const [allUsersPointsData, setAllUsersPointsData] = useState<ListenerRes[]>([])

	const hostCardLocalStorage = localStorage.getItem('scrumDivingShowHostCard')
	const hostCardShow: boolean = hostCardLocalStorage && JSON.parse(hostCardLocalStorage)

	const [showHostCard, setShowHostCard] = useState<boolean>(hostCardShow)

	console.log('%c>>> hostCardLocalStorage', 'color: red', hostCardLocalStorage)

	const { roomId } = params
	const demoMode = roomId.includes('demomode')
	const splitRoomId = roomId.split('-')
	const numDemoUsers = splitRoomId[1] ? Number.parseInt(splitRoomId[1]) : 0

	// NOTE: these values are passed to the story point buttons.
	// The radio buttons will submit one of these values as strings.
	const defaultStoryPointValues = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100']
	const allowedPointsLocalStorage = localStorage.getItem('scrumDivingAllowedStoryPoints')
	// console.log('%c>>> allowedPointsLocalStorage', 'color: #f60', allowedPointsLocalStorage)
	const startingAllowedPoints = allowedPointsLocalStorage
		? JSON.parse(allowedPointsLocalStorage)
		: defaultStoryPointValues
	// console.log('%c>>> startingAllowedPoints', 'color: red', startingAllowedPoints)

	const [allowedStoryPoints, setAllowedStoryPoints] = useState<string[]>(startingAllowedPoints)

	const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
	const hostName = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostName
	const roomUrl: string = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.roomUrl
	const hostRoomUrl: string = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostRoomUrl

	// emitter for host joining room
	useEffect(() => {
		console.log('%c>>> showHostCard', 'color: red', showHostCard)
		const hostPoints = showHostCard ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST
		socketEmitter('join-room', { roomId: roomId, message: hostPoints, userName: hostName })
		localStorage.setItem('scrumDivingShowHostCard', JSON.stringify(showHostCard))
	}, [roomId, hostName, showHostCard])

	useSocketListener('join-room', {
		onChange: (joinRoomRes) => {
			console.log('%c>>> joinRoomRes', 'color: red', joinRoomRes)
			// console.log('%c>>> allUsersPointsData.length', 'color: red', allUsersPointsData.length)

			// add imageNumber to the user who joined the room
			// TODO: because of adding and removing host, you need to always find the max imageNumber and add 1 to it to get the next imageNumber.
			const maxImageNumber = allUsersPointsData.reduce(
				(max, user) => (user.imageNumber > max ? user.imageNumber : max),
				allUsersPointsData[0]?.imageNumber ?? 0,
			)
			console.log('%c>>> maxImageNumber', 'color: #4f0', maxImageNumber)
			const userJoinWithImageNumber = {
				...joinRoomRes,
				imageNumber: maxImageNumber + 1,
			}

			// console.log('%c>>> userJoinWithImageNumber', 'color: red', userJoinWithImageNumber)

			setAllUsersPointsData((prevUsersPoints: ListenerRes[]) => {
				const index = prevUsersPoints.findIndex((data) => {
					return data.userName === userJoinWithImageNumber.userName
				})
				let newAllPointsState: ListenerRes[] = []
				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]
					if (userJoinWithImageNumber.message === POINT_CODES.HIDE_HOST) {
						noDuplicates.splice(index, 1)
					} else {
						noDuplicates[index].message = userJoinWithImageNumber.message
					}
					console.log('%c>>> noDuplicates JR', 'color: yellow', noDuplicates)
					newAllPointsState = noDuplicates
				} else if (userJoinWithImageNumber.message === POINT_CODES.HIDE_HOST) {
					return [...prevUsersPoints]
				} else {
					newAllPointsState = [...prevUsersPoints, userJoinWithImageNumber]
				}
				console.log('%c>>> newAllPointsState join:', 'color: #f0f', newAllPointsState)
				// when someone joins the room, emit the allUsersPointsData
				allUsersPointsEmitter(newAllPointsState)
				// set the allUsersPointsData state with new user data
				return newAllPointsState
			})

			// TODO consider consolidating host-room-info and
			// allowed-story-points into one emitter.
			// This would require message to use an object like this:
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

	useSocketListener('user-story-point', {
		onChange: (storyPointRes) => {
			// console.log('%c>>> storypoints listener', 'color: red', storyPointRes)

			setAllUsersPointsData((prevUsersPoints) => {
				const index = prevUsersPoints.findIndex((data) => {
					return data.userName === storyPointRes.userName
				})

				// TODO Consider updating entire object for user, not only the message.
				// At least update the timestamp so it can be used to remove users
				// who have not submitted points in 30 minutes.
				let newAllPointsState: ListenerRes[] = []
				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]
					noDuplicates[index].message = storyPointRes.message
					// console.log('%c>>> noDuplicates SP', 'color: red', noDuplicates)
					newAllPointsState = noDuplicates
				} else {
					newAllPointsState = [...prevUsersPoints, storyPointRes]
				}
				// console.log('%c>>> newAllPointsState storyPoints:', 'color: #5f0', newAllPointsState)

				// when someone joins the room, emit the allUsersPointsData so new user
				// has all current users and points
				allUsersPointsEmitter(newAllPointsState)

				// set the allUsersPointsData state with new user data
				return newAllPointsState
			})
		},
	})

	function allowedPointsEmitter(allowedPoints: string[], localStorage = false) {
		// console.log('%c>>> allowedPointsEmitter', 'color: #5f0', allowedPoints)
		const localStorageValue = localStorage ? 'scrumDivingAllowedStoryPoints' : ''
		socketEmitter('allowed-story-points', {
			roomId: roomId,
			message: allowedPoints,
			userName: hostName,
			localStorageName: localStorageValue,
		})
	}

	function allUsersPointsEmitter(allUsersPointsData: ListenerRes[]) {
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUsersPointsData,
			userName: hostName,
			localStorageName: 'scrumDivingStoryPoints',
		})
	}

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: true as unknown as string,
			userName: hostName,
		})
	}

	const handleClearPoints = () => {
		const clearedPoints = allUsersPointsData.map((data: ListenerRes) => {
			return { ...data, message: POINT_CODES.RESET }
		})
		setAllUsersPointsData(clearedPoints)
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
				<h1 className='text-3xl text-gray-300'>Host: Scrum Under the Sea</h1>
				<RoomInfo roomUrl={roomUrl} hostName={hostName} />
			</div>
			<div className='pt-2 w-full flex flex-col justify-start items-center gap-12'>
				<div className='flex flex-row justify-between items-start self-end gap-x-12'>
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

			<div className='absolute top-4 right-16'>
				<HostSettingsButton
					hostRoomUrl={hostRoomUrl}
					roomUrl={roomUrl}
					allowedPointsEmitter={allowedPointsEmitter}
					defaultStoryPointValues={defaultStoryPointValues}
					allowedStoryPoints={allowedStoryPoints}
					setAllowedStoryPoints={setAllowedStoryPoints}
					showHostCard={showHostCard}
					setShowHostCard={setShowHostCard}
				/>
			</div>
			<div className='absolute top-4 left-12 flex flex-row flex-start items-center gap-8 scale-90'>
				<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-28 px-1 text-xs'>
					Create Room
				</Link>
				{demoMode && (
					<HostDevButtons
						allUsersPoints={allUsersPointsData}
						onSetAllUsersPoints={setAllUsersPointsData}
						allUsersPointsEmitter={allUsersPointsEmitter}
						numDemoUsers={numDemoUsers}
					/>
				)}
			</div>
		</main>
	)
}
