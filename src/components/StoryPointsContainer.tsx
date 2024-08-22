'use client'

import { socketRoomEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import { useState, useEffect } from 'react'
import StoryPointButton from './StoryPointButton'
import type { RoomInfoData } from './RoomMainUi'

// export default function StoryPointsContainer({
// 	setSelectedStoryPoint,
// }: { setSelectedStoryPoint: (value: string) => void }) {
export default function StoryPointsContainer({
	roomId,
	userName,
}: RoomInfoData) {
	const [selectedStoryPoint, setSelectedStoryPoint] = useState<string | null>(
		null,
	)
	const [isPointBtnDisabled, setIsPointBtnDisabled] = useState(false)

	// const resetStoryPointBtns = useSocketListener('reset-points')
	const resetStoryPointBtns = useSocketListener('show-disable-reset-points')

	useEffect(() => {
		if (!selectedStoryPoint) return
		const timeStamp = Date.now().toString()
		socketRoomEmitter(
			'story-points',
			selectedStoryPoint,
			userName,
			timeStamp,
			roomId,
		)
	}, [selectedStoryPoint, roomId, userName])

	useEffect(() => {
		if (!resetStoryPointBtns) return
		console.log(
			'%c>>> resetStoryPointBtns',
			'color: red',
			resetStoryPointBtns,
		)
		if (resetStoryPointBtns.message === 'true') {
			setSelectedStoryPoint(null)
			setIsPointBtnDisabled(true)
		}
		if (resetStoryPointBtns.message === 'false') {
			setIsPointBtnDisabled(false)
		}
	}, [resetStoryPointBtns])

	const storyPointValues = ['?', 0, 1, 2, 3, 5, 8, 13, 20, 40, 100]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedStoryPoint(event.target.value)
	}

	return (
		<div className='relative w-fit px-0 flex flex-row justify-center items-center gap-4 border-0 border-pink-800'>
			{/* <span className='absolute left-0 w-28 text-base text-left text-gray-300'>
				Choose Your Story Points
			</span> */}
			<div className='flex flex-row flex-wrap gap-4 justify-center items-center border-0 border-stone-900'>
				{storyPointValues.map((storyPoint) => (
					<StoryPointButton
						key={storyPoint}
						storyPoint={storyPoint}
						selectedStoryPoint={selectedStoryPoint}
						onChange={handleChange}
						disabled={isPointBtnDisabled}
					/>
				))}
				{/* <div className='py-4 text-xl text-center text-red-600'>
					{selectedStoryPoint}
				</div> */}
			</div>
		</div>
	)
}
