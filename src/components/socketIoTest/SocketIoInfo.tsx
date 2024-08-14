'use client'

import { useListenerEvents } from '@/services/socketIoServices'
import ConnectionManager from '@/components/socketIoTest/ConnectionManager'
import Events from '@/components/socketIoTest/Events'
import MessageForm from '@/components/socketIoTest/MessageForm'

type Props = {
	userName: string
	roomId: string
}

export default function SocketIoInfo({ userName, roomId }: Props) {
	const allEvents = useListenerEvents('user-connected', 'server-data')

	return (
		<div className='w-full flex flex-col items-start justify-start pt-4 border-t-2 border-blue-700/80 font-mono'>
			<h3 className='text-[1.1rem] text-amber-400 pb-1'>
				Socket.io Info
			</h3>

			<div className='w-full flex flex-row items-center justify-start gap-4 font-mono pb-3 text-gray-400'>
				<span className=''>Room: {roomId}</span>
				<span className=''> | </span>
				<span className=''>User: {userName}</span>
				<span className='text-gray-500 pl-2'>
					(from state and props)
				</span>
			</div>

			<Events events={allEvents} />
			<MessageForm roomId={roomId} userName={userName} />
			<ConnectionManager />
		</div>
	)
}
