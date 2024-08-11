import type { ChatEvent } from '@/app/[room]/page'

export default function Events({ events }: { events: ChatEvent[] }) {
	return (
		<div className="min-h-40 w-full max-w-[700px] rounded-md border-2 border-gray-700 bg-gray-950 p-2 font-mono text-gray-300">
			<ul>
				{events.map((event) => {
					const roomAbbrev = event.room.slice(0, 4)
					return (
						<li key={event.timeStamp}>
							{event.message} ({roomAbbrev})
						</li>
					)
				})}
			</ul>
		</div>
	)
}
