import { useState } from 'react'

type RoomInfoData = {
	nameOfHost: string
	roomUrl?: string
	userName?: string
}

export default function RoomInfo({ roomUrl, nameOfHost, userName }: RoomInfoData) {
	const [isCopied, setIsCopied] = useState(false)
	const isUser = !!userName
	// console.log('%c>>> isUser:', 'color: red', isUser)

	const handleCopyUrl = () => {
		roomUrl && navigator.clipboard.writeText(roomUrl)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 5000)
	}

	return (
		<div className=' flex flex-row items-center justify-center font-mono text-gray-400 text-sm'>
			{isUser ? (
				<span>
					Your Name: {userName} | Host Name: {nameOfHost}
				</span>
			) : (
				<div className='flex items-center'>
					<button
						type='button'
						onClick={handleCopyUrl}
						className={`btn w-44 h-5 min-h-5 px-0 ${isCopied ? 'btn-copied' : 'btn-copy'}`}
					>
						{isCopied ? 'Copied to Clipboard' : 'Copy User Room URL:'}
					</button>
					<span className='ml-1'>{roomUrl}</span>
				</div>
			)}
		</div>
	)
}
