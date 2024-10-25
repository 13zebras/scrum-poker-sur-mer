'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import RightArrowIcon from './icons/RightArrowIcon'
import { useLocalStorage } from 'usehooks-ts'

type CreateCopyGoState = 'create' | 'copy' | 'go'

export default function CreateNewRoom() {
	const [createCopyGo, setCreateCopyGo] = useState<CreateCopyGoState>('create')

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

	const [name, setName] = useState<string>(nameOfHost)

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setName(event.target.value)
		// setHostData((prevData) => ({
		// 	...prevData,
		// 	nameOfHost: event.target.value,
		// }))
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && name) {
			handleCreateRoom()
		}
	}

	function handleClearLocalStorage() {
		localStorage.removeItem('scrumPokerLaMerStoryPoints')
		localStorage.removeItem('scrumPokerLaMerUser')
	}

	function handleUseLastRoom() {
		setCreateCopyGo('copy')
		setHostData({
			nameOfHost: nameOfHost,
			roomUrl: roomUrl,
			hostRoomUrl: hostRoomUrl,
			roomId: roomId,
			userId: userId,
		})
		handleClearLocalStorage()
	}

	function handleCreateRoom() {
		const hostname = window.location.hostname
		const http = hostname === 'localhost' ? 'http' : 'https'
		const port = window.location.port ? `:${window.location.port}` : ''

		const newRoomId = crypto.randomUUID().replace(/-/g, '').slice(0, 20)
		const newRoomUrl = `${http}://${hostname}${port}/${newRoomId}`
		const newHostRoomUrl = `${http}://${hostname}${port}/host/${newRoomId}`

		const newUserId = userId ? userId : crypto.randomUUID()

		setHostData({
			nameOfHost: name,
			roomUrl: newRoomUrl,
			hostRoomUrl: newHostRoomUrl,
			roomId: newRoomId,
			userId: newUserId,
		})
		handleClearLocalStorage()
		setCreateCopyGo('copy')

		if (hostRef.current) hostRef.current.value = ''
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(roomUrl)
		setCreateCopyGo('go')
	}

	return (
		<div className='w-full h-full flex flex-col items-center gap-6 animate-fade-in-500'>
			<div className='w-full h-1/6 flex flex-col items-center justify-start animate-fade-in-300'>
				<h1 className='text-3xl xs:text-4xl sm:text-5xl text-gray-200 text-center flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-2 tracking-wide'>
					<span>Scrum Poker</span>
					<span className='md:pl-3'>sous la Mer</span>
				</h1>
				{!nameOfHost && (
					<h2 className='text-2xl sm:text-3xl text-gray-200 py-8 animate-fade-in-300'>
						Create a New Room
					</h2>
				)}
			</div>

			<div className='w-full h-60 sm:h-80 flex flex-col items-center justify-start animate-fade-in-300'>
				{createCopyGo === 'create' ? (
					<div className='w-full h-full flex flex-col justify-end items-center'>
						{!nameOfHost ? (
							<input
								type='text'
								ref={hostRef}
								placeholder='Enter Your First Name'
								onChange={handleOnChange}
								onKeyDown={handleKeyDown}
								className='input input-bordered input-info w-full max-w-[22rem] mb-2 text-gray-200 text-xl placeholder:text-lg placeholder:italic placeholder:text-slate-400/70 shadow-xl shadow-black/70'
							/>
						) : (
							<>
								<div className='flex flex-col sm:flex-row items-center justify-center pb-14 text-2xl xs:text-3xl sm:text-4xl text-gray-300 text-center'>
									<span className='mr-[0.4em]'>Welcome back,</span>
									<span className=''>{nameOfHost}!</span>
								</div>
								{hostRoomUrl && (
									<div className='flex flex-col items-center'>
										<div className='text-xl text-gray-300 tracking-wider pb-2'>
											Your Last Room URL:
										</div>
										<div className='text-sm xs:text-base sm:text-lg text-gray-300 pb-6'>
											{hostRoomUrl}
										</div>
										<button
											type='button'
											className='btn btn-accent w-full max-w-[22rem] h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
											onClick={handleUseLastRoom}
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
					<div className='w-full h-full flex flex-col items-center justify-end animate-fade-in-300'>
						<h3 className='pb-6 sm:pb-10 font-bold text-gray-200 text-xl sm:text-3xl tracking-wide'>
							Room URL:
						</h3>
						<span className='text-gray-200 text-sm xs:text-lg sm:text-xl pb-20'>{roomUrl}</span>
						<div className='w-full h-[3.75rem] flex flex-col justify-center gap-1 items-center text-base xs:text-[1.2rem] text-gray-300 text-center pb-2'>
							{createCopyGo === 'copy' && (
								<>
									<span>Click button to copy URL to the clipboard.</span>
									<span>Share this URL with your team members.</span>
								</>
							)}
							{createCopyGo === 'go' && (
								<span className='text-slate-200 text-xl sm:text-2xl font-bold tracking-wide saturate-125 animate-fade-in-300'>
									URL Copied to Clipboard!
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			<div className='w-full max-w-[22rem] animate-fade-in-300'>
				{createCopyGo === 'create' ? (
					<button
						type='button'
						className='btn btn-warning w-full h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
						onClick={handleCreateRoom}
						disabled={!name}
					>
						Click to Create New Room
					</button>
				) : createCopyGo === 'copy' ? (
					<button
						type='button'
						onClick={copyToClipboard}
						className='btn btn-accent w-full h-11 min-h-11 text-base xs:text-xl animate-fade-in-300 shadow-xl shadow-black/70'
						tabIndex={0}
					>
						Copy Room URL to Clipboard
					</button>
				) : (
					<Link
						href={hostRoomUrl}
						className='btn btn-secondary w-full h-11 min-h-11 text-lg xs:text-xl uppercase animate-fade-in-300 shadow-xl shadow-black/70'
						tabIndex={0}
					>
						Go to New Room
						<RightArrowIcon className='h-8 w-8 inline' />
					</Link>
				)}
			</div>
		</div>
	)
}
