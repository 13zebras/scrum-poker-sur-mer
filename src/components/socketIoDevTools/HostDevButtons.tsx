import Link from 'next/link'
import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { namesArray } from '@/utils/sampleData'
import { POINT_CODES } from '@/app/host/[roomId]/page'

type HostDevButtonsProps = {
	allUsersPoints: ListenerRes[]
	onSetAllUsersPoints: React.Dispatch<React.SetStateAction<ListenerRes[]>>
	allUsersPointsEmitter: (newUsersPoints: ListenerRes[]) => void
}

export default function HostDevButtons({
	allUsersPoints,
	onSetAllUsersPoints,
	allUsersPointsEmitter,
}: HostDevButtonsProps) {
	const [realUsers, setRealUsers] = useState<ListenerRes[]>([])

	function onAddRandomUsers() {
		const namesStart = Math.floor(Math.random() * 150)
		const namesEnd = namesStart + 15
		const sampleNames = namesArray.slice(namesStart, namesEnd)

		onSetAllUsersPoints((prevUsersPoints) => {
			setRealUsers(prevUsersPoints)
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
			const newAllPointsState = [...prevUsersPoints, ...newUsers]
			console.log('%c>>> newAllPointsState random:', 'color: red', newAllPointsState)
			allUsersPointsEmitter(newAllPointsState)
			return newAllPointsState
			// return prevUsersPoints
		})
	}

	function onRemoveRandomUsers() {
		console.log('%c>>> realUsers remove random users', 'color: #5f0', realUsers)
		onSetAllUsersPoints(realUsers)
		allUsersPointsEmitter(realUsers)
	}

	return (
		<div className='w-72 absolute top-2 left-0 flex flex-row flex-wrap justify-start items-center gap-2 scale-90'>
			<button
				type='button'
				onClick={onRemoveRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-1'
			>
				Del Rand Users
			</button>
			<button
				type='button'
				onClick={onAddRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-3'
			>
				Add Rand Users
			</button>
			<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-2'>
				Create Room
			</Link>
		</div>
	)
}
