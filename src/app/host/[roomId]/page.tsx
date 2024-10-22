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

type HostData = {
	nameOfHost: string
	userId: string
	roomUrl: string
	hostRoomUrl: string
}

export default function HostRoom({ params }: { params: { roomId: string } }) {
	const [disabledShowPointsButton, setDisabledShowPointsButton] = useState<boolean>(false)
	const [showHostCard, setShowHostCard] = useState<boolean>(false)
	const [hostData, setHostData] = useState<HostData>({
		nameOfHost: '',
		userId: '',
		roomUrl: '',
		hostRoomUrl: '',
	})
	const [allowedStoryPoints, setAllowedStoryPoints] = useState<string[]>(DEFAULT_STORY_POINTS)
	const { allUsersPointsData, updateUsersPoints } = useUpdateUsersPoints({
		allUsersPointsEmitter,
	})

	const { roomId } = params

	// NOTE: for demo mode, add '-DEMO-numberDemoUsers-percentDemoPoints'
	// to the roomId in the url
	const demoMode = roomId.includes('DEMO')
	const splitRoomId = roomId.split('-')
	const demoNumberUsers = splitRoomId[2] ? Number.parseInt(splitRoomId[2]) : 0
	const demoPointPercent = splitRoomId[3] ? Number.parseInt(splitRoomId[3]) : undefined

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need to add updateUsersPoints or roomId to useEffect dependency array as this should only run once when the page loads
	useEffect(() => {
		const allPointsLocalStorage = localStorage.getItem('scrumPokerLaMerStoryPoints')
		if (allPointsLocalStorage) {
			updateUsersPoints(JSON.parse(allPointsLocalStorage))
		}

		const hostCardLocalStorage = localStorage.getItem('scrumPokerLaMerShowHostCard')
		const hostCardShow: boolean = hostCardLocalStorage ? !!JSON.parse(hostCardLocalStorage) : false
		// console.log('%c>>> hostCardShow', 'color: red', hostCardShow)
		setShowHostCard(hostCardShow)
		const hostPoints = hostCardShow ? POINT_CODES.JOIN : POINT_CODES.HIDE_HOST

		// NOTE: these values are passed to the story point buttons.
		// The radio buttons will submit one of these values as strings.

		const allowedPointsLocalStorage = localStorage.getItem('scrumPokerLaMerAllowedStoryPoints')
		allowedPointsLocalStorage && setAllowedStoryPoints(JSON.parse(allowedPointsLocalStorage))
		let hostData: HostData = {
			nameOfHost: '',
			userId: '',
			roomUrl: '',
			hostRoomUrl: '',
		}
		const hostDataLocalStorage = localStorage.getItem('scrumPokerLaMerHostData')
		if (hostDataLocalStorage) {
			hostData = {
				nameOfHost: JSON.parse(hostDataLocalStorage)?.nameOfHost,
				userId: JSON.parse(hostDataLocalStorage)?.userId,
				roomUrl: JSON.parse(hostDataLocalStorage)?.roomUrl,
				hostRoomUrl: JSON.parse(hostDataLocalStorage)?.hostRoomUrl,
			}
			setHostData(hostData)
		}

		socketEmitter('join-room', {
			roomId: roomId,
			message: hostPoints,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
		// console.log('%c>>> host join room', 'color: red', hostPoints)
		localStorage.setItem('scrumPokerLaMerShowHostCard', JSON.stringify(hostCardShow))
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
			userName: hostData.nameOfHost,
			userId: hostData.userId,
			localStorageName: localStorageValue,
		})
	}

	function allUsersPointsEmitter(allUsersPointsData: ListenerRes[]) {
		socketEmitter('all-users-story-points', {
			roomId: roomId,
			message: allUsersPointsData,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
			localStorageName: 'scrumPokerLaMerStoryPoints',
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
		const clearedPoints = allUsersPointsData.map((data: ListenerRes) => {
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
		localStorage.setItem('scrumPokerLaMerShowHostCard', JSON.stringify(isShow))
		setShowHostCard(isShow)
	}

	const handleInactiveUsers = () => {
		const currentTimeStamp = Date.now()
		const removeOldUsersAfter = 30 * 60 * 1000
		const cleanedUpAllPointsState = allUsersPointsData
			.map((user) => {
				console.log('%c>>> user', 'color: red', user)
				const userIsHost = user?.userId === hostData.userId
				const userIsOld = currentTimeStamp - user?.timeStamp > removeOldUsersAfter
				if (userIsOld && !userIsHost) {
					return
				}
				return user
			})
			.filter((user): user is ListenerRes => user !== undefined)
		allUsersPointsEmitter(cleanedUpAllPointsState)
	}

	return (
		<div className='w-full h-full relative animate-in fade-in-0 duration-1000 '>
			<AnimatedFish />
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<div className='flex flex-col justify-start items-center gap-6'>
					<h1 className='text-center text-2xl sm:text-3xl text-gray-300'>
						Host: Scrum Poker sous la Mer
					</h1>
					<RoomInfo roomUrl={hostData.roomUrl} nameOfHost={hostData.nameOfHost} />
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
						userName={hostData.nameOfHost}
						userId={hostData.userId}
						hostId={hostData.userId}
						showHostCard={showHostCard}
					/>
				</div>

				<div
					className='absolute top-4 right-4 sm:right-16 tooltip tooltip-bottom'
					data-tip='Host Settings'
				>
					<HostSettingsButton
						hostRoomUrl={hostData.hostRoomUrl}
						roomUrl={hostData.roomUrl}
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
