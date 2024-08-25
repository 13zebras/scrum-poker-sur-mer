'use client'

import UserCard from './UserCard'
import { useState } from 'react'

import { namesArray } from '@/utils/sampleData'
import { sealifeImages } from '@/utils/imageLists'
import { useAllUsersPointsListener } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'
import type { AllListenerRes } from '@/services/socket'

export default function CardsContainer() {
	const [usersPointsData, setUsersPointsData] = useState<ListenerRes[]>([])
	const [showStoryPoints, setShowStoryPoints] = useState(false)
	// const sampleNames = namesArray.slice(0, 9)
	const sampleNames: string[] = []
	const storyPointsArray = [0, 1, 2, 3, 5, 8, 13]

	useAllUsersPointsListener('all-users-story-points', (allUserPoints: AllListenerRes) => {
		const allUserPointsMessages = allUserPoints.message
		console.log('%c>>> listenerMessages:', 'color: yellow', allUserPoints.message)
		setUsersPointsData(allUserPointsMessages)
	})

	useSocketListener('show-disable-reset-points', (showDisableReset: ListenerRes) => {
		const showPoints = showDisableReset.message === 'true'
		console.log('%c>>> showPoints', 'color: red', showPoints)
		console.log('%c>>> showPoints type', 'color: #f70', typeof showPoints)
		setShowStoryPoints(showPoints)
	})

	return (
		<div className='py-2 flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-gray-800'>
			{usersPointsData.map(({ message, userName, timeStamp }, index) => {
				const storyPoints = message === 'join' ? '-' : message
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
