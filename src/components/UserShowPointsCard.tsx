// import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'
import { SealifeImage } from './SealifeImage'
import { motion, AnimatePresence } from 'framer-motion'

type CardProps = {
	name: string
	storyPoint: string
	imageNumber: number
	index: number
	numberOfCards: number
	numberOfBlanks: number
}

export default function UserShowPointsCard({
	name,
	storyPoint,
	imageNumber,
	index,
	numberOfCards,
	numberOfBlanks,
}: CardProps) {
	// All cards are 8rem = 128px wide/tall

	// NOTE blank = blankCard
	const isBlank = storyPoint === '--'

	// blank cards have a few different css properties
	const bgTextColorGap = isBlank
		? 'bg-black/50 text-gray-400 gap-6'
		: 'bg-black/20 text-gray-100 gap-3'
	const blankPosition = isBlank ? 'absolute' : 'relative'

	// need the index of the first blank card to get the proper seuquence and delay
	const firstblankIndex = numberOfBlanks > 0 ? numberOfCards - numberOfBlanks : 0

	// this card is how many cards from the end?
	const numberFromLastCard = numberOfCards - index - 1

	// 45px of each blank card left visible so the name can be read.
	const blankRightA = isBlank ? numberFromLastCard * 45 : 0

	// blank cards are 80% of the size of the other cards
	const blankScaleA = isBlank ? 0.8 : 1

	// blank cards do not flip around the y axis.
	// Cards with points flip but in a random direction, to the left or to the right
	const blankNoRotateY = isBlank ? 0 : (Math.random() < 0.5 ? -1 : 1) * 180

	// blank cards are turned 90 degrees so they take up less space
	const blankRotateZ = isBlank ? -90 : 0

	// blank cards are delayed so they slide left in a staggered sequence
	const blankRightDelay = isBlank ? 0.5 + (index - firstblankIndex) * 0.25 : 0

	const blankMoveDuration = 0.25

	// first blank card ends it's movement 0.75s from beginning of animation
	const totalblankMoveTime = 0.75 + numberOfBlanks * blankMoveDuration

	// cards with points take 0.5s to flip and show their points
	const aDuration = 0.5

	// flip occurs 0.5s after the last blankcard has finished moving
	const aDelay = isBlank ? 0 : totalblankMoveTime + 0.5

	// blank cards are stacked on top of each other so z-index needs to
	// increase from last card to first card going to the left.
	// cards with points are not stacked, so z-index is 0
	const blankZIndex = isBlank ? numberFromLastCard : 0

	return (
		<AnimatePresence>
			<motion.div
				initial={{
					scale: 0,
					right: 0,
					bottom: 0,
					rotateY: blankNoRotateY,
					rotateZ: blankRotateZ,
					opacity: 0.5,
				}}
				animate={{
					scale: blankScaleA,
					right: blankRightA,
					bottom: 0,
					rotateY: 0,
					rotateZ: blankRotateZ,
					opacity: 1,
				}}
				exit={{ opacity: 0, scale: 0 }}
				transition={{
					duration: blankMoveDuration,
					delay: blankRightDelay,
					ease: 'easeInOut',
					rotateY: {
						duration: aDuration,
						delay: aDelay,
					},
					rotateZ: {
						duration: 0,
						delay: 0,
					},
					opacity: {
						duration: aDuration,
					},
					scale: {
						type: 'spring',
						damping: 30,
						stiffness: 200,
						mass: 5,
						restDelta: 0.001,
					},
				}}
				className={`card card-points ${blankPosition}`}
				style={{ zIndex: blankZIndex }}
			>
				<figure className='size-32 object-cover absolute'>
					<SealifeImage imageNum={imageNumber} alt={`${name} avatar profile`} />
				</figure>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: aDuration, delay: aDelay, ease: 'easeInOut' }}
					className={`card-body card-body-points ${bgTextColorGap}`}
				>
					<h2
						className='card-title text-4xl h-10 tracking-wide'
						style={{
							textShadow: '1px 1px 1px black, 3px 3px 1px black',
						}}
					>
						{storyPoint}
					</h2>

					<div
						className='text-[1.1rem] leading-5 h-10 flex items-center'
						style={{
							textShadow: '1px 1px 1px black, 2px 2px 1px black',
						}}
					>
						{name}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}
