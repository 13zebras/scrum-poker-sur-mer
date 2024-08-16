// HOST ROOM
'use client'

import { socketRoomEmitter } from '@/services/socket'

import StoryPoints from '@/components/StoryPoints'
import CardsContainer from '@/components/CardsContainer'

export default function RoomMainUi() {
	return (
		<div className='h-full w-full flex justify-center items-start gap-10 border-0 border-stone-900 '>
			<StoryPoints />
			<CardsContainer />
		</div>
	)
}
