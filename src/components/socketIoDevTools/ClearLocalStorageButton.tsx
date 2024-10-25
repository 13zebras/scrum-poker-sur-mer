'use client'

import removeAllLocalStorageData from '@/utils/helpers/removeAllLocalStorageData'

export default function ClearLocalStorageButton() {
	return (
		<div className='w-28 absolute bottom-6 right-8'>
			<button
				type='button'
				className='btn btn-outline btn-accent btn-sm h-6 min-h-6 w-full'
				onClick={removeAllLocalStorageData}
			>
				Clear Data
			</button>
		</div>
	)
}
