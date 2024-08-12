'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// import { socket } from '@/socket'

import RightArrowIcon from './icons/RightArrowIcon'

export default function NewRoomModal() {
	const [isLoading, setIsLoading] = useState(true)
	const [roomUrl, setRoomUrl] = useState('')
	const [hostRoomUrl, setHostRoomUrl] = useState('')
	const [hideGoBtn, setHideGoBtn] = useState(true)
	const [hideCreateBtn, setHideCreateBtn] = useState(true)
	const [showNameInput, setShowNameInput] = useState(true)
	const [domain, setDomain] = useState('')
	const roomUrlRef = useRef<HTMLSpanElement>(null)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const hostRef = useRef<HTMLInputElement>(null)
	const [hostFirstName, setHostFirstName] = useState('')

	const router = useRouter()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hostname = window.location.hostname
			const http = hostname === 'localhost' ? 'http' : 'https'
			const port = window.location.port ? `:${window.location.port}` : ''
			setDomain(`${http}://${hostname}${port}`)
		}
		const hostDataLocalStorage = localStorage.getItem('scrumDivingHostData')
		if (hostDataLocalStorage) {
			const hostData = JSON.parse(hostDataLocalStorage)
			if (hostData?.hostName) {
				setHostFirstName(hostData?.hostName)
				setHideCreateBtn(false)
				setShowNameInput(false)
			}
			console.log('%c>>> hostData LocalStorage', 'color: red', hostData)
		}
		setIsLoading(false)
	}, [])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setHostFirstName(event.target.value)
		setHideCreateBtn(false)
	}

	function generateAlphaNumeric() {
		return Math.random().toString(36).substring(3)
	}

	function copyToClipboard() {
		if (roomUrlRef.current) {
			navigator.clipboard.writeText(roomUrlRef.current.textContent || '')
			alert('Room URL copied to clipboard!')
		}
		setHideGoBtn(false)
	}

	const handleShowModal = useCallback(() => {
		dialogRef.current?.showModal()
	}, [])

	function handleCreateRoom() {
		const newRoomNumber = generateAlphaNumeric() + generateAlphaNumeric()
		setRoomUrl(`${domain}/${newRoomNumber}`)
		setHostRoomUrl(`${domain}/host/${newRoomNumber}`)
		if (hostRef.current) hostRef.current.value = ''
		setHideGoBtn(true)
		handleShowModal()
		console.log('%c>>> hostFirstName:', 'color: red', hostFirstName)
		console.log('%c>>> room:', 'color: #5f0', domain, newRoomNumber)
	}

	function goToNewRoom() {
		console.log('%c>>> user room', 'color: red', roomUrl)
		console.log('%c>>> host room', 'color: yellow', hostRoomUrl)
		setHideCreateBtn(true)
		const valuesLocalStorate = JSON.stringify({
			hostName: hostFirstName,
			roomUrl: hostRoomUrl,
		})
		localStorage.setItem('scrumDivingHostData', valuesLocalStorate)
		router.push(hostRoomUrl)
	}

	return (
		<div className='w-full flex flex-col items-center'>
			{!isLoading && (
				<div className='w-full flex flex-col items-center gap-6'>
					{showNameInput ? (
						<input
							type='text'
							ref={hostRef}
							placeholder='Enter Your First Name'
							onChange={handleOnChange}
							className='input input-bordered input-info w-72 text-gray-200 placeholder:italic placeholder:text-info/90'
						/>
					) : (
						<span className='text-2xl text-gray-300 tracking-wider pb-4'>
							Welcome back {hostFirstName}!
						</span>
					)}

					{/* <p className='text-sm text-gray-400 pt-2'>
						Then click button to create a new room:
					</p> */}

					<button
						type='button'
						className='btn btn-warning btn-sm w-72 text-base'
						onClick={handleCreateRoom}
						disabled={hideCreateBtn}
					>
						Click to Create New Room
					</button>
				</div>
			)}
			<dialog ref={dialogRef} className='modal'>
				<div className='modal-box pt-8 w-2/3 max-w-[38rem] flex flex-col items-center justify-between gap-12 border border-gray-700'>
					<h2 className='font-bold text-gray-200 text-[1.6rem]'>
						{hostFirstName}'s New Room URL
					</h2>
					<div className='flex flex-col items-center justify-center'>
						<span className='w-3/4 text-base text-gray-300 text-center pb-1'>
							Click the button to copy to the clipboard.
						</span>
						<span className='w-3/4 text-base text-gray-300 text-center pb-8'>
							Share this URL with your team members.
						</span>
						<span
							ref={roomUrlRef}
							className='text-gray-200 font-mono text-lg pb-6'
						>
							{roomUrl}
						</span>

						<button
							type='button'
							onClick={copyToClipboard}
							className='btn btn-accent btn-sm w-full max-w-72 text-base'
						>
							Copy Room URL to Clipboard
						</button>
					</div>

					<div className='modal-action w-full gap-3 items-center'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button
								disabled={hideGoBtn}
								type='submit'
								onClick={goToNewRoom}
								className='btn btn-secondary w-64 text-base uppercase'
							>
								Go To New Room
								<RightArrowIcon className='h-8 w-8 inline' />
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
