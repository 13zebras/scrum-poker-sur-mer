'use client'

import UserCard from './UserCard'
// import { useState } from 'react'

// import { namesArray } from '@/utils/sampleData'
import { sealifeImages } from '@/utils/imageLists'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

export default function CardsContainer() {
	// const [usersPointsData, setUsersPointsData] = useState<ListenerRes[]>([])
	// const [showStoryPoints, setShowStoryPoints] = useState(false)
	// const sampleNames = namesArray.slice(0, 9)
	const sampleNames: string[] = []
	const storyPointsArray = [0, 1, 2, 3, 5, 8, 13]

	// useSocketListener('all-users-story-points', (allUserPoints) => {
	// 	const allUserPointsMessages = (allUserPoints as unknown as AllListenerRes).message
	// 	console.log('%c>>> listenerMessages:', 'color: yellow', allUserPoints.message)
	// 	setUsersPointsData(allUserPointsMessages)
	// })

	// useSocketListener('show-disable-reset-points', (showDisableReset) => {
	// 	console.log('%c>>> showPoints', 'color: red', showDisableReset.message)
	// 	setShowStoryPoints(showDisableReset.message as unknown as boolean)
	// })

	const allUsersStoryPoints = useSocketListener('all-users-story-points')
	const usersPointsData = (allUsersStoryPoints?.message as unknown as ListenerRes[]) || []

	const showDisableReset = useSocketListener('show-disable-reset-points')
	const showStoryPoints = showDisableReset?.message as unknown as boolean

	return (
		<div className='py-2 flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-gray-800'>
			{usersPointsData.map(({ message, userName, timeStamp }, index) => {
				const storyPoints = message === 'join' ? '-' : message.toString()
				const imageNumber = index % sealifeImages.length
				const imageSrc = sealifeImages[imageNumber]
				return (
					<UserCard
						key={timeStamp}
						name={userName}
						storyPoints={storyPoints}
						imageSrc={imageSrc}
						showPoints={showStoryPoints}
					/>
				)
			})}

			{/* TODO: FOR DEVELOPMENT ONLY - REMOVE WHEN DONE */}
			{sampleNames.map((name, index) => {
				const storyPoints = storyPointsArray[index % storyPointsArray.length]
				const imageNumber = (98 - index) % sealifeImages.length
				const imageSrc = sealifeImages[imageNumber]
				return (
					<UserCard
						key={name}
						name={`T ${name}`}
						storyPoints={storyPoints.toString()}
						imageSrc={imageSrc}
						showPoints={showStoryPoints}
					/>
				)
			})}
		</div>
	)
}
