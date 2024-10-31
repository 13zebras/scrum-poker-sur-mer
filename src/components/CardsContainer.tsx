'use client'

import UserPointsCard from './UserPointsCard'
import { useState } from 'react'
import useResize from '@/utils/hooks/useResize'

import { useSocketListener } from '@/services/socket'
import type { ListenerRes } from '@/services/socket'

import { POINT_CODES } from '@/utils/constants'
import type { AnimationType } from '@/components/RadioAnimationSetting'

export default function CardsContainer() {
	const [sortedUsersPoints, setSortedUsersPoints] = useState<ListenerRes[]>([])

	// container width is need for the animation of the cards
	const { viewportHeight, ref: containerRef, rect } = useResize('both', 50)

	// console.log('%c>>> viewportHeight', 'color: yellow', viewportHeight)
	// console.log('%c>>> rect', 'color: red', rect)
	// console.log('%c>>> rect.bottom', 'color: red', rect?.bottom)

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
	// console.log('%c>>> usersPointsData[0].userId', 'color: red', usersPointsData[0]?.userId)

	const showDisableReset = useSocketListener('show-disable-reset-points')
	const showStoryPoints = !!showDisableReset?.message as unknown as boolean

	const makeStringPoints = (message: number) => {
		if (message === POINT_CODES.JOIN || message === POINT_CODES.RESET) return '--'
		if (message === POINT_CODES.QUESTION) return '?'
		return message.toString()
	}

	const animationSettingListener = useSocketListener('animation-setting')
	const animationSetting = animationSettingListener?.message as AnimationType
	// console.log('%c>>> animationSetting CardsContainer', 'color: #5f0', animationSetting)

	const numberOfBlankCards = usersPointsData.filter(
		({ message }) => message === POINT_CODES.JOIN || message === POINT_CODES.RESET,
	).length

	const usersPointsForCards = showStoryPoints ? sortedUsersPoints : usersPointsData

	// NOTE: the key needs to change when showStoryPoints changes and therefore
	// the array changes to sortedUsersPoints. The timestamp makes each key unique, and
	// showStoryPoints causes the key to change when the array changes. So:
	// key={`${timeStamp.toString()}-${showStoryPoints.toString()}`}
	return (
		<div
			ref={containerRef}
			className='relative pb-2 flex justify-center items-center flex-wrap text-center gap-4 text-gray-300 border-0 border-red-900 w-full z-10'
		>
			{usersPointsForCards.map(({ message, userName, userId, timeStamp }, index, array) => {
				const storyPoint = makeStringPoints(message as number)

				if (message === POINT_CODES.HIDE_HOST) return null

				return (
					<UserPointsCard
						key={`${timeStamp.toString()}-${showStoryPoints.toString()}`}
						name={userName}
						storyPoint={storyPoint}
						animationSetting={animationSetting}
						userId={userId}
						index={index}
						numberOfCards={array.length}
						numberOfBlanks={numberOfBlankCards}
						showPoints={showStoryPoints}
						containerWidth={rect?.width || 0}
						containerBottom={rect?.bottom || 0}
						viewportHeight={viewportHeight || 0}
					/>
				)
			})}
		</div>
	)
}
