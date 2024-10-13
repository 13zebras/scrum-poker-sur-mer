'use client'

import StoryPointsContainer from '@/components/StoryPointsContainer'
import CardsContainer from '@/components/CardsContainer'

export type RoomData = {
	roomId: string
	userName: string
	userId: string
}

export default function RoomMainUi({ roomId, userName, userId }: RoomData) {
	return (
		<div className='h-full w-full flex flex-col justify-start items-center gap-10'>
			<div className='h-full w-full flex flex-col justify-center items-center gap-12 border-0 border-stone-800 '>
				<StoryPointsContainer roomId={roomId} userName={userName} userId={userId} />
				<CardsContainer />
			</div>
		</div>
	)
}
