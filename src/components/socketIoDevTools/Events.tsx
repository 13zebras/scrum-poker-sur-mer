import type { Event } from '@/services/socket'

export default function Events({ events }: { events: Event[] }) {
	return (
		<div className='min-h-40 w-full max-w-[800px] rounded-md border-2 border-gray-700 bg-gray-950 p-2 font-mono text-gray-300'>
			<ul>
				{events.map(
					({
						messageServer,
						userNameServer,
						roomIdServer,
						timeStamp,
					}) => {
						return (
							<li key={timeStamp}>
								{messageServer} - {userNameServer} -{' '}
								{roomIdServer}
							</li>
						)
					},
				)}
			</ul>
		</div>
	)
}
