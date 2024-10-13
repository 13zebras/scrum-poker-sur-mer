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
import HostDemoButtons from '@/components/socketIoDevTools/HostDemoButtons'
import useUpdateUsersPoints from '@/utils/hooks/useUpdateUserPoints'
import AnimatedFish from '@/components/AnimatedFish'

export const POINT_CODES = {
	JOIN: -99,
	HIDE_HOST: -77,
	RESET: -33,
	QUESTION: -1,
}

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const hostCardLocalStorage = localStorage.getItem('scrumPokerLaMerShowHostCard')
	const hostCardShow: boolean = hostCardLocalStorage && JSON.parse(hostCardLocalStorage)
	const [disabledShowPointsButton, setDisabledShowPointsButton] = useState<boolean>(false)
	const [showHostCard, setShowHostCard] = useState<boolean>(hostCardShow)
	const { allUsersPointsData, updateUsersPoints } = useUpdateUsersPoints({
		allUsersPointsEmitter,
	})

	const { roomId } = params

	// NOTE: for demo mode, add '-DEMO-numberDemoUsers-percentDemoPoints'
	// to the roomId
	const demoMode = roomId.includes('DEMO')
	const splitRoomId = roomId.split('-')
	const demoNumberUsers = splitRoomId[2] ? Number.parseInt(splitRoomId[2]) : 0
	const demoPointPercent = splitRoomId[3] ? Number.parseInt(splitRoomId[3]) : undefined

	// NOTE: these values are passed to the story point buttons.
	// The radio buttons will submit one of these values as strings.
	const defaultStoryPointValues = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100']
	const allowedPointsLocalStorage = localStorage.getItem('scrumPokerLaMerAllowedStoryPoints')
	const startingAllowedPoints = allowedPointsLocalStorage
		? JSON.parse(allowedPointsLocalStorage)
		: defaultStoryPointValues

	const [allowedStoryPoints, setAllowedStoryPoints] = useState<string[]>(startingAllowedPoints)

	const hostDataLocalStorage = localStorage.getItem('scrumPokerLaMerHostData')
	const nameOfHost = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.nameOfHost
	const userId = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.userId
	const roomUrl: string = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.roomUrl
	const hostRoomUrl: string = hostDataLocalStorage && JSON.parse(hostDataLocalStorage)?.hostRoomUrl

	// emitter for host joining room
	useEffect(() => {
		const hostPoints = showHostCard ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST
		socketEmitter('join-room', {
			roomId: roomId,
			message: hostPoints,
			userName: nameOfHost,
			userId: userId,
		})
		localStorage.setItem('scrumPokerLaMerShowHostCard', JSON.stringify(showHostCard))
	}, [roomId, nameOfHost, showHostCard, userId])

	useSocketListener('join-room', {
		onChange: (joinRoomRes) => {
			// add imageNumber to the user who joined the room

			const maxImageNumber = allUsersPointsData.reduce(
				(max, user) => (user.imageNumber > max ? user.imageNumber : max),
				allUsersPointsData[0]?.imageNumber ?? 0,
			)
			const userJoinWithImageNumber = {
				...joinRoomRes,
				imageNumber: maxImageNumber + 1,
			}

			updateUsersPoints(userJoinWithImageNumber)

			// when someone joins the room, emit allowedStoryPoints
			allowedPointsEmitter(allowedStoryPoints)

			// when someone joins the room, emit nameOfHost & roomUrl
			socketEmitter('host-room-info', {
				roomId: roomId,
				message: roomUrl,
				userName: nameOfHost,
				userId: userId,
			})
		},
	})

	useSocketListener('user-story-point', {
		onChange: (storyPointRes) => {
			updateUsersPoints(storyPointRes)
		},
	})

	function allowedPointsEmitter(allowedPoints: string[], localStorage = false) {
		const localStorageValue = localStorage ? 'scrumPokerLaMerAllowedStoryPoints' : ''
		socketEmitter('allowed-story-points', {
			roomId: roomId,
			message: allowedPoints,
			userName: nameOfHost,
			userId: userId,
			localStorageName: localStorageValue,
		})
	}

	function allUsersPointsEmitter(allUsersPointsData: ListenerRes[]) {
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUsersPointsData,
			userName: nameOfHost,
			userId: userId,
			localStorageName: 'scrumPokerLaMerStoryPoints',
		})
	}

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: true as unknown as string,
			userName: nameOfHost,
			userId: userId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	const handleClearPoints = () => {
		const clearedPoints = allUsersPointsData.map((data: ListenerRes) => {
			return { ...data, message: POINT_CODES.RESET }
		})
		updateUsersPoints(clearedPoints)
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: false as unknown as string,
			userName: nameOfHost,
			userId: userId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	return (
		<div className='w-full h-full relative animate-in fade-in-0 duration-1000'>
			<AnimatedFish />
			<main className='px-16 py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<div className='flex flex-col justify-start items-center gap-6'>
					<h1 className='text-3xl text-gray-300'>Host: Scrum Poker sous la Mer</h1>
					<RoomInfo roomUrl={roomUrl} nameOfHost={nameOfHost} />
				</div>
				<div className='pt-2 w-full flex flex-col justify-start items-center gap-12'>
					<div className='flex flex-row justify-between items-start self-end gap-x-12'>
						<div className='flex flex-row flex-wrap-reverse justify-end items-center gap-x-8 gap-y-4'>
							<HostControlButton
								handler={handleShowPoints}
								color='success'
								disabled={disabledShowPointsButton}
							>
								Show points
							</HostControlButton>
							<HostControlButton
								handler={handleClearPoints}
								color='error'
								disabled={!disabledShowPointsButton}
							>
								Clear Points
							</HostControlButton>
						</div>
					</div>
					<RoomMainUi roomId={roomId} userName={nameOfHost} userId={userId} />
				</div>

				<div className='absolute top-4 right-16 tooltip tooltip-bottom' data-tip='Host Settings'>
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
					<div className='tooltip tooltip-bottom text-xs' data-tip='Click to Create a New Room'>
						<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-28 px-1 text-xs'>
							Create Room
						</Link>
					</div>
					{demoMode && (
						<HostDemoButtons
							allUsersPoints={allUsersPointsData}
							allowedStoryPoints={allowedStoryPoints}
							updateUsersPoints={updateUsersPoints}
							demoNumberUsers={demoNumberUsers}
							demoPointPercent={demoPointPercent}
						/>
					)}
				</div>
			</main>
		</div>
	)
}
