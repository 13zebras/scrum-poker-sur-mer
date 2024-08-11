'use client'
import { useEffect, useState } from 'react'
import CreateRoomModal from '@/components/CreateRoomModal'
import GearIcon from '@/components/icons/GearIcon'

export default function Host() {
	const [roomUrl, setRoomUrl] = useState('')
	// const [domain, setDomain] = useState('')
	// const [disabled, setDisabled] = useState(true)
	// const roomUrlRef = useRef<HTMLSpanElement>(null)

	const [hostFirstName, setHostFirstName] = useState('')

	// const hostRef = useRef<HTMLInputElement>(null)

	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		const hostname = window.location.hostname
	// 		const http = hostname === 'localhost' ? 'http' : 'https'
	// 		const port = window.location.port ? `:${window.location.port}` : ''
	// 		setDomain(`${http}://${hostname}${port}`)
	// 	}
	// }, [])

	// function generateAlphaNumeric() {
	// 	return Math.random().toString(36).substring(3)
	// }

	// function copyToClipboard() {
	// 	if (roomUrlRef.current) {
	// 		navigator.clipboard.writeText(roomUrlRef.current.textContent || '')
	// 		alert('Room URL copied to clipboard!')
	// 	}
	// 	setDisabled(false)
	// }

	// function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
	// 	event.preventDefault()
	// 	setHostFirstName(event.target.value)
	// 	setDisabled(false)
	// }

	// function handleCreateRoom() {
	// 	const aNumRoom = generateAlphaNumeric() + generateAlphaNumeric()
	// 	setRoomUrl(`${domain}/${aNumRoom}-${hostFirstName}`)
	// 	setDisabled(true)
	// 	if (hostRef.current) hostRef.current.value = ''
	// 	console.log('%c>>> hostFirstName:', 'color: red', hostFirstName)

	// 	// socket.emit('client-message', message, roomId)

	// 	console.log(
	// 		'%c>>> alphaNum room:',
	// 		'color: #f40',
	// 		aNumRoom,
	// 		aNumRoom.length,
	// 	)
	// 	console.log('%c>>> room:', 'color: #5f0', domain)
	// }

	return (
		<main className='px-16 py-10 w-full inline-flex flex-col items-center relative'>
			<h1 className='text-3xl text-gray-300'>Scrum Diving Host Room</h1>
			<div className='w-40 flex flex-col items-center gap-4 self-end absolute top-10 right-12'>
				<button
					type='button'
					className='btn btn-outline-gray btn-sm w-full'
				>
					<GearIcon className='text-lg' />
					Host Settings
				</button>
				<CreateRoomModal
					// domain={domain}
					roomUrl={roomUrl}
					setRoomUrl={setRoomUrl}
					hostFirstName={hostFirstName}
					setHostFirstName={setHostFirstName}
				/>
			</div>

			{/* Rest of the code */}
		</main>
	)
}
