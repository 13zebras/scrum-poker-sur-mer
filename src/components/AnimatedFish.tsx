import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { animationFrames } from '../utils/animationFrames'
import type { AnimatedFishProps } from '../utils/animationFrames'

export default function AnimatedFish() {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)
	const [isFlipped, setIsFlipped] = useState(false)
	const controls = useAnimationControls()
	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const moveScaleFactor = 3

		const animate = async () => {
			for (const frame of animationFrames) {
				setIsFlipped(frame.flipped)
				await controls.start({
					x: width * frame.x,
					y: height + frame.y,
					rotateZ: frame.rotateZ,
					transition: {
						duration: frame.duration * moveScaleFactor,
						delay: frame.delay,
						ease: frame.ease,
					},
				})
			}
		}

		animate()
		const totalDuration = animationFrames.reduce((total, frame) => total + frame.duration, 0)
		const totalDelay = animationFrames.reduce((total, frame) => total + frame.delay, 0)

		const intervalId = setInterval(animate, (totalDuration * moveScaleFactor + totalDelay) * 1000)
		return () => clearInterval(intervalId)
	}, [controls, width, height])

	return (
		<motion.img
			src='/clownfish-100x50.webp'
			alt='Clownfish like Nemo in ScrumPoker sous La Mer'
			style={{
				scaleX: isFlipped ? -1 : 1,
			}}
			animate={controls}
			initial={{ x: -100, y: height - 50 }}
			className='fixed w-[70px] h-[35px]'
		/>
	)
}
