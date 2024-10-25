import type { ListenerRes } from '@/services/socket'

export default function removeInactiveUsers(userPointsData: ListenerRes[], hostId: string) {
	const currentTimeStamp = Date.now()
	const removeOldUsersAfter = 30 * 60 * 1000
	const cleanedUpAllPointsState = userPointsData
		.map((user) => {
			console.log('%c>>> user', 'color: red', user)
			const userIsHost = user?.userId === hostId
			const userIsOld = currentTimeStamp - user?.timeStamp > removeOldUsersAfter
			if (userIsOld && !userIsHost) {
				return
			}
			return user
		})
		.filter((user): user is ListenerRes => user !== undefined)
	return cleanedUpAllPointsState
}
