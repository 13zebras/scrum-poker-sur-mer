'use client'
import { useState } from 'react'
import Link from 'next/link'

import RightArrowIcon from './icons/RightArrowIcon'

type NewRoomProps = {
	roomUrl: string
	hostRoomUrl: string
	hostName: string
}

export default function NewRoomDisplay({ roomUrl, hostRoomUrl, hostName }: NewRoomProps) {
	const [showGoLink, setShowGoLink] = useState(false)
	const linkUrl = showGoLink ? hostRoomUrl : ''

	function copyToClipboard() {
		navigator.clipboard.writeText(roomUrl)
		// alert('Room URL copied to clipboard!')
		setShowGoLink(true)
	}

	return (
		<div className='w-full h-5/6 flex flex-col justify-center items-center gap-12 animate-fade-in-500'>
			<div className='w-full flex flex-col items-center justify-center gap-12'>
				<h2 className='pb-4 font-bold text-gray-200 text-4xl tracking-wide'>
					{hostName}'s Room URL
				</h2>
				<span className='text-gray-200 font-mono font-bold text-lg'>{roomUrl}</span>
				<div className='w-3/4 flex flex-col items-center justify-center relative'>
					<div
						className={`${showGoLink && 'blur-[2px] opacity-40'} flex flex-col text-lg text-gray-300 text-center pb-1`}
					>
						<span>Click button to copy URL to the clipboard.</span>
						<span>Share this URL with your team members.</span>
					</div>
					{showGoLink && (
						<div
							className='absolute top-2 text-accent text-[1.6rem] text-center font-bold -rotate-[4deg] tracking-wide animate-fade-in-500 saturate-150'
							style={{
								textShadow: '1px 1px 1px black, 3px 3px 1px black',
							}}
						>
							URL Copied to Clipboard!
						</div>
					)}
				</div>
			</div>
			<div className='flex flex-col justify-end'>
				{showGoLink ? (
					<>
						{/* <div className='text-accent text-xl text-center'>
						URL Copied to Clipboard!
					</div> */}
						<Link href={linkUrl} className='btn btn-secondary btn-md-w uppercase duration-500'>
							Go to New Room
							<RightArrowIcon className='h-7 w-7 inline' />
						</Link>
					</>
				) : (
					<>
						{/* <div className='text-accent text-xl text-center'>
							URL Copied to Clipboard!
						</div> */}
						<button
							type='button'
							onClick={copyToClipboard}
							className='btn btn-accent btn-md-w animate-fade-in-300'
							// className='btn btn-accent btn-md-w disabled:text-accent/100 disabled:bg-transparent disabled:opacity-100 disabled:text-xl animate-fade-in-300'
						>
							Copy Room URL to Clipboard
						</button>
					</>
				)}
			</div>
		</div>
	)
}
