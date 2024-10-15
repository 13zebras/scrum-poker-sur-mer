'use client'

import { useEffect, useState, useRef } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import NewUserDialog from '@/components/NewUserDialog'
import { POINT_CODES } from '@/utils/constants'
import AnimatedFish from '@/components/AnimatedFish'

type Params = {
	roomId: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')
	const [userId, setUserId] = useState('')

	const [isRoomIdLastRoomId, setIsRoomIdLastRoomId] = useState(false)
	const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const { roomId } = params

	const hostRoomInfo = useSocketListener('host-room-info')
	const nameOfHost = hostRoomInfo ? hostRoomInfo.userName : ''
	const hostId = hostRoomInfo ? hostRoomInfo.userId : ''

	// biome-ignore lint/correctness/useExhaustiveDependencies: no depenencies change, only runs on first render
	useEffect(() => {
		const userDataLocalStorage = localStorage.getItem('scrumPokerLaMerUser')
		if (userDataLocalStorage) {
			const userData = JSON.parse(userDataLocalStorage)
			if (userData?.userName) {
				setUser(userData.userName)
			}
			if (userData?.userId) {
				setUserId(userData.userId)
			}
			if (userData?.lastRoomId) {
				setIsRoomIdLastRoomId(roomId === userData.lastRoomId)
			}
		}

		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}, [])

	function handleOnSubmit(newUserName: string, userId: string) {
		if (!newUserName) {
			setDisplayErrorMessage(true)
			return
		}
		const newUserId = userId || crypto.randomUUID()
		setUser(newUserName)
		setUserId(newUserId)
		socketEmitter('join-room', {
			roomId: roomId,
			message: POINT_CODES.JOIN,
			userName: newUserName,
			userId: newUserId,
		})

		localStorage.setItem(
			'scrumPokerLaMerUser',
			JSON.stringify({
				userName: newUserName,
				userId: newUserId,
				lastRoomId: roomId,
				roomId: roomId,
			}),
		)
		if (dialogRef.current) {
			dialogRef.current.close()
		}
	}

	return (
		<div className='w-full h-full'>
			<AnimatedFish />
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<NewUserDialog
					dialogRef={dialogRef}
					user={user}
					isRoomIdLastRoomId={isRoomIdLastRoomId}
					userId={userId}
					handleOnSubmit={handleOnSubmit}
					displayError={displayErrorMessage}
				/>
				<h1 className='text-center text-2xl sm:text-3xl text-gray-300'>
					Room: Scrum Poker sous la Mer
				</h1>
				<RoomInfo nameOfHost={nameOfHost} userName={user} />
				<div className='h-full w-full pt-6 sm:pt-10 flex flex-col justify-start items-center'>
					<RoomMainUi roomId={roomId} userName={user} userId={userId} hostId={hostId} />
				</div>
			</main>
		</div>
	)
}
