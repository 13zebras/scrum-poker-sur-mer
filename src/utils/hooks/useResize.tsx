import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useDebounceValue } from 'usehooks-ts'

type UseResizeReturn = {
	width: number
	height: number
	ref?: RefObject<HTMLDivElement>
	isReady: boolean
}

export default function useResize(
	containerType = 'viewport',
	debounceDelay = 300,
): UseResizeReturn {
	const containerRef = useRef<HTMLDivElement>(null)

	const [debouncedWidth, setContainerWidth] = useDebounceValue(0, debounceDelay)
	const [debouncedHeight, setContainerHeight] = useDebounceValue(0, debounceDelay)
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			let newWidth = 0
			let newHeight = 0
			if (containerType === 'viewport') {
				newWidth = window.innerWidth
				newHeight = window.innerHeight
			} else if (containerRef.current) {
				newWidth = containerRef.current.getBoundingClientRect().width
				newHeight = containerRef.current.getBoundingClientRect().height
			}
			setContainerWidth(newWidth)
			setContainerHeight(newHeight)
			setIsReady(newWidth > 0 && newHeight > 0)
		}
		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [containerType, setContainerWidth, setContainerHeight])

	return {
		width: debouncedWidth,
		height: debouncedHeight,
		ref: containerType === 'window' ? undefined : containerRef,
		isReady,
	}
}
