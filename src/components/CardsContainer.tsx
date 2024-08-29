'use client'

import UserCard from './UserCard'
import { useState } from 'react'

import { namesArray } from '@/utils/sampleData'
import { sealifeImages } from '@/utils/imageLists'
import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

type CardUserPoint = {
	userName: string
	storyPoints: string
	imageSrc: string
}

export default function CardsContainer() {
	// TODO: Need a sorting function to sort the users by points.
	// Need to map usersPointsData to CardUserPoint.
	// Need animation for bring cards into high-low order by points when showStoryPoints is true.
	const allUsersStoryPoints = useSocketListener('all-users-story-points')
	const usersPointsData = (allUsersStoryPoints?.message as unknown as ListenerRes[]) || []

	const showDisableReset = useSocketListener('show-disable-reset-points')
	const showStoryPoints = showDisableReset?.message as unknown as boolean

	// console.log('%c>>> CardsContainer: allUsersStoryPoints', 'color: yellow', allUsersStoryPoints)
	// console.log('%c>>> CardsContainer: usersPointsData', 'color: yellow', usersPointsData)
	// console.log('%c>>> CardsContainer: showDisableReset', 'color: #f50', showDisableReset)

	// TODO: remove next line when development done
	const sampleNames = namesArray.slice(10, 15)

	return (
		<div className='py-2 flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-gray-800'>
			{usersPointsData.map(({ message, userName, timeStamp }, index) => {
				const storyPoint = message === 'join' ? '-' : message.toString()
				const imageNumber = index % sealifeImages.length
				const imageSrc = sealifeImages[imageNumber]
				return (
					<UserCard
						key={timeStamp}
						name={userName}
						storyPoint={storyPoint}
						imageSrc={imageSrc}
						showPoints={showStoryPoints}
					/>
				)
			})}

			{/* TODO: FOR DEVELOPMENT ONLY - REMOVE WHEN DONE */}
			{sampleNames.map((name, index) => {
				const storyPoints = '00'
				const imageNumber = (98 - index) % sealifeImages.length
				const imageSrc = sealifeImages[imageNumber]
				return (
					<UserCard
						key={name}
						name={`${name} Test`}
						storyPoints={storyPoints}
						imageSrc={imageSrc}
						showPoints={showStoryPoints}
					/>
				)
			})}
		</div>
	)
}
