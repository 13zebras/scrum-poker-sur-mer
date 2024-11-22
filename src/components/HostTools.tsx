import { useState } from 'react'
import Link from 'next/link'
import type { ListenerRes } from '@/services/socket'
import { sampleNamesArray } from '@/utils/sampleData'
import { POINT_CODES } from '@/utils/constants'
import removeAllLocalStorageData from '@/utils/helpers/removeAllLocalStorageData'
import { useRouter } from 'next/navigation'

type HostToolsProps = {
	allUsersPoints: ListenerRes[]
	allowedStoryPoints: string[]
	updateUsersPoints: (points: ListenerRes[]) => void
	demoMode: boolean
	demoNumberUsers: number | undefined
	demoPointPercent: number | undefined
}

export default function HostTools({
	allUsersPoints,
	allowedStoryPoints,
	updateUsersPoints,
	demoMode,
	demoNumberUsers = 10,
	demoPointPercent = 50,
}: HostToolsProps) {
	const [realUsers, setRealUsers] = useState<ListenerRes[]>([])
	const [wasAdded, setWasAdded] = useState(false)
	const router = useRouter()

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
			const storyPoint = Math.random() > demoPointPercent / 100 ? POINT_CODES.JOIN : pointAsNumber
			const userName = `*${name}`
			const userId = crypto.randomUUID()

			const timeStamp = Date.now() - Math.ceil(Math.random() * 30 * 60 * 1000)
			// NOTE: Each sample user gets a random timeStamp between 30 mins ago and now.
			return {
				message: storyPoint,
				userName: userName,
				userId: userId,
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

	function onRemoveLocalStorage() {
		removeAllLocalStorageData()
		router.push('/host')
	}

	return (
		<div className='absolute top-6 left-6 sm:left-12 flex flex-row flex-start items-center gap-8 scale-90'>
			<div className='tooltip tooltip-bottom text-xs' data-tip='Click to Create a New Room'>
				<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-28 px-1 text-xs'>
					Create Room
				</Link>
			</div>
			{demoMode && (
				<div className='flex flex-row justify-start items-center gap-2'>
					<button
						type='button'
						onClick={onAddRandomUsers}
						className='btn btn-outline btn-accent h-6 min-h-6 w-16 px-1 text-xs'
						disabled={wasAdded}
					>
						Add
					</button>
					<button
						type='button'
						onClick={onRemoveRandomUsers}
						className='btn btn-outline btn-accent h-6 min-h-6 w-16 px-1 text-xs'
						disabled={!wasAdded}
					>
						Delete
					</button>
					<button
						type='button'
						onClick={onRemoveLocalStorage}
						className='btn btn-outline btn-neutral h-6 min-h-6 w-24 px-1 text-xs'
					>
						End Demo
					</button>
				</div>
			)}
		</div>
	)
}
