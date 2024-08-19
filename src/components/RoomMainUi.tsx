// HOST ROOM
'use client'

import { socketRoomEmitter } from '@/services/socket'
import { useState, useEffect } from 'react'
import StoryPoints from '@/components/StoryPoints'
import CardsContainer from '@/components/CardsContainer'
import RoomInfo from '@/components/RoomInfo'

export type RoomInfoData = {
	roomId: string
	userName: string
	// hostName: string
}

export default function RoomMainUi({ roomId, userName }: RoomInfoData) {
	const [selectedStoryPoint, setSelectedStoryPoint] = useState('')

	useEffect(() => {
		if (selectedStoryPoint === '') return
		const timeStamp = Date.now().toString()
		socketRoomEmitter(
			'story-points',
			selectedStoryPoint,
			userName,
			timeStamp,
			roomId,
		)
	}, [selectedStoryPoint, roomId, userName])

	return (
		<div className='h-full w-full flex flex-col justify-start items-center gap-12'>
			<div className='h-full w-full flex justify-center items-start gap-10 border-0 border-stone-900 '>
				<StoryPoints setSelectedStoryPoint={setSelectedStoryPoint} />
				<CardsContainer />
			</div>
			<RoomInfo roomId={roomId} userName={userName} />
		</div>
	)
}
