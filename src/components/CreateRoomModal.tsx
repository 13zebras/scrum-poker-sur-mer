import { useState, useRef, useCallback, useEffect } from 'react'
import { socket } from '@/socket'

interface Props {
	// domain: string
	roomUrl: string
	setRoomUrl: React.Dispatch<React.SetStateAction<string>>
	hostFirstName: string
	setHostFirstName: React.Dispatch<React.SetStateAction<string>>
}

export default function CreateRoomModal({
	// domain,
	roomUrl,
	setRoomUrl,
	hostFirstName,
	setHostFirstName,
}: Props) {
	const [disabled, setDisabled] = useState(true)
	const [showUrl, setShowUrl] = useState(false)
	const [domain, setDomain] = useState('')
	const roomUrlRef = useRef<HTMLSpanElement>(null)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const hostRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hostname = window.location.hostname
			const http = hostname === 'localhost' ? 'http' : 'https'
			const port = window.location.port ? `:${window.location.port}` : ''
			setDomain(`${http}://${hostname}${port}`)
		}
	}, [])

	const handleShow = useCallback(() => {
		dialogRef.current?.showModal()
	}, [])

	function generateAlphaNumeric() {
		return Math.random().toString(36).substring(3)
	}

	function copyToClipboard() {
		if (roomUrlRef.current) {
			navigator.clipboard.writeText(roomUrlRef.current.textContent || '')
			alert('Room URL copied to clipboard!')
		}
		// setDisabled(false)
	}

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setHostFirstName(event.target.value)
		setDisabled(false)
	}

	function handleCreateRoom() {
		const aNumRoom = generateAlphaNumeric() + generateAlphaNumeric()
		setRoomUrl(`${domain}/${aNumRoom}`)
		setDisabled(true)
		setShowUrl(true)
		if (hostRef.current) hostRef.current.value = ''
		console.log('%c>>> hostFirstName:', 'color: red', hostFirstName)

		// socket.emit('client-message', message, roomId)

		console.log(
			'%c>>> alphaNum room:',
			'color: #f40',
			aNumRoom,
			aNumRoom.length,
		)
		console.log('%c>>> room:', 'color: #5f0', domain)
	}

	console.log('%c>>> showUrl', 'color: red', showUrl)

	return (
		<div className='w-full'>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				type='button'
				className='btn btn-outline-gray btn-sm w-full'
				onClick={handleShow}
			>
				Create New Room
			</button>
			<dialog ref={dialogRef} className='modal'>
				<div className='modal-box pt-8 w-2/3 max-w-xl flex flex-col items-center justify-between gap-10 border border-gray-700'>
					<h2 className='font-bold text-2xl'>Host Create Room</h2>
					{/* {showUrl && ( */}
					<div className='w-full flex flex-col items-center justify-center gap-4 h-24'>
						{showUrl ? (
							<>
								<span
									ref={roomUrlRef}
									className='text-gray-300 font-mono text-md'
								>
									{roomUrl}
								</span>

								<button
									type='button'
									onClick={copyToClipboard}
									className='btn btn-secondary btn-sm w-full max-w-60'
								>
									Copy Room URL
								</button>
							</>
						) : (
							<>
								<input
									type='text'
									ref={hostRef}
									placeholder='Enter Your First Name'
									// onChange={(e) => setHostFirstName(e.target.value)}
									onChange={handleOnChange}
									className='input input-bordered input-sm input-primary w-full max-w-60 placeholder:italic placeholder:opacity-70'
								/>
								<button
									type='submit'
									onClick={handleCreateRoom}
									disabled={disabled}
									className='btn btn-accent btn-sm w-full max-w-60'
								>
									Create New Room
								</button>
							</>
						)}
					</div>

					{/* {!showUrl && (
						<div className='w-full max-w-60'>
							<input
								type='text'
								ref={hostRef}
								placeholder='Enter Your First Name'
								// onChange={(e) => setHostFirstName(e.target.value)}
								onChange={handleOnChange}
								className='input input-bordered input-sm input-primary w-full placeholder:italic placeholder:opacity-70'
							/>
							<button
								type='submit'
								onClick={handleCreateRoom}
								disabled={disabled}
								className='btn btn-accent btn-sm w-full max-w-60'
							>
								Create New Room
							</button>
						</div>
					)} */}

					<div className='modal-action w-full m-0'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button
								type='submit'
								onClick={() => setShowUrl(false)}
								className='btn btn-outline btn-sm'
							>
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

// <button
// 	type='button'
// 	onClick={copyToClipboard}
// 	className='w-48 px-4 py-1 border-2 border-green-700 text-zinc-300 text-sm rounded-xl bg-green-800 hover:bg-green-700 hover:text-zinc-100 active:border-green-600 active:bg-green-800 '
// >
// 	Copy Room URL
// </button>

{
	/* <button
	type='submit'
	onClick={handleCreateRoom}
	disabled={disabled}
	className='w-48 py-1 border-2 border-violet-800 rounded-xl bg-violet-950 hover:bg-violet-900 active:border-violet-600 text-zinc-300 text-sm disabled:bg-violet-950/60 disabled:text-zinc-300/40 disabled:border-violet-950/30'
>
	Create New Room
</button> */
}
