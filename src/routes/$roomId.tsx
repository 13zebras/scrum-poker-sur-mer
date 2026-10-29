import { createFileRoute } from '@tanstack/react-router'

import UserRoomPage from '@/pages/UserRoomPage'

export const Route = createFileRoute('/$roomId')({
	ssr: false,
	component: UserRoom,
})

function UserRoom() {
	const { roomId } = Route.useParams()
	return <UserRoomPage roomId={roomId} />
}
