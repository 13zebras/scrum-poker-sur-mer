import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'
import { SealifeImage } from './SealifeImage'
import { motion, AnimatePresence } from 'framer-motion'

export interface CardProps {
	name: string
	storyPoint: string
	imageNumber: number
	showPoints: boolean
}

export default function UserCard({ name, storyPoint, imageNumber, showPoints }: CardProps) {
	if (storyPoint === '--') showPoints = true

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 1, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				transition={{
					delay: Math.random() * 3,
					duration: 1,
					ease: 'easeInOut',
					scale: {
						type: 'spring',
						damping: 30,
						stiffness: 200,
						mass: 4,
						restDelta: 0.001,
					},
				}}
				className='card card-points relative'
			>
				<figure className='size-32 object-cover absolute'>
					<SealifeImage imageNum={imageNumber} alt={`${name} avatar profile`} />
				</figure>
				<div className='card-body card-body-points bg-black/20 gap-3 text-gray-100'>
					{showPoints ? (
						<h2
							className='card-title text-4xl h-10 tracking-wide'
							style={{
								textShadow: '1px 1px 1px black, 3px 3px 1px black',
							}}
						>
							{storyPoint}
						</h2>
					) : (
						<JellyFishOutlineIcon
							className='animate-fade-in-500 text-[2.5rem] h-10 font-bold'
							style={{
								textShadow: '1px 1px 1px black, 3px 3px 1px black',
							}}
						/>
					)}
					<div
						className='text-[1.1rem] leading-5 h-10 flex items-center'
						style={{
							textShadow: '1px 1px 1px black, 2px 2px 1px black',
						}}
					>
						{name}
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
