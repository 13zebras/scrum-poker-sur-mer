'use client'
import { useState, useRef, useEffect } from 'react'
import NewRoomDisplay from './NewRoomDisplay'

export default function CreateNewRoom() {
	const [showRoomDisplay, setShowRoomDisplay] = useState(false)
	const [roomUrl, setRoomUrl] = useState('')
	const [hostRoomUrl, setHostRoomUrl] = useState('')

	const [showNameInput, setShowNameInput] = useState(true)
	const [domain, setDomain] = useState('')
	const hostRef = useRef<HTMLInputElement>(null)
	const [hostName, setHostName] = useState('')

	useEffect(() => {
		const hostname = window.location.hostname
		const http = hostname === 'localhost' ? 'http' : 'https'
		const port = window.location.port ? `:${window.location.port}` : ''
		setDomain(`${http}://${hostname}${port}`)

		const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
		if (hostDataLocalStorage) {
			const hostData = JSON.parse(hostDataLocalStorage)
			if (hostData?.hostName) {
				setHostName(hostData.hostName)
				setShowNameInput(false)
			}
			if (hostData?.hostRoomUrl) {
				setHostRoomUrl(hostData.hostRoomUrl)
			}
			if (hostData?.roomUrl) {
				setRoomUrl(hostData.roomUrl)
			}
		}
		console.log('%c>>> CNR first load hostDataLocalStorage:', 'color: red', hostDataLocalStorage)
	}, [])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setHostName(event.target.value)
	}

	function generateAlphaNumeric() {
		return Math.random().toString(36).substring(3)
	}

	function handleCreateRoom() {
		const newRoomNumber = generateAlphaNumeric() + generateAlphaNumeric()
		const newRoomUrl = `${domain}/${newRoomNumber}`
		const newHostRoomUrl = `${domain}/host/${newRoomNumber}`

		setRoomUrl(newRoomUrl)
		setHostRoomUrl(newHostRoomUrl)

		localStorage.setItem(
			'scrumDivingHostData',
			JSON.stringify({
				hostName: hostName,
				roomUrl: newRoomUrl,
				hostRoomUrl: newHostRoomUrl,
				roomId: newRoomNumber,
			}),
		)

		setShowRoomDisplay(true)
		if (hostRef.current) hostRef.current.value = ''

		console.log('%c>>> hostName:', 'color: red', hostName)
		console.log('%c>>> room:', 'color: #5f0', newRoomUrl)
		console.log('%c>>> host room', 'color: yellow', newHostRoomUrl)
	}

	return (
		<div className='w-full h-full flex flex-col items-center'>
			{!showRoomDisplay && (
				<div className='w-full h-3/4 flex flex-col items-center justify-start animate-fade-in-600'>
					<h1 className='text-2xl text-gray-300'>Scrum Diving Host</h1>
					<h2 className='text-xl text-gray-300 py-4'>Create Room Page</h2>

					<div className='w-full h-full flex flex-col justify-center items-center gap-8'>
						{showNameInput && (
							<input
								type='text'
								ref={hostRef}
								placeholder='Enter Your First Name'
								onChange={handleOnChange}
								className='input input-bordered input-info w-80 text-gray-200 placeholder:italic placeholder:text-info/90'
							/>
						)}
						{!showNameInput && (
							<span className='w-96 text-3xl text-gray-300 text-center tracking-wider leading-relaxed pb-6'>
								Welcome back {hostName}!
							</span>
						)}
						{/* TODO do I want to use previous room URL,
								or always have host get a new room URL?
								Currently displaying previous room and new room buttons */}
						{/* {hostRoomUrl && (
							<div className='flex flex-col items-center gap-3'>
								<div className='text-xl text-gray-300 tracking-wider'>Your Last Room URL:</div>
								<div className='text-base text-gray-300 pb-6'>{hostRoomUrl}</div>
								<button
									type='button'
									className='btn btn-accent btn-md-w'
									onClick={() => {
										setShowRoomDisplay(true)
									}}
								>
									Click to Use Last Room
								</button>
								<div className='text-lg text-gray-300 pt-16'>or if you prefer a new room:</div>
							</div>
						)} */}

						<button
							type='button'
							className='btn btn-warning btn-md-w'
							onClick={handleCreateRoom}
							disabled={!hostName}
						>
							Click to Create New Room
						</button>
					</div>
				</div>
			)}
			{showRoomDisplay && (
				<NewRoomDisplay roomUrl={roomUrl} hostRoomUrl={hostRoomUrl} hostName={hostName} />
			)}
		</div>
	)
}
