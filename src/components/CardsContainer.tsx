'use client'

import UserPointsCard from './UserPointsCard'
import { useState, useEffect, useRef } from 'react'
import useResize from '@/utils/hooks/useResize'

import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

import { POINT_CODES } from '@/utils/constants'

export default function CardsContainer() {
	const [sortedUsersPoints, setSortedUsersPoints] = useState<ListenerRes[]>([])

	// container width is need for the animation of the cards
	const { width: containerWidth, ref: containerRef } = useResize('ref')

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
	const showStoryPoints = !!showDisableReset?.message as unknown as boolean

	const makeStringPoints = (message: number) => {
		if (message === POINT_CODES.JOIN || message === POINT_CODES.RESET) return '--'
		if (message === POINT_CODES.QUESTION) return '?'
		return message.toString()
	}

	const numberOfBlankCards = usersPointsData.filter(
		({ message }) => message === POINT_CODES.JOIN || message === POINT_CODES.RESET,
	).length

	const usersPointsForCards = showStoryPoints ? sortedUsersPoints : usersPointsData

	// console.log('%c>>> containerWidth', 'color: yellow', containerWidth)
	// console.log('%c>>> usersPointsForCards', 'color: red', usersPointsForCards)
	// console.log('%c>>> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'color: gray')

	// NOTE: the key needs to change when showStoryPoints changes and therefore
	// the array changes to sortedUsersPoints. The timestamp makes each key unique, and
	// showStoryPoints causes the key to change when the array changes. So:
	// key={`${timeStamp.toString()}-${showStoryPoints.toString()}`}
	return (
		<div
			ref={containerRef}
			className='relative pb-[6vh] flex justify-center items-center flex-wrap text-center gap-4 text-gray-300 border-0 border-red-900 w-full z-10'
		>
			{usersPointsForCards.map(({ message, userName, imageNumber, timeStamp }, index, array) => {
				const storyPoint = makeStringPoints(message as number)
				return (
					<UserPointsCard
						key={`${timeStamp.toString()}-${showStoryPoints.toString()}`}
						name={userName}
						storyPoint={storyPoint}
						imageNumber={imageNumber}
						index={index}
						numberOfCards={array.length}
						numberOfBlanks={numberOfBlankCards}
						showPoints={showStoryPoints}
						containerWidth={containerWidth}
					/>
				)
			})}
		</div>
	)
}
