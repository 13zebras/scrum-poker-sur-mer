'use client'

import { useListenerEvents } from '@/services/socket'
import ConnectionManager from '@/components/socketIoDevTools/ConnectionManager'
import Events from '@/components/socketIoDevTools/Events'
import MessageForm from '@/components/socketIoDevTools/MessageForm'

type Props = {
	userName: string
	roomId: string
}

export default function SocketIoInfo({ userName, roomId }: Props) {
	const allEvents = useListenerEvents(
		'join-room',
		'chat-data',
		'story-points',
		'all-users-story-points',
	)

	console.log('%c>>> allEvents', 'color: #2ff', allEvents)
	return (
		<div className='w-full flex justify-center pt-8 border-t-2 border-blue-800'>
			<div className='w-full max-w-5xl flex flex-col items-start justify-start font-mono'>
				<div className='text-base text-amber-400 pb-2'>
					DevTools: Socket.io Info
				</div>

				<Events events={allEvents} />
				<MessageForm roomId={roomId} userName={userName} />
				<ConnectionManager />
			</div>
		</div>
	)
}
