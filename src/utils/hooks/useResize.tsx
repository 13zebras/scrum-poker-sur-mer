import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useDebounceValue } from 'usehooks-ts'

type UseResizeReturn = {
	viewportWidth?: number
	viewportHeight?: number
	ref?: RefObject<HTMLDivElement>
	rect?: DOMRect | null
}

export default function useResize(containerType = 'both', debounceDelay = 300): UseResizeReturn {
	const containerRef = useRef<HTMLDivElement>(null)

	const [debouncedWidth, setViewportWidth] = useDebounceValue(0, debounceDelay)
	const [debouncedHeight, setViewportHeight] = useDebounceValue(0, debounceDelay)
	const [debouncedRect, setRect] = useDebounceValue<DOMRect | null>(null, debounceDelay)
	// const [debouncedWidth, setViewportWidth] = useState(0)
	// const [debouncedHeight, setViewportHeight] = useState(0)
	// const [debouncedRect, setRect] = useState<DOMRect | null>(null)

	const handleResize = useCallback(() => {
		const isViewport = containerType === 'viewport'
		const isContainer = containerType === 'container'
		const isBoth = containerType === 'both'

		let vpWidth = 0
		let vpHeight = 0
		let containerRect: DOMRect | null = null

		if (isViewport || isBoth) {
			vpWidth = window.innerWidth
			vpHeight = window.innerHeight
		}
		if (isContainer || isBoth) {
			containerRect = containerRef.current?.getBoundingClientRect() || null
		}

		setViewportWidth(vpWidth)
		setViewportHeight(vpHeight)
		setRect(containerRect)
	}, [containerType])

	useEffect(() => {
		handleResize() // Initial call

		let resizeObserver: ResizeObserver | null = null
		if (containerType !== 'viewport' && containerRef.current) {
			resizeObserver = new ResizeObserver(handleResize)
			resizeObserver.observe(containerRef.current)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (resizeObserver) {
				resizeObserver.disconnect()
			}
		}
	}, [containerType, handleResize])

	// useEffect(() => {
	// 	const isViewport = containerType === 'viewport'
	// 	const isContainer = containerType === 'container'
	// 	const isBoth = containerType === 'both'
	// 	const handleResize = () => {
	// 		let vpWidth = 0
	// 		let vpHeight = 0
	// 		let containerRect: DOMRect | null = null
	// 		if (isViewport || isBoth) {
	// 			vpWidth = window.innerWidth
	// 			vpHeight = window.innerHeight
	// 		}
	// 		if (isContainer || isBoth) {
	// 			containerRect = containerRef.current?.getBoundingClientRect() || null
	// 		}
	// 		setViewportWidth(vpWidth)
	// 		setViewportHeight(vpWidth)
	// 		setDebouncedRect(containerRect)
	// 	}
	// 	handleResize()

	// 	window.addEventListener('resize', handleResize)

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize)
	// 	}
	// }, [containerType])

	return {
		viewportWidth: debouncedWidth,
		viewportHeight: debouncedHeight,
		ref: containerType === 'viewport' ? undefined : containerRef,
		rect: debouncedRect,
	}
}
