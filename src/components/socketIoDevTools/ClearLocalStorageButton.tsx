'use client'

export default function ClearLocalStorageButton() {
	function handleOnClick() {
		localStorage.removeItem('scrumDivingHostData')
		localStorage.removeItem('scrumDivingAllowedStoryPoints')
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
