'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import { useSocketListener } from '@/services/socket'
import RoomMainUi from '@/components/RoomMainUi'
import NewUserDialog from '@/components/NewUserDialog'
import AnimatedFish from '@/components/AnimatedFish'
import { useLocalStorage } from 'usehooks-ts'

const RoomInfo = dynamic(() => import('@/components/RoomInfo'), { ssr: false })

type Params = {
	roomId: string
}

export default function UserRooms({ params }: { params: Params }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)

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
		if (dialogRef.current) {
			dialogRef.current.showModal()
		}
		setIsDialogOpen(true)
	}, [])

	return (
		<div className='w-full h-full'>
			<main className='px-8 sm:px-12 py-16 md:px-16 md:py-12 relative flex flex-col justify-start items-center gap-8 w-full max-w-[80rem] mx-auto '>
				<NewUserDialog
					dialogRef={dialogRef}
					user={userName}
					userId={userId}
					roomId={roomId}
					setUserData={setUserData}
					isRoomIdLastRoomId={roomId === lastRoomId}
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
			<AnimatedFish />
		</div>
	)
}
