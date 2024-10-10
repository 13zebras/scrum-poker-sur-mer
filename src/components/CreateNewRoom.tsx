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
	const [userId, setUserId] = useState('')
	const hostRef = useRef<HTMLInputElement>(null)
	const [nameOfHost, setNameOfHost] = useState('')

	useEffect(() => {
		const hostDataLocalStorage = localStorage.getItem('scrumPokerLaMerHostData')
		if (hostDataLocalStorage) {
			const hostData = JSON.parse(hostDataLocalStorage)
			if (hostData?.nameOfHost) {
				setNameOfHost(hostData.nameOfHost)
				setShowNameInput(false)
			}
			if (hostData?.hostRoomUrl) {
				setHostRoomUrl(hostData.hostRoomUrl)
			}
			if (hostData?.roomUrl) {
				setRoomUrl(hostData.roomUrl)
			}
			if (hostData?.userId) {
				setUserId(hostData.userId)
			} else {
				setUserId(crypto.randomUUID())
			}
		}
		// console.log('%c>>> New Room Handler hostDataLocalStorage:', 'color: red', hostDataLocalStorage)
	}, [])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNameOfHost(event.target.value)
	}

	function handleCreateRoom() {
		const hostname = window.location.hostname
		const http = hostname === 'localhost' ? 'http' : 'https'
		const port = window.location.port ? `:${window.location.port}` : ''

		// const hostDataLocalStorage = localStorage.getItem('scrumPokerLaMerHostData')
		// if (hostDataLocalStorage) {
		// 	const hostData = JSON.parse(hostDataLocalStorage)
		// 	if (hostData?.hostRoomUrl) {
		// 		setHostRoomUrl(hostData.hostRoomUrl)
		// 	}
		// 	if (hostData?.roomUrl) {
		// 		setRoomUrl(hostData.roomUrl)
		// 	}
		// }
		// console.log('%c>>> New Room Handler hostDataLocalStorage:', 'color: red', hostDataLocalStorage)
		const newRoomNumber = crypto.randomUUID().replace(/-/g, '').slice(0, 20)
		const newRoomUrl = `${http}://${hostname}${port}/${newRoomNumber}`
		const newHostRoomUrl = `${http}://${hostname}${port}/host/${newRoomNumber}`

		setRoomUrl(newRoomUrl)
		setHostRoomUrl(newHostRoomUrl)

		const newUserId = userId ?? crypto.randomUUID()

		localStorage.setItem(
			'scrumPokerLaMerHostData',
			JSON.stringify({
				nameOfHost: nameOfHost,
				roomUrl: newRoomUrl,
				hostRoomUrl: newHostRoomUrl,
				roomId: newRoomNumber,
				userId: newUserId,
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
		<div className='w-full h-full flex flex-col items-center gap-6 animate-fade-in-600'>
			<div className='w-full h-1/6 flex flex-col items-center justify-start'>
				<h1
					className='text-5xl text-gray-200'
					style={{
						textShadow: '-1px -1px 3px black, 3px 3px 3px black',
					}}
				>
					ScrumPoker sous La Mer
				</h1>
				{showNameInput && (
					<h2
						className='text-3xl text-gray-200 py-8'
						style={{
							textShadow: '-1px -1px 3px black, 3px 3px 3px black',
						}}
					>
						Create a New Room
						{/* {hostRoomUrl ? 'Use or Create a Room' : 'Create a New Room'} */}
					</h2>
				)}
			</div>
			<div className='w-full h-80 flex flex-col items-center justify-start'>
				{createCopyGo === 'create' ? (
					<div className='w-full h-full flex flex-col justify-end items-center'>
						{showNameInput ? (
							<input
								type='text'
								ref={hostRef}
								placeholder='Enter Your First Name'
								onChange={handleOnChange}
								className='input input-bordered input-info w-[22rem] mb-2 text-gray-200 text-xl placeholder:text-lg placeholder:italic placeholder:text-slate-400/70 shadow-xl shadow-black/70'
							/>
						) : (
							<>
								<div
									className='flex flex-col sm:flex-row items-center justify-center pb-14 text-4xl text-gray-300 text-center'
									style={{
										textShadow: '-1px -1px 2px black, 3px 3px 3px black',
									}}
								>
									<span className='mr-[0.4em]'>Welcome back,</span>
									<span className=''>{nameOfHost}!</span>
								</div>
								{hostRoomUrl && (
									<div
										className='flex flex-col items-center'
										style={{
											textShadow: '-1px -1px 2px black, 2px 2px 2px black',
										}}
									>
										<div className='text-xl text-gray-300 tracking-wider pb-2'>
											Your Last Room URL:
										</div>
										<div className='text-lg text-gray-300 pb-6'>{hostRoomUrl}</div>
										<button
											type='button'
											className='btn btn-accent w-[22rem] h-11 min-h-11 text-xl shadow-xl shadow-black/70'
											onClick={() => {
												setCreateCopyGo('copy')
											}}
										>
											Click to Use Last Room
										</button>
										<div className='text-xl text-gray-300 pt-[4.25rem]'>
											Or if you prefer a new room:
										</div>
									</div>
								)}
							</>
						)}
					</div>
				) : (
					<div
						className='w-full h-full flex flex-col items-center justify-end animate-fade-in-300'
						style={{
							textShadow: '-1px -1px 2px black, 2px 2px 2px black',
						}}
					>
						<h3 className='pb-10 font-bold text-gray-200 text-3xl tracking-wide'>
							{/* {nameOfHost}'s Room URL */}
							Room URL:
						</h3>
						<span className='text-gray-200 font-mono text-xl pb-20'>{roomUrl}</span>
						<div className='w-full h-[3.75rem] flex flex-col justify-center gap-1 items-center text-[1.2rem] ita text-gray-300 text-center pb-2'>
							{createCopyGo === 'copy' && (
								<>
									<span>Click button to copy URL to the clipboard.</span>
									<span>Share this URL with your team members.</span>
								</>
							)}
							{createCopyGo === 'go' && (
								<span
									className='text-slate-200 text-2xl font-bold tracking-wide saturate-125 animate-fade-in-300'
									style={{
										textShadow: '-1px -1px 2px black, 3px 3px 3px black',
									}}
								>
									URL Copied to Clipboard!
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			<div className='w-[22rem]'>
				{createCopyGo === 'create' ? (
					<button
						type='button'
						className='btn btn-warning w-full h-11 min-h-11 text-xl shadow-xl shadow-black/70'
						onClick={handleCreateRoom}
						disabled={!nameOfHost}
					>
						Click to Create New Room
					</button>
				) : createCopyGo === 'copy' ? (
					<button
						type='button'
						onClick={copyToClipboard}
						className='btn btn-accent w-full h-11 min-h-11 text-xl animate-fade-in-300 shadow-xl shadow-black/70'
					>
						Copy Room URL to Clipboard
					</button>
				) : (
					<Link
						href={hostRoomUrl}
						className='btn btn-secondary w-full h-11 min-h-11 text-xl uppercase animate-fade-in-300 shadow-xl shadow-black/70'
					>
						Go to New Room
						<RightArrowIcon className='h-8 w-8 inline' />
					</Link>
				)}
			</div>
		</div>
	)
}
