'use client'

import UserCard from './UserCard'
import { useState, useEffect } from 'react'

import { namesArray } from '@/utils/sampleData'
import { sealifeImages } from '@/utils/imageLists'
import ChatQuestionOutline from './icons/ChatQuestionOutlineIcon'
import { useAllUsersPointsListener } from '@/services/socket'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

export default function CardsContainer() {
	const [usersPointsData, setUsersPointsData] = useState<ListenerRes[]>([])
	const [showStoryPoints, setShowStoryPoints] = useState(false)
	// const sampleNames = namesArray.slice(10, 25)
	// const storyPointsArray = [0, 1, 2, 3, 5, 8, 13]
	const allUsersPoints = useAllUsersPointsListener('all-users-story-points')
	const showStoryPointsListener = useSocketListener('show-hide-points')

	useEffect(() => {
		if (!allUsersPoints) return
		const listenerMessages = allUsersPoints.message
		console.log(
			'%c>>> listenerMessages:',
			'color: yellow',
			listenerMessages,
		)
		setUsersPointsData(listenerMessages)
	}, [allUsersPoints])

	useEffect(() => {
		if (!showStoryPointsListener) return
		const showPoints = showStoryPointsListener.message === 'show'
		console.log('%c>>> showPoints', 'color: red', showPoints)
		console.log('%c>>> showPoints type', 'color: #f70', typeof showPoints)
		setShowStoryPoints(showPoints)
	}, [showStoryPointsListener])

	// console.log('%c>>> usersPointsData Cards:', 'color: #5f0', usersPointsData)
	// console.log('%c>>> showStoryPoints', 'color: yellow', showStoryPoints)

	return (
		<div className='py-8 px-0 w-[85%] flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-gray-900'>
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
		</div>
	)
}
