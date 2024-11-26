'use client'

import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import { useState } from 'react'
import StoryPointButton from '@/components/StoryPointButton'
import type { RoomData } from '@/components/RoomMainUi'

export default function StoryPointsContainer({
	roomId,
	userName,
	userId,
	showHostCard,
	hostId,
}: RoomData) {
	const [selectedStoryPoint, setSelectedStoryPoint] = useState<number | null>(null)
	const [isPointBtnDisabled, setIsPointBtnDisabled] = useState(false)

	const isDisabledHost = userId === hostId && !showHostCard
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
			userId: userId,
		})
	}

	return (
		<div
			className={`flex flex-row flex-wrap gap-4 justify-center items-center z-10 border-0 border-pink-800 ${isDisabledHost && 'scale-[0.85] py-2'}`}
		>
			{allowedPointsArray.map((allowedPoint) => (
				<StoryPointButton
					key={allowedPoint}
					allowedPointLabel={allowedPoint}
					selectedStoryPoint={selectedStoryPoint}
					handleSelectPoint={handleSelectPoint}
					disabled={isPointBtnDisabled || isDisabledHost}
				/>
			))}
		</div>
	)
}
