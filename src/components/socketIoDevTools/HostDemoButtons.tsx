import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { sampleNamesArray } from '@/utils/sampleData'
import { POINT_CODES } from '@/app/host/[roomId]/page'

type HostDemoButtonsProps = {
	allUsersPoints: ListenerRes[]
	allowedStoryPoints: string[]
	updateUsersPoints: (allUsersPoints: ListenerRes[]) => void
	demoNumberUsers: number
	demoPointPercent: number | undefined
}

export default function HostDemoButtons({
	allUsersPoints,
	allowedStoryPoints,
	updateUsersPoints,
	demoNumberUsers = 10,
	demoPointPercent = 50,
}: HostDemoButtonsProps) {
	const [realUsers, setRealUsers] = useState<ListenerRes[]>([])
	const [wasAdded, setWasAdded] = useState(false)

	function onAddRandomUsers() {
		if (wasAdded) return
		setWasAdded(true)
		const namesStart = Math.floor(Math.random() * (sampleNamesArray.length - demoNumberUsers))
		const namesEnd = namesStart + demoNumberUsers
		const sampleNames = sampleNamesArray.slice(namesStart, namesEnd)

		setRealUsers(allUsersPoints)
		const newUsers: ListenerRes[] = sampleNames.map((name, index) => {
			const randomPoint = allowedStoryPoints[Math.floor(Math.random() * allowedStoryPoints.length)]
			const pointAsNumber = randomPoint === '?' ? -1 : Number(randomPoint)
			// console.log('%c>>> randomPoint', 'color: #5f0', randomPoint)
			const storyPoint = Math.random() > demoPointPercent / 100 ? POINT_CODES.JOIN : pointAsNumber
			// console.log('%c>>> storyPoint', 'color: yellow', storyPoint)
			const userName = `*${name}`
			const userId = crypto.randomUUID()
			const imageNum = allUsersPoints.length + index + 1
			const timeStamp = Date.now() + Math.floor(Math.random() * 60000) - 60000
			// NOTE: 60000ms = 1 minute. Each sample user would get
			// a random time stamp between 1 minute ago and now.
			return {
				message: storyPoint,
				userName: userName,
				userId: userId,
				imageNumber: imageNum,
				timeStamp: timeStamp,
			}
		})
		const newAllPointsState = [...allUsersPoints, ...newUsers]
		updateUsersPoints(newAllPointsState)
	}

	function onRemoveRandomUsers() {
		if (!wasAdded) return
		setWasAdded(false)
		updateUsersPoints(realUsers)
	}

	return (
		<div className='flex flex-row justify-start items-center gap-2'>
			<button
				type='button'
				onClick={onAddRandomUsers}
				className='btn btn-outline btn-accent h-6 min-h-6 w-24 px-1 text-xs'
				disabled={wasAdded}
			>
				Add Users
			</button>
			<button
				type='button'
				onClick={onRemoveRandomUsers}
				className='btn btn-outline btn-accent h-6 min-h-6 w-24 px-1 text-xs'
				disabled={!wasAdded}
			>
				Del Users
			</button>
		</div>
	)
}
