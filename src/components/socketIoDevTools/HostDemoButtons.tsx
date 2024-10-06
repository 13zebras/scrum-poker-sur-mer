import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { namesArray } from '@/utils/sampleData'
import { POINT_CODES } from '@/app/host/[roomId]/page'

type HostDemoButtonsProps = {
	allUsersPoints: ListenerRes[]
	updateUsersPoints: (allUsersPoints: ListenerRes[]) => void
	numDemoUsers: number
}

export default function HostDemoButtons({
	allUsersPoints,
	updateUsersPoints,
	numDemoUsers,
}: HostDemoButtonsProps) {
	const [realUsers, setRealUsers] = useState<ListenerRes[]>([])

	function onAddRandomUsers() {
		const namesStart = Math.floor(Math.random() * 150)
		const namesEnd = numDemoUsers ? namesStart + numDemoUsers : namesStart + 4
		const sampleNames = namesArray.slice(namesStart, namesEnd)

		setRealUsers(allUsersPoints)
		const newUsers: ListenerRes[] = sampleNames.map((name, index) => {
			const point = Math.floor(Math.random() * 20)
			const storyPoint = point > 12 ? POINT_CODES.JOIN : point
			const userName = `${name}*`
			const imageNum = allUsersPoints.length + index
			const timeStamp = Date.now() + Math.floor(Math.random() * 60000) - 60000
			// NOTE: 60000ms = 1 minute. Each sample user would get
			// a random time stamp between 1 minute ago and now.
			return {
				message: storyPoint,
				userName: userName,
				imageNumber: imageNum,
				timeStamp: timeStamp,
			}
		})
		const newAllPointsState = [...allUsersPoints, ...newUsers]
		updateUsersPoints(newAllPointsState)
	}

	function onRemoveRandomUsers() {
		updateUsersPoints(realUsers)
	}

	return (
		<div className='flex flex-row justify-start items-center gap-2'>
			<button
				type='button'
				onClick={onAddRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-24 px-1 text-xs'
			>
				Add Users
			</button>
			<button
				type='button'
				onClick={onRemoveRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-24 px-1 text-xs'
			>
				Del Users
			</button>
		</div>
	)
}
