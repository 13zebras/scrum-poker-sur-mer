export default function useLocalStorage() {
	// biome-ignore lint/suspicious/noExplicitAny: can pass anything
	const setItemLocalStorage = (key: string, value: any) => {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error('Error setting localStorage item:', error)
		}
	}

	const getItemLocalStorage = (key: string) => {
		try {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : null
		} catch (error) {
			console.error('Error getting localStorage item:', error)
			return null
		}
	}

	const removeItemLocalStorage = (key: string) => {
		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.error('Error removing localStorage item:', error)
		}
	}

	return { setItemLocalStorage, getItemLocalStorage, removeItemLocalStorage }
}
