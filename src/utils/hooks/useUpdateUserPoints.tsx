import { useState } from 'react'
import type { ListenerRes } from '@/services/socket'
import { POINT_CODES } from '@/utils/constants'

type UpdateUsersPointsProps = {
	allUsersPointsEmitter: (newPoints: ListenerRes[]) => void
}

export default function useUpdateUsersPoints({ allUsersPointsEmitter }: UpdateUsersPointsProps) {
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
					if (usersPointsUpdate.message === POINT_CODES.HIDE_HOST) {
						noDuplicates.splice(index, 1)
					} else {
						noDuplicates[index].message = usersPointsUpdate.message
						noDuplicates[index].userName = usersPointsUpdate.userName
					}
					newAllPointsState = noDuplicates
				} else if (usersPointsUpdate.message === POINT_CODES.HIDE_HOST) {
					return prevUsersPoints
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
