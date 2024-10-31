'use client'
import { useState, useRef } from 'react'

import { useLocalStorage } from 'usehooks-ts'
import NewRoomOrLastRoom from '@/components/create-new-room/NewRoomOrLastRoom'
import CreateNewRoomButton from './CreateNewRoomButton'
import GoToNewRoom from './GoToNewRoom'

export default function CreateNewRoom() {
	const [isCreate, setIsCreate] = useState(true)

	const hostRef = useRef<HTMLInputElement>(null)
	const [{ nameOfHost, roomUrl, hostRoomUrl, roomId, userId }, setHostData] = useLocalStorage(
		'scrumPokerLaMerHostData',
		{
			nameOfHost: '',
			roomUrl: '',
			hostRoomUrl: '',
			roomId: '',
			userId: '',
		},
	)

	const [newName, setNewName] = useState<string>(nameOfHost)

	function handleClearPointsUserLocalStorage() {
		localStorage.removeItem('scrumPokerLaMerStoryPoints')
		localStorage.removeItem('scrumPokerLaMerUser')
	}

	function handleUseLastRoom() {
		setIsCreate(false)
		setHostData({
			nameOfHost: nameOfHost,
			roomUrl: roomUrl,
			hostRoomUrl: hostRoomUrl,
			roomId: roomId,
			userId: userId,
		})
		navigator.clipboard.writeText(roomUrl)
		handleClearPointsUserLocalStorage()
	}

	function handleCreateRoom() {
		const hostname = window.location.hostname
		const http = hostname === 'localhost' ? 'http' : 'https'
		const port = window.location.port ? `:${window.location.port}` : ''

		const newRoomId = crypto.randomUUID().replace(/-/g, '').slice(0, 20)
		const newRoomUrl = `${http}://${hostname}${port}/${newRoomId}`
		const newHostRoomUrl = `${http}://${hostname}${port}/host/${newRoomId}`

		const newUserId = userId ? userId : crypto.randomUUID()
		navigator.clipboard.writeText(newRoomUrl)

		setHostData({
			nameOfHost: newName,
			roomUrl: newRoomUrl,
			hostRoomUrl: newHostRoomUrl,
			roomId: newRoomId,
			userId: newUserId,
		})
		handleClearPointsUserLocalStorage()
		setIsCreate(false)

		if (hostRef.current) hostRef.current.value = ''
	}

	return (
		<div className='w-full h-full flex flex-col items-center gap-6 motion-safe:animate-fade-in-300'>
			<div
				className='w-full h-1/6 flex flex-col items-center justify-start '
				style={{
					textShadow: '1px 1px 1px black, 3px 3px 1px black',
				}}
			>
				<h1 className='text-3xl xs:text-4xl sm:text-5xl text-gray-200 text-center flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-2 tracking-wide'>
					<span>Scrum Poker</span>
					<span className='md:pl-3'>sous la Mer</span>
				</h1>
				{!nameOfHost && (
					<h2 className='text-2xl sm:text-3xl text-gray-200 py-8'>Create a New Room</h2>
				)}
			</div>

			{isCreate ? (
				<>
					<NewRoomOrLastRoom
						nameOfHost={nameOfHost}
						roomUrl={roomUrl}
						hostRoomUrl={hostRoomUrl}
						hostRef={hostRef}
						handleUseLastRoom={handleUseLastRoom}
						setNewName={setNewName}
					/>
					<div className='w-full max-w-[22rem] motion-safe:animate-fade-in-300'>
						<CreateNewRoomButton handleCreateRoom={handleCreateRoom} newName={newName} />
					</div>
				</>
			) : (
				<GoToNewRoom roomUrl={roomUrl} hostRoomUrl={hostRoomUrl} />
			)}
		</div>
	)
}
