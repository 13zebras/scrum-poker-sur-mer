import type { ListenerRes } from '@/services/socket'

export default function Events({ events }: { events: ListenerRes[] }) {
	return (
		<div className='min-h-40 w-full rounded-md border-2 border-gray-700 bg-gray-950 p-2 font-mono text-gray-300'>
			<ul>
				{events.map(({ message, userName, timeStamp }: ListenerRes) => {
					const messageString =
						typeof message !== 'string'
							? JSON.stringify(message)
							: message
					return (
						<li key={timeStamp}>
							{messageString} | {userName} ({timeStamp})
						</li>
					)
				})}
			</ul>
		</div>
	)
}
