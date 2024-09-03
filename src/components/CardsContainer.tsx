'use client'

import UserCard from './UserCard'
import UserShowPointsCard from './UserShowPointsCard'
import { useState } from 'react'

import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

export default function CardsContainer() {
	const [sortedUsersPoints, setSortedUsersPoints] = useState<ListenerRes[]>([])

	const allUsersStoryPoints = useSocketListener('all-users-story-points', {
		onChange: (allPointsRes) => {
			const allUsersPointsSorted = [...(allPointsRes.message as unknown as ListenerRes[])]

			allUsersPointsSorted.sort((a, b) => {
				const aMessage = a.message as unknown as number
				const bMessage = b.message as unknown as number
				return bMessage - aMessage
			})
			setSortedUsersPoints(allUsersPointsSorted)
		},
	})
	const usersPointsData = (allUsersStoryPoints?.message as unknown as ListenerRes[]) || []

	const showDisableReset = useSocketListener('show-disable-reset-points')
	const showStoryPoints = showDisableReset?.message as unknown as boolean

	// -99 = user joined room and hasn't participated yet.
	// -55 = user has participated at least once and had points cleared.
	const makeStringPoints = (message: number) => {
		if (message === -99 || message === -55) return '--'
		if (message === -1) return '?'
		return message.toString()
	}

	const numberOfBlankCards = usersPointsData.filter(
		({ message }) => message === -99 || message === -55,
	).length

	// console.log('%c>>> CardsContainer: allUsersStoryPoints', 'color: #f70', allUsersStoryPoints)
	// console.log('%c>>> CardsContainer: usersPointsData', 'color: red', usersPointsData)
	// console.log('%c>>> CC socketListener: sortedUsersPoints', 'color: #5f0', sortedUsersPoints)
	// console.log('%c>>> CardsContainer: showStoryPoints', 'color: #f60', showStoryPoints)

	return (
		<div className='relative pt-2 pb-56 flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-red-800 w-full'>
			{showStoryPoints
				? sortedUsersPoints.map(({ message, userName, imageNumber, timeStamp }, index, array) => {
						const storyPoint = makeStringPoints(message as number)
						return (
							<UserShowPointsCard
								key={timeStamp}
								name={userName}
								storyPoint={storyPoint}
								imageNumber={imageNumber}
								index={index}
								numberOfCards={array.length}
								numberOfBlanks={numberOfBlankCards}
							/>
						)
					})
				: usersPointsData.map(({ message, userName, imageNumber, timeStamp }) => {
						const storyPoint = makeStringPoints(message as number)
						return (
							<UserCard
								key={timeStamp}
								name={userName}
								storyPoint={storyPoint}
								imageNumber={imageNumber}
								showPoints={showStoryPoints}
							/>
						)
					})}
		</div>
	)
}
