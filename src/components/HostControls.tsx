'use client'

export default function HostControls() {
	return (
		<div className='w-full border-0 border-gray-800 flex justify-center items-center gap-40 px-2'>
			<button
				type='button'
				className='btn btn-accent btn-sm w-36'
				// onClick={}
				// disabled={}
			>
				Show Points
			</button>
			<button
				type='button'
				className='btn btn-error btn-sm w-36'
				// onClick={}
				// disabled={}
			>
				Delete Points
			</button>
		</div>
	)
}
