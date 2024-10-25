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
import { POINT_CODES, DEFAULT_STORY_POINTS } from '@/utils/constants'
import { useLocalStorage } from 'usehooks-ts'

type HostData = {
	nameOfHost: string
	userId: string
	roomUrl: string
	hostRoomUrl: string
}

type DemoData = {
	demoMode: boolean
	demoNumberUsers: number | undefined
	demoPointPercent: number | undefined
}

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const { roomId } = params
	const [disabledShowPointsButton, setDisabledShowPointsButton] = useState<boolean>(false)

	const [{ nameOfHost, userId: hostId, roomUrl, hostRoomUrl }, setHostData] =
		useLocalStorage<HostData>('scrumPokerLaMerHostData', {
			nameOfHost: '',
			userId: '',
			roomUrl: '',
			hostRoomUrl: '',
		})

	const demoMode = nameOfHost.toLowerCase().includes('demo')
	const splitNameOfHost = nameOfHost.split('-')
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

	const [allUsersPoints, setAllUsersPoints] = useLocalStorage<ListenerRes[]>(
		'scrumPokerLaMerStoryPoints',
		[],
	)

	const { allUsersPointsData, updateUsersPoints } = useUpdateUsersPoints({
		allUsersPointsEmitter,
		hostId: hostId,
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need to add updateUsersPoints or roomId to useEffect dependency array as this should only run once when the page loads
	useEffect(() => {
		allUsersPoints && updateUsersPoints(allUsersPoints)

		socketEmitter('join-room', {
			roomId: roomId,
			message: hostPoints,
			userName: nameOfHost,
			userId: hostId,
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
				message: roomUrl,
				userName: nameOfHost,
				userId: hostId,
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
			userName: nameOfHost,
			userId: hostId,
		})
	}

	function allUsersPointsEmitter(allUsersPointsData: ListenerRes[]) {
		setAllUsersPoints(allUsersPointsData)
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUsersPointsData,
			userName: nameOfHost,
			userId: hostId,
		})
	}

	const handleShowPoints = () => {
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: true as unknown as string,
			userName: nameOfHost,
			userId: hostId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	const handleClearPoints = () => {
		const clearedPoints = allUsersPointsData.map((data: ListenerRes) => {
			return { ...data, message: data.message === -77 ? data.message : POINT_CODES.RESET }
		})
		updateUsersPoints(clearedPoints)
		socketEmitter('show-disable-reset-points', {
			roomId: roomId,
			message: false as unknown as string,
			userName: nameOfHost,
			userId: hostId,
		})
		setDisabledShowPointsButton(!disabledShowPointsButton)
	}

	const handleShowHostCard = (isShow: boolean) => {
		const hostPoints = isShow ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST
		socketEmitter('user-story-point', {
			roomId: roomId,
			message: hostPoints,
			userName: nameOfHost,
			userId: hostId,
		})
		setShowHostCard(isShow)
	}

	return (
		<div className='w-full h-full relative animate-in fade-in-0 duration-1000 '>
			<AnimatedFish />
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<div className='flex flex-col justify-start items-center gap-6'>
					<h1 className='text-center text-2xl sm:text-3xl text-gray-300'>
						Host: Scrum Poker sous la Mer
					</h1>
					<RoomInfo roomUrl={roomUrl} nameOfHost={nameOfHost} />
				</div>
				<div className='pt-2 w-full flex flex-col justify-start items-center gap-8 md:gap-12'>
					<div className='flex flex-row justify-between items-start md:self-end gap-x-12'>
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
					<RoomMainUi
						roomId={roomId}
						userName={nameOfHost}
						userId={hostId}
						hostId={hostId}
						showHostCard={showHostCard}
					/>
				</div>

				<div
					className='absolute top-4 right-4 sm:right-16 tooltip tooltip-bottom'
					data-tip='Host Settings'
				>
					<HostSettingsButton
						hostRoomUrl={hostRoomUrl}
						roomUrl={roomUrl}
						allowedPointsEmitter={allowedPointsEmitter}
						defaultStoryPointValues={DEFAULT_STORY_POINTS}
						allowedStoryPoints={allowedStoryPoints}
						setAllowedStoryPoints={setAllowedStoryPoints}
						showHostCard={showHostCard}
						handleShowHostCard={handleShowHostCard}
					/>
				</div>
				<div className='absolute top-4 left-4 sm:left-12 flex flex-row flex-start items-center gap-8 scale-90'>
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
