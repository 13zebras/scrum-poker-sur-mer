'use client'

export default function ClearLocalStorageButton() {
	function handleOnClick() {
		localStorage.removeItem('scrumPokerLaMerHostData')
		localStorage.removeItem('scrumPokerLaMerAllowedStoryPoints')
		localStorage.removeItem('scrumPokerLaMerStoryPoints')
		localStorage.removeItem('scrumPokerLaMerShowHostCard')
		localStorage.removeItem('scrumPokerLaMerUser')
		window.location.reload()
	}
	return (
		<div className='w-28 absolute bottom-6 right-8'>
			<button
				type='button'
				className='btn btn-outline btn-accent btn-sm w-full'
				onClick={handleOnClick}
			>
				Clear Data
			</button>
		</div>
	)
}
