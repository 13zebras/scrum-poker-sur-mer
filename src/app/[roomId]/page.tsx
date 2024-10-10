'use client'

import { useEffect, useState, useRef } from 'react'
import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import RoomInfo from '@/components/RoomInfo'
import NewUserDialog from '@/components/NewUserDialog'
import { POINT_CODES } from '@/app/host/[roomId]/page'
import AnimatedFish from '@/components/AnimatedFish'

type Params = {
	roomId: string
}

// TODO consider storing user, roomUrl, roomId, hostName in localStorage
// TODO do we need a userId in case of duplicate names?
//       the userId could be userName-timeStamp, which would be unique

export default function UserRooms({ params }: { params: Params }) {
	const [user, setUser] = useState('')
	const [userId, setUserId] = useState('')
	const [lastRoomId, setLastRoomId] = useState('')
	const [isRoomIdLastRoomId, setIsRoomIdLastRoomId] = useState(false)
	const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const { roomId } = params
	console.log('%c>>> roomId', 'color: red', roomId)

	const hostRoomInfo = useSocketListener('host-room-info')
	// const roomUrl = hostRoomInfo ? hostRoomInfo.message : ''
	const hostName = hostRoomInfo ? hostRoomInfo.userName : ''
	// console.log('%c>>> UserRoom: roomUrl', 'color: #0fd', roomUrl)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
				setLastRoomId(userData.lastRoomId)
			}
		}
		console.log('%c>>> New User Dialog userDataLocalStorage:', 'color: red', userDataLocalStorage)
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
	}, [])

	function handleOnSubmit(newUserName: string, userId: string) {
		console.log('%c>>> newUserName', 'color: #5f0', newUserName)
		if (!newUserName) {
			setDisplayErrorMessage(true)
			return
		}
		const newUserId = userId ?? crypto.randomUUID()
		setUser(newUserName)
		socketEmitter('join-room', {
			roomId: roomId,
			message: POINT_CODES.JOIN,
			userName: newUserName,
			userId: newUserId,
		})
		let newLastRoomId = lastRoomId
		if (!lastRoomId) {
			newLastRoomId = roomId
		}

		localStorage.setItem(
			'scrumPokerLaMerUser',
			JSON.stringify({
				userName: newUserName,
				userId: newUserId,
				lastRoomId: newLastRoomId,
				roomId: roomId,
			}),
		)
		if (dialogRef.current) {
			dialogRef.current.close()
		}
	}

	return (
		<div className='w-full h-full max-w-[80rem] mx-auto'>
			{/* <AnimatedFish /> */}
			<main className='px-16 py-12 flex flex-col items-center gap-8 w-full animate-fade-in-500'>
				<NewUserDialog
					dialogRef={dialogRef}
					user={user}
					isRoomIdLastRoomId={isRoomIdLastRoomId}
					userId={userId}
					handleOnSubmit={handleOnSubmit}
					displayError={displayErrorMessage}
				/>
				<h1 className='text-3xl text-gray-300'>ScrumPoker sous La Mer: Room</h1>
				<RoomInfo hostName={hostName} userName={user} />
				<div className='h-full w-full pt-10 flex flex-col justify-start items-center'>
					<RoomMainUi roomId={roomId} userName={user} />
				</div>
			</main>
		</div>
	)
}
