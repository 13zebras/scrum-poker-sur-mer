import { createFileRoute } from '@tanstack/react-router'

import HostRoomPage from '@/pages/HostRoomPage'

export const Route = createFileRoute('/host/$roomId')({
	ssr: false,
	component: HostRoom,
})

function HostRoom() {
	const { roomId } = Route.useParams()
	return <HostRoomPage roomId={roomId} />
}
