'use client'

import { useEffect, useState } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import HostControlsContainer from '@/components/HostControlsContainer'
// import HostSettingsButton from '@/components/HostSettingsButton'
import RoomMainUi from '@/components/RoomMainUi'
// import RoomInfo from '@/components/RoomInfo'
import useUpdateUsersPoints from '@/utils/hooks/useUpdateUserPoints'
import AnimatedFish from '@/components/AnimatedFish'
import { POINT_CODES, DEFAULT_STORY_POINTS } from '@/utils/constants'
import { useLocalStorage } from 'usehooks-ts'
import HostTools from '@/components/HostTools'
import dynamic from 'next/dynamic'

const RoomInfo = dynamic(() => import('@/components/RoomInfo'), { ssr: false })
const HostSettings = dynamic(() => import('@/components/HostSettings'), { ssr: false })

export type HostData = {
	nameOfHost: string
	userId: string
	roomUrl: string
	hostRoomUrl: string
}

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const { roomId } = params
	const [disabledShowPointsButton, setDisabledShowPointsButton] = useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// const [{ nameOfHost, userId: hostId, roomUrl, hostRoomUrl }, setHostData] =
	const [hostData, setHostData] = useLocalStorage<HostData>('scrumPokerLaMerHostData', {
		nameOfHost: '',
		userId: '',
		roomUrl: '',
		hostRoomUrl: '',
	})
	const demoMode = hostData.nameOfHost.toLowerCase().includes('demo')
	const splitNameOfHost = hostData.nameOfHost.split('-')
	const demoNumberUsers = splitNameOfHost[1] ? Number.parseInt(splitNameOfHost[1]) : undefined
	const demoPointPercent = splitNameOfHost[2] ? Number.parseInt(splitNameOfHost[2]) : undefined
	const [showHostCard, setShowHostCard] = useLocalStorage<boolean>(
		'scrumPokerLaMerShowHostCard',
		false,
	)
	const hostPoints = showHostCard ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST
	const [allowedStoryPoints, setAllowedStoryPoints] = useLocalStorage<string[]>(
		'scrumPokerLaMerAllowedStoryPoints',
		DEFAULT_STORY_POINTS,
	)
	const [allUsersPointsLocal, setAllUsersPointsLocal] = useLocalStorage<ListenerRes[]>(
		'scrumPokerLaMerStoryPoints',
		[],
	)
	const { allUsersPoints, updateUsersPoints } = useUpdateUsersPoints({
		allUsersPointsEmitter,
		hostId: hostData.userId,
	})

	const [animationSetting] = useLocalStorage<string>('scrumPokerLaMerAnimationSetting', 'medium')

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need to add updateUsersPoints or roomId to useEffect dependency array as this should only run once when the page loads
	useEffect(() => {
		if (allUsersPointsLocal) {
			updateUsersPoints(allUsersPointsLocal)
		}

		socketEmitter('join-room', {
			roomId: roomId,
			message: hostPoints,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
	}, [])

	useSocketListener('join-room', {
		onChange: (joinRoomRes) => {
			updateUsersPoints(joinRoomRes)

			// when someone joins the room, emit allowedStoryPoints
			allowedPointsEmitter(allowedStoryPoints)

			// when someone joins the room, emit nameOfHost & roomUrl
			socketEmitter('host-room-info', {
				roomId: roomId,
				message: hostData.roomUrl,
				userName: hostData.nameOfHost,
				userId: hostData.userId,
			})
			socketEmitter('animation-setting', {
				roomId: roomId,
				message: animationSetting,
				userName: hostData.nameOfHost,
				userId: hostData.userId,
			})
		},
	})

	useSocketListener('user-story-point', {
		onChange: (storyPointRes) => {
			updateUsersPoints(storyPointRes)
		},
	})

	function allowedPointsEmitter(allowedPoints: string[]) {
		setAllowedStoryPoints(allowedPoints)
		socketEmitter('allowed-story-points', {
			roomId: roomId,
			message: allowedPoints,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
	}

	function allUsersPointsEmitter(allUsersPointsData: ListenerRes[]) {
		setAllUsersPointsLocal(allUsersPointsData)
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUsersPointsData,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
	}

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: true as unknown as string,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	const handleClearPoints = () => {
		const clearedPoints = allUsersPoints.map((data: ListenerRes) => {
			return { ...data, message: data.message === -77 ? data.message : POINT_CODES.RESET }
		})
		updateUsersPoints(clearedPoints)
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: false as unknown as string,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	const handleShowHostCard = (isShow: boolean) => {
		const hostPoints = isShow ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST
		socketEmitter('user-story-point', {
			roomId: roomId,
			message: hostPoints,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
		setShowHostCard(isShow)
	}

	console.log('%c>>> isDialogOpen', 'color: red', isDialogOpen)

	return (
		<div className='w-full h-full relative duration-500'>
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto z-10'>
				<HostTools
					allUsersPoints={allUsersPoints}
					allowedStoryPoints={allowedStoryPoints}
					updateUsersPoints={updateUsersPoints}
					demoMode={demoMode}
					demoNumberUsers={demoNumberUsers}
					demoPointPercent={demoPointPercent}
					isDialogOpen={isDialogOpen}
				/>
				<div className='flex flex-col justify-start items-center gap-6'>
					<h1 className='text-center text-2xl md:text-3xl text-gray-300'>
						Host: Scrum Poker sous la Mer
					</h1>
					<RoomInfo
						roomUrl={hostData.roomUrl}
						nameOfHost={hostData.nameOfHost}
						isDialogOpen={isDialogOpen}
					/>
				</div>
				<HostSettings
					hostData={hostData}
					allowedPointsEmitter={allowedPointsEmitter}
					defaultStoryPointValues={DEFAULT_STORY_POINTS}
					allowedStoryPoints={allowedStoryPoints}
					setAllowedStoryPoints={setAllowedStoryPoints}
					showHostCard={showHostCard}
					handleShowHostCard={handleShowHostCard}
					isDialogOpen={isDialogOpen}
					setIsDialogOpen={setIsDialogOpen}
				/>
				<div className='pt-2 w-full flex flex-col justify-start items-center gap-8 md:gap-12'>
					<HostControlsContainer
						handleShowPoints={handleShowPoints}
						disabledShowPointsButton={disabledShowPointsButton}
						handleClearPoints={handleClearPoints}
						isDialogOpen={isDialogOpen}
					/>
					<RoomMainUi
						roomId={roomId}
						userName={hostData.nameOfHost}
						userId={hostData.userId}
						hostId={hostData.userId}
						showHostCard={showHostCard}
						isDialogOpen={isDialogOpen}
					/>
				</div>
			</main>
			<AnimatedFish isDialogOpen={isDialogOpen} />
		</div>
	)
}
