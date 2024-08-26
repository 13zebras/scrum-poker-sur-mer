'use client'

import { socketEmitter } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import { useState } from 'react'
import StoryPointButton from '@/components/StoryPointButton'
import type { RoomInfoData } from '@/components/RoomMainUi'

export default function StoryPointsContainer({ roomId, userName }: RoomInfoData) {
	const [selectedStoryPoint, setSelectedStoryPoint] = useState<string | null>(null)
	const [isPointBtnDisabled, setIsPointBtnDisabled] = useState(false)

	useSocketListener('show-disable-reset-points', {
		onChange: (showDisableReset: ListenerRes) => {
			console.log('%c>>> showDisableReset', 'color: red', showDisableReset)
			const isButtonDisabled = showDisableReset.message as unknown as boolean
			if (isButtonDisabled) {
				setSelectedStoryPoint(null)
				setIsPointBtnDisabled(true)
			} else {
				setIsPointBtnDisabled(false)
			}
		},
	})

	// TODO: move to host settings
	const storyPointValues = ['?', 0, 1, 2, 3, 5, 8, 13, 20, 40, 100]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('%c>>> spc handleChange', 'color: red', event.target.value)
		setSelectedStoryPoint(event.target.value)
		socketEmitter('story-points', roomId, event.target.value, userName)
	}

	return (
		<div className='relative w-fit px-0 flex flex-row justify-center items-center gap-4 border-0 border-pink-800'>
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
			</div>
		</div>
	)
}
