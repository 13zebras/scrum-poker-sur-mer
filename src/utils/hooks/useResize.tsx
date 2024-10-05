import { useState, useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export default function useResize(): [RefObject<HTMLDivElement>, number] {
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.getBoundingClientRect().width)
			}
		}
		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return [containerRef, containerWidth]
}
