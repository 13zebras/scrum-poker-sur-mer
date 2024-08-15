'use client'

import { useRouter } from 'next/navigation'

export default function ClearLocalStorageButton() {
	const router = useRouter()

	function handleOnClick() {
		localStorage.removeItem('scrumDivingHostData')
		window.location.reload()
	}
	return (
		<div className='w-40 absolute bottom-10 right-12'>
			<button
				type='button'
				className='btn btn-outline btn-secondary btn-sm w-full'
				onClick={handleOnClick}
			>
				Clear Local Storage
			</button>
		</div>
	)
}
