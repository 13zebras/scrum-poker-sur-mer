'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import RightArrowIcon from './icons/RightArrowIcon'

type CreateCopyGoState = 'create' | 'copy' | 'go'

export default function CreateNewRoom() {
	const [createCopyGo, setCreateCopyGo] = useState<CreateCopyGoState>('create')
	const [showNameInput, setShowNameInput] = useState(true)
	const [roomUrl, setRoomUrl] = useState('')
	const [hostRoomUrl, setHostRoomUrl] = useState('')

	const hostRef = useRef<HTMLInputElement>(null)
	const [hostName, setHostName] = useState('')

	useEffect(() => {
		const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
		if (hostDataLocalStorage) {
			const hostData = JSON.parse(hostDataLocalStorage)
			if (hostData?.hostName) {
				setHostName(hostData.hostName)
				setShowNameInput(false)
			}
		}
		console.log('%c>>> New Room Handler hostDataLocalStorage:', 'color: red', hostDataLocalStorage)
	}, [])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setHostName(event.target.value)
	}

	function generateAlphaNumeric() {
		return Math.random().toString(36).substring(3)
	}

	function handleCreateRoom() {
		const hostname = window.location.hostname
		const http = hostname === 'localhost' ? 'http' : 'https'
		const port = window.location.port ? `:${window.location.port}` : ''

		const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
		if (hostDataLocalStorage) {
			const hostData = JSON.parse(hostDataLocalStorage)
			if (hostData?.hostRoomUrl) {
				setHostRoomUrl(hostData.hostRoomUrl)
			}
			if (hostData?.roomUrl) {
				setRoomUrl(hostData.roomUrl)
			}
		}
		console.log('%c>>> New Room Handler hostDataLocalStorage:', 'color: red', hostDataLocalStorage)
		const newRoomNumber = generateAlphaNumeric() + generateAlphaNumeric()
		const newRoomUrl = `${http}://${hostname}${port}/${newRoomNumber}`
		const newHostRoomUrl = `${http}://${hostname}${port}/host/${newRoomNumber}`

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

		setCreateCopyGo('copy')

		if (hostRef.current) hostRef.current.value = ''
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(roomUrl)
		setCreateCopyGo('go')
	}

	return (
		<div className='w-full h-full flex flex-col items-center gap-12 animate-fade-in-600'>
			<div className='w-full h-1/6 flex flex-col items-center justify-start'>
				<h1 className='text-4xl text-gray-300'>Scrum Under the Sea</h1>
				<h2 className='text-3xl text-gray-300 py-4'>Create a New Room</h2>
			</div>
			<div className='w-full h-52 flex flex-col items-center justify-start'>
				{createCopyGo === 'create' ? (
					<div className='h-full flex flex-col justify-end items-center gap-4'>
						{showNameInput ? (
							<input
								type='text'
								ref={hostRef}
								placeholder='Enter Your First Name'
								onChange={handleOnChange}
								className='input input-bordered input-info w-96 mb-2 text-gray-200 text-xl placeholder:text-lg placeholder:italic placeholder:text-slate-400/70'
							/>
						) : (
							<div className='flex flex-col sm:flex-row items-center justify-center gap-3 pb-8 text-4xl text-gray-300 text-center'>
								<span className=''>Welcome back</span>
								<span className=''>{hostName}!</span>
							</div>
						)}
					</div>
				) : (
					<div className='w-full h-full flex flex-col items-center justify-end gap-6 animate-fade-in-300'>
						<h3 className='pb-2 font-bold text-gray-200 text-4xl tracking-wide'>
							{hostName}'s Room URL
						</h3>
						<span className='text-gray-200 font-mono text-xl'>{roomUrl}</span>
						<div className='w-full h-[3.75rem] flex flex-col justify-center gap-1 items-center text-lg text-gray-300 text-center'>
							{createCopyGo === 'copy' && (
								<>
									<span>Click button to copy URL to the clipboard.</span>
									<span>Share this URL with your team members.</span>
								</>
							)}
							{createCopyGo === 'go' && (
								<span
									className='text-accent text-2xl font-bold tracking-wide saturate-125 animate-fade-in-300'
									style={{
										textShadow: '1px 1px 1px black, 3px 3px 1px black',
									}}
								>
									URL Copied to Clipboard!
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			<div className='w-96'>
				{createCopyGo === 'create' ? (
					<button
						type='button'
						className='btn btn-warning w-full text-xl'
						onClick={handleCreateRoom}
						disabled={!hostName}
					>
						Click to Create New Room
					</button>
				) : createCopyGo === 'copy' ? (
					<button
						type='button'
						onClick={copyToClipboard}
						className='btn btn-accent w-full text-xl animate-fade-in-300'
					>
						Copy Room URL to Clipboard
					</button>
				) : (
					<Link
						href={hostRoomUrl}
						className='btn btn-secondary w-full text-xl uppercase animate-fade-in-300'
					>
						Go to New Room
						<RightArrowIcon className='h-8 w-8 inline' />
					</Link>
				)}
			</div>
		</div>
	)
}

// TODO do I want to use previous room URL,
// 	or always have host get a new room URL?
// 	Currently displaying ONLY new room button
//  code below is for previous room URL.

// if (hostData?.hostRoomUrl) {
// 	setHostRoomUrl(hostData.hostRoomUrl)
// }
// if (hostData?.roomUrl) {
// 	setRoomUrl(hostData.roomUrl)
// }
//
// {hostRoomUrl && (
// 	<div className='flex flex-col items-center gap-3'>
// 		<div className='text-xl text-gray-300 tracking-wider'>Your Last Room URL:</div>
// 		<div className='text-base text-gray-300 pb-6'>{hostRoomUrl}</div>
// 		<button
// 			type='button'
// 			className='btn btn-accent btn-md-w'
// 			onClick={() => {
// 				setShowRoomDisplay(true)
// 			}}
// 		>
// 			Click to Use Last Room
// 		</button>
// 		<div className='text-lg text-gray-300 pt-16'>or if you prefer a new room:</div>
// 	</div>
// )}

// {showRoomDisplay && (
// 	<NewRoomDisplay roomUrl={roomUrl} hostRoomUrl={hostRoomUrl} hostName={hostName} />
// )}
