import { useState, useRef } from 'react'
import { socket } from '@/socket'

export default function MessageForm({ room: roomId }: { room: string }) {
	const [message, setMessage] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const messageRef = useRef<HTMLInputElement>(null)

	function handleSend(event: React.FormEvent) {
		event.preventDefault()
		setIsLoading(true)
		console.log('%c>>> message:', 'color: red', message, roomId)

		socket.emit('client-message', message, roomId)

		if (messageRef.current) messageRef.current.value = ''
	}

	return (
		<div className='py-6 w-full max-w-[700px]'>
			<form className='w-full flex flex-row items-center justify-start gap-4'>
				{/* <span className='text-gray-300 w-16'>Msg:</span> */}
				<button
					type='submit'
					disabled={isLoading}
					onClick={handleSend}
					className='btn btn-primary btn-sm'
				>
					Send Msg
				</button>
				<input
					ref={messageRef}
					placeholder='say something'
					onChange={(e) => setMessage(e.target.value)}
					className='input input-primary input-sm w-full placeholder:text-gray-500'
				/>
			</form>
		</div>
	)
}
