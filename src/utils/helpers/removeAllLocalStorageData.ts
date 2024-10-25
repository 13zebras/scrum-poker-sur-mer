export default function removeAllLocalStorageData() {
	localStorage.removeItem('scrumPokerLaMerHostData')
	localStorage.removeItem('scrumPokerLaMerAllowedStoryPoints')
	localStorage.removeItem('scrumPokerLaMerStoryPoints')
	localStorage.removeItem('scrumPokerLaMerShowHostCard')
	localStorage.removeItem('scrumPokerLaMerUser')
	window.location.reload()
}
