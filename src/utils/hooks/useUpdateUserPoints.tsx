import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { POINT_CODES } from '@/utils/constants'
import removeInactiveUsers from '@/utils/helpers/removeInactiveUsers'

type UpdateUsersPointsProps = {
	allUsersPointsEmitter: (newPoints: ListenerRes[]) => void
	hostId: string
}

export default function useUpdateUsersPoints({
	allUsersPointsEmitter,
	hostId,
}: UpdateUsersPointsProps) {
	const [allUsersPointsData, setAllUsersPointsData] = useState<ListenerRes[]>([])

	const updateUsersPoints = (usersPointsUpdate: ListenerRes | ListenerRes[]) => {
		if (Array.isArray(usersPointsUpdate)) {
			setAllUsersPointsData(usersPointsUpdate)
			allUsersPointsEmitter(usersPointsUpdate)
		} else {
			setAllUsersPointsData((prevUsersPoints: ListenerRes[]) => {
				const index = prevUsersPoints.findIndex((data) => data.userId === usersPointsUpdate.userId)
				let newAllPointsState: ListenerRes[]

				if (index !== -1) {
					const noDuplicates = [...prevUsersPoints]

					const message = usersPointsUpdate.message
					if (typeof message === 'number' && message !== POINT_CODES.RESET) {
						noDuplicates[index].timeStamp = usersPointsUpdate.timeStamp
					}
					noDuplicates[index].message = usersPointsUpdate.message
					noDuplicates[index].userName = usersPointsUpdate.userName
					newAllPointsState = noDuplicates
				} else {
					newAllPointsState = [...prevUsersPoints, usersPointsUpdate]
				}
				const currentUsersPointsState = removeInactiveUsers(newAllPointsState, hostId)
				allUsersPointsEmitter(currentUsersPointsState)
				return currentUsersPointsState
			})
		}
	}
	return { allUsersPointsData, updateUsersPoints }
}
