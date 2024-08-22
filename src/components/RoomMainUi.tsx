'use client'

import { socketRoomEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import { useState, useEffect } from 'react'
import StoryPointsContainer from '@/components/StoryPointsContainer'
import CardsContainer from '@/components/CardsContainer'

export type RoomInfoData = {
	roomId: string
	userName: string
}

export default function RoomMainUi({ roomId, userName }: RoomInfoData) {
	// const [selectedStoryPoint, setSelectedStoryPoint] = useState<string>('')

	// const resetStoryPointBtns = useSocketListener('reset-points')

	// useEffect(() => {
	// 	if (selectedStoryPoint === '') return
	// 	const timeStamp = Date.now().toString()
	// 	socketRoomEmitter(
	// 		'story-points',
	// 		selectedStoryPoint,
	// 		userName,
	// 		timeStamp,
	// 		roomId,
	// 	)
	// }, [selectedStoryPoint, roomId, userName])

	// useEffect(() => {
	// 	if (!resetStoryPointBtns) return
	// 	console.log(
	// 		'%c>>> resetStoryPointBtns',
	// 		'color: red',
	// 		resetStoryPointBtns,
	// 	)
	// 	if (resetStoryPointBtns.message === 'reset') {
	// 		setSelectedStoryPoint('')
	// 	}
	// }, [resetStoryPointBtns])

	return (
		<div className='h-full w-full flex flex-col justify-start items-center gap-10'>
			<div className='h-full w-full flex flex-col justify-center items-center gap-12 border-0 border-stone-800 '>
				{/* <StoryPointsContainer
					setSelectedStoryPoint={setSelectedStoryPoint}
				/> */}
				<StoryPointsContainer roomId={roomId} userName={userName} />
				<CardsContainer />
			</div>
			{/* <RoomInfo roomId={roomId} userName={userName} /> */}
		</div>
	)
}
