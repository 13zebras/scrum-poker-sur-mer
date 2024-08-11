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
		<div className='pt-12 pb-8'>
			<form className='flex flex-col items-start gap-4'>
				<div className='w-full max-w-[700px] flex flex-row items-center justify-start gap-4'>
					<span className='text-gray-300 w-16'>Msg:</span>
					<input
						ref={messageRef}
						placeholder='say something'
						onChange={(e) => setMessage(e.target.value)}
						className='w-full bg-gray-900 text-gray-300 border border-gray-600 py-1 px-2 rounded outline-none focus:border-pink-950 focus:shadow-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm'
					/>

					<button
						type='submit'
						disabled={isLoading}
						onClick={handleSend}
						className='w-32 py-1 border-2 border-violet-800 rounded-xl bg-violet-950 hover:bg-violet-900 active:border-violet-600 text-zinc-300 text-sm disabled:opacity-50'
					>
						Send
					</button>
				</div>
			</form>
		</div>
	)
}
