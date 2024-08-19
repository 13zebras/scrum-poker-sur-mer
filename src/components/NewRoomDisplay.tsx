'use client'
import { useState } from 'react'
import Link from 'next/link'

import RightArrowIcon from './icons/RightArrowIcon'

type NewRoomProps = {
	roomUrl: string
	hostRoomUrl: string
	hostName: string
}

export default function NewRoomDisplay({
	roomUrl,
	hostRoomUrl,
	hostName,
}: NewRoomProps) {
	const [hideGoLink, setHideGoLink] = useState(true)

	const linkUrl = hideGoLink ? '' : hostRoomUrl

	function copyToClipboard() {
		navigator.clipboard.writeText(roomUrl)
		// alert('Room URL copied to clipboard!')
		setHideGoLink(false)
	}

	return (
		<div className='w-full flex flex-col items-center gap-16 animate-fade-in-500'>
			<div className='w-full max-w-[48rem] flex flex-col items-center justify-center gap-12'>
				<h2 className='font-bold text-gray-200 text-3xl'>
					{hostName}'s New Room URL
				</h2>
				<div className='flex flex-col items-center justify-center'>
					<span className='w-3/4 text-base text-gray-300 text-center pb-1'>
						Click the button to copy to the clipboard.
					</span>
					<span className='w-3/4 text-base text-gray-300 text-center pb-10'>
						Share this URL with your team members.
					</span>
					<span className='text-gray-200 font-mono text-lg pb-6'>
						{roomUrl}
					</span>

					<button
						type='button'
						onClick={copyToClipboard}
						disabled={!hideGoLink}
						className='btn btn-accent btn-md-w disabled:text-accent/100 disabled:bg-transparent disabled:opacity-100 disabled:text-[1.35rem] animate-fade-in-300'
					>
						{hideGoLink
							? 'Copy Room URL to Clipboard'
							: 'URL Copied to Clipboard!'}
					</button>
				</div>
			</div>
			<div className='h-10'>
				{!hideGoLink && (
					<Link
						href={linkUrl}
						className='btn btn-secondary btn-md-w uppercase duration-500'
					>
						Go to New Room
						<RightArrowIcon className='h-7 w-7 inline' />
					</Link>
				)}
			</div>
		</div>
	)
}
