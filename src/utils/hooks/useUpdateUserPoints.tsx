import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { POINT_CODES } from '@/utils/constants'

type UpdateUsersPointsProps = {
	allUsersPointsEmitter: (newPoints: ListenerRes[]) => void
}

export default function useUpdateUsersPoints({ allUsersPointsEmitter }: UpdateUsersPointsProps) {
	const [allUsersPointsData, setAllUsersPointsData] = useState<ListenerRes[]>([])

	const updateUsersPoints = (usersPointsUpdate: ListenerRes | ListenerRes[]) => {
		console.log('%c>>> updateUsersPoints', 'color: #5f0', usersPointsUpdate)
		if (Array.isArray(usersPointsUpdate)) {
			console.log('%c>>> updateUsersPoints-ARRAY', 'color: #f0f', usersPointsUpdate)
			setAllUsersPointsData(usersPointsUpdate)
			allUsersPointsEmitter(usersPointsUpdate)
		} else {
			setAllUsersPointsData((prevUsersPoints: ListenerRes[]) => {
				console.log('%c>>> updateUsersPoints-prevUsersPoints', 'color: yellow', prevUsersPoints)
				const index = prevUsersPoints.findIndex((data) => data.userId === usersPointsUpdate.userId)
				let newAllPointsState: ListenerRes[]

				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]

					console.log('%c>>> usersPointsUpdate.message', 'color: #f0f', usersPointsUpdate.message)
					const message = usersPointsUpdate.message
					if (typeof message === 'number' && message !== POINT_CODES.RESET) {
						console.log('%c>>> message is a number and >= -1', 'color: #f0f', message)
						noDuplicates[index].timeStamp = usersPointsUpdate.timeStamp
						console.log('%c>>> new timestamp', 'color: #f0f', usersPointsUpdate.timeStamp)
					}
					noDuplicates[index].message = usersPointsUpdate.message
					noDuplicates[index].userName = usersPointsUpdate.userName
					newAllPointsState = noDuplicates
				} else {
					newAllPointsState = [...prevUsersPoints, usersPointsUpdate]
				}
				allUsersPointsEmitter(newAllPointsState)
				return newAllPointsState
			})
		}
	}
	return { allUsersPointsData, updateUsersPoints }
}
