'use client'

import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import { useState } from 'react'
import StoryPointButton from '@/components/StoryPointButton'
import type { RoomData } from '@/components/RoomMainUi'

export default function StoryPointsContainer({ roomId, userName }: RoomData) {
	const [selectedStoryPoint, setSelectedStoryPoint] = useState<number | null>(null)
	const [isPointBtnDisabled, setIsPointBtnDisabled] = useState(false)

	useSocketListener('show-disable-reset-points', {
		onChange: (showDisableReset) => {
			const isButtonDisabled = showDisableReset.message as unknown as boolean
			if (isButtonDisabled) {
				setSelectedStoryPoint(null)
				setIsPointBtnDisabled(true)
			} else {
				setIsPointBtnDisabled(false)
			}
		},
	})

	const allowedPoints = useSocketListener('allowed-story-points')
	const allowedPointsArray = (allowedPoints?.message as unknown as string[]) || []

	const handleSelectPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedPoint = event.target.value === '?' ? -1 : Number(event.target.value)
		setSelectedStoryPoint(selectedPoint)
		socketEmitter('user-story-point', {
			roomId: roomId,
			message: selectedPoint,
			userName: userName,
		})
	}

	return (
		<div className='relative w-fit px-0 flex flex-row justify-center items-center gap-4 border-0 border-pink-800'>
			<div className='flex flex-row flex-wrap gap-4 justify-center items-center border-0 border-stone-900'>
				{allowedPointsArray.map((allowedPoint) => (
					<StoryPointButton
						key={allowedPoint}
						allowedPointLabel={allowedPoint}
						selectedStoryPoint={selectedStoryPoint}
						handleSelectPoint={handleSelectPoint}
						disabled={isPointBtnDisabled}
					/>
				))}
			</div>
		</div>
	)
}
