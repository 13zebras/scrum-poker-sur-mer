import type { RoomInfoData } from '@/components/RoomMainUi'

export default function RoomInfo({ roomId, userName }: RoomInfoData) {
	return (
		<div className=' flex flex-row items-center justify-start gap-4 font-mono text-sm text-gray-400'>
			<span className=''>Your Name: {userName}</span>
			<span className=''> | </span>
			<span className=''>RoomId: {roomId}</span>
		</div>
	)
}
