import { useEffect, useState, useCallback, useRef } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { motion, useAnimationControls } from 'framer-motion'
import AnimatedFishButton from './AnimatedFishButton'
import TropicalFishIcon from './icons/TropicalFishIcon'
import useResize from '@/utils/hooks/useResize'

export default function AnimatedFish() {
	const [isFishSwimming, setIsFishSwimming] = useState(false)
	const [displayNone, setDisplayNone] = useState(false)

	const [isFlipped, setIsFlipped] = useState(false)
	const controls = useAnimationControls()
	const animationRef = useRef<boolean>(false)

	const { viewportWidth, viewportHeight } = useResize()

	const createFrames = useCallback(() => {
		const durationScale = 1
		const numberOfFrames = 41
		const halfWay = Math.floor(numberOfFrames / 2)
		const yBase = 0.7

		const frames = [
			{
				flipped: false,
				x: -2 / numberOfFrames,
				y: yBase + 0.05,
				duration: durationScale,
				delay: 0,
				ease: 'linear',
			},
		]
		for (let i = 0; i < numberOfFrames; i++) {
			const isFlipped = i > halfWay
			let x = i > halfWay ? 1 - (i - halfWay) / halfWay : i / halfWay

			const randomChangeY = Math.random() * 0.1 + 0.15
			const y = yBase + Math.sin(i * 0.5) * randomChangeY

			let duration = (1 + Math.random() * 0.5) * durationScale
			if (i === halfWay) {
				x += 1 / halfWay
				duration *= 1.3
			}
			const delay = 0
			const ease = 'linear'
			frames.push({ flipped: isFlipped, x, y, duration, delay, ease })
		}
		const lastY = 0.75 + Math.sin(numberOfFrames * 0.5) * 0.2
		frames.push({
			flipped: true,
			x: -2 / numberOfFrames,
			y: lastY,
			duration: durationScale,
			delay: 0,
			ease: 'linear',
		})
		return frames
	}, [])

	useEffect(() => {
		const animationFramesRandom = createFrames()
		animationRef.current = isFishSwimming

		const animate = async () => {
			for (const frame of animationFramesRandom) {
				if (!animationRef.current) break

				setIsFlipped(frame.flipped)
				await controls.start({
					x: viewportWidth ? viewportWidth * frame.x : 0,
					y: viewportHeight ? viewportHeight * frame.y : 0,
					transition: {
						duration: frame.duration,
						delay: frame.delay,
						ease: frame.ease,
					},
				})
			}
			if (animationRef.current && isFishSwimming) {
				animate()
			}
		}

		if (isFishSwimming) {
			animate()
		} else {
			controls.stop()
		}

		// console.log('%c>>> viewportWidth', 'color: red', viewportWidth)
		// console.log('%c>>> viewportHeight', 'color: yellow', viewportHeight)
		return () => {
			animationRef.current = false
			controls.stop()
			setTimeout(() => {
				animationRef.current ? setDisplayNone(false) : setDisplayNone(true)
			}, 1000)
		}
	}, [controls, viewportWidth, viewportHeight, isFishSwimming, createFrames])

	return (
		<div className='absolute top-0 left-0 w-full h-full'>
			<AnimatedFishButton isFishSwimming={isFishSwimming} setIsFishSwimming={setIsFishSwimming} />
			<motion.div
				style={{
					scaleX: isFlipped ? 1 : -1,
				}}
				animate={controls}
				initial={{
					x: viewportWidth ? viewportWidth * -0.1 : 0,
					y: viewportHeight ? viewportHeight * 0.75 : 0,
				}}
				className={`${isFishSwimming ? 'opacity-100' : 'opacity-0'} fixed z-0 transition-opacity duration-500 ${displayNone ? 'hidden' : ''}`}
			>
				<TropicalFishIcon className='size-9' />
			</motion.div>
		</div>
	)
}
