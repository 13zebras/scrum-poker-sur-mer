'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
// import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import NewUserDialog from '@/components/NewUserDialog'
// import { POINT_CODES } from '@/utils/constants'
import AnimatedFish from '@/components/AnimatedFish'
import { useLocalStorage } from 'usehooks-ts'

const RoomInfo = dynamic(() => import('@/components/RoomInfo'), { ssr: false })

type Params = {
	roomId: string
}

export default function UserRooms({ params }: { params: Params }) {
	// const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)
	// const [newUserName, setNewUserName] = useState('')
	// const [isReturningUser, setIsReturningUser] = useState(false)

	const [{ userName, userId, lastRoomId }, setUserData] = useLocalStorage('scrumPokerLaMerUser', {
		userName: '',
		userId: '',
		lastRoomId: '',
		roomId: '',
	})

	const { roomId } = params

	const hostRoomInfo = useSocketListener('host-room-info')
	const nameOfHost = hostRoomInfo ? hostRoomInfo.userName : ''
	const hostId = hostRoomInfo ? hostRoomInfo.userId : ''

	useEffect(() => {
		// const isRoomLastRoom = roomId === lastRoomId
		// setIsReturningUser(!!userId && isRoomLastRoom)
		// if (userId && isRoomLastRoom) {
		// 	setNewUserName(userName)
		// }
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
		setIsDialogOpen(!isDialogOpen)
	}, [])
	// }, [roomId, userId, lastRoomId, userName])

	// function handleOnSubmit(newUserName: string, userId: string) {
	// 	if (!newUserName) {
	// 		setDisplayErrorMessage(true)
	// 		return
	// 	}
	// 	const newUserId = userId || crypto.randomUUID()
	// 	socketEmitter('join-room', {
	// 		roomId: roomId,
	// 		message: POINT_CODES.JOIN,
	// 		userName: newUserName,
	// 		userId: newUserId,
	// 	})

	// 	setUserData({
	// 		userName: newUserName,
	// 		userId: newUserId,
	// 		lastRoomId: roomId,
	// 		roomId: roomId,
	// 	})
	// 	if (dialogRef.current) {
	// 		dialogRef.current.close()
	// 	}
	// 	setIsDialogOpen(false)
	// }

	console.log('%c>>> isDialogOpen', 'color: red', isDialogOpen)

	return (
		<div className='w-full h-full'>
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<NewUserDialog
					dialogRef={dialogRef}
					user={userName}
					userId={userId}
					roomId={roomId}
					// isReturningUser={isReturningUser}
					// setIsReturningUser={setIsReturningUser}
					setUserData={setUserData}
					// newUserName={newUserName}
					// setNewUserName={setNewUserName}
					isRoomIdLastRoomId={roomId === lastRoomId}
					// handleOnSubmit={handleOnSubmit}
					// displayError={displayErrorMessage}
					isDialogOpen={isDialogOpen}
					setIsDialogOpen={setIsDialogOpen}
				/>
				<h1 className='text-center text-2xl sm:text-3xl text-gray-300'>
					Room: Scrum Poker sous la Mer
				</h1>
				<RoomInfo nameOfHost={nameOfHost} userName={userName} />
				<div className='h-full w-full pt-6 sm:pt-10 flex flex-col justify-start items-center'>
					<RoomMainUi roomId={roomId} userName={userName} userId={userId} hostId={hostId} />
				</div>
			</main>
			<AnimatedFish isDialogOpen={isDialogOpen} />
		</div>
	)
}
