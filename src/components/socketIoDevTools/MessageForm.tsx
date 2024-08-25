import { useState, useRef } from 'react'
import { socketRoomEmitter } from '@/services/socket'

type Props = {
	roomId: string
	userName: string
}

export default function MessageForm({ roomId, userName }: Props) {
	const [message, setMessage] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const messageRef = useRef<HTMLInputElement>(null)

	function handleSend(event: React.FormEvent) {
		event.preventDefault()
		setIsLoading(true)
		// const timeStamp = Date.now().toString()
		console.log(
			'%c>>> MessageForms:',
			'color: red',
			message,
			userName,
			// timeStamp,
			roomId,
		)

		socketRoomEmitter('chat-data', message, userName, roomId)
		if (messageRef.current) messageRef.current.value = ''
		setIsLoading(false)
	}

	return (
		<div className='py-6 w-full'>
			<form className='w-full flex flex-row items-center justify-start gap-4'>
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
