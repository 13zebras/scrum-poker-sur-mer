// import { useEffect, useState, useRef } from 'react'
import NewRoomModal from '@/components/NewRoomModal'
import HostSettingsButton from '@/components/HostSettingsButton'
import ClearLocalStorageButton from '@/components/socketIoTest/ClearLocalStorageButton'

export default function Host() {
	return (
		<main className='px-16 py-10 w-full h-screen inline-flex flex-col items-center relative'>
			<h1 className='text-3xl text-gray-300'>Scrum Diving Host</h1>
			<h2 className='text-2xl text-gray-300 py-4'>Create Room Page</h2>
			<HostSettingsButton />
			<div className='flex flex-col items-center py-24'>
				<NewRoomModal />
			</div>
			<ClearLocalStorageButton />
		</main>
	)
}
