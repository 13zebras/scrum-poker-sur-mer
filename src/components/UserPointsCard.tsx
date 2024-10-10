import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'
import { SealifeImage } from './SealifeImage'
import { motion, AnimatePresence } from 'framer-motion'

type CardProps = {
	name: string
	storyPoint: string
	imageNumber: number
	index: number
	numberOfCards: number
	numberOfBlanks: number
	showPoints: boolean
	containerWidth: number
}

export default function UserPointsCard({
	name,
	storyPoint,
	imageNumber,
	index,
	numberOfCards,
	numberOfBlanks,
	showPoints,
	containerWidth,
}: CardProps) {
	// '--' is a blank card
	const isBlank = storyPoint === '--'

	// isMoveBlank is used to determine if the card is removed to the bottom
	// of the container and scaled to 0.8 in size
	const isMoveBlank = showPoints && isBlank

	const cardSize = 128
	const blankGap = 4
	const blankScale = 0.8
	const blankSize = cardSize * blankScale

	// when showing points, the opacity of the black "cover" is 35%
	const showPointsOpacity = showPoints ? '35' : '20'

	// blank cards have a few different css properties
	const bgTextColorGap = isMoveBlank
		? 'bg-black/40 text-gray-350'
		: `bg-black/${showPointsOpacity} text-gray-100`

	const blankPosition = isMoveBlank ? 'absolute' : 'relative'

	// need the index of the first blank card to get the proper seuquence and delay
	const firstblankIndex = numberOfBlanks > 0 ? numberOfCards - numberOfBlanks : 0

	// this card is how many cards from the end card?
	const numberFromLastCard = numberOfCards - index - 1

	// blank cards are 80% of the size of the other cards
	const scaleAnimate = isMoveBlank ? blankScale : 1

	// How many blank cards can fit in the Card Container width?
	const maxBlanksPerRow = Math.floor(containerWidth / (blankSize + blankGap))

	// Maximum number of rows would be 1 card per row with a very narrow container
	// which would equal the number of blank cards. The ideal number of rows is reached
	// when the maxBlanksPerRow exceeds the numberOfBlanks / i, where i is the number of rows.
	let numberOfRows = 1 // Default to 1 row
	for (let i = 1; i < numberOfBlanks; i++) {
		const blanksPerRow = Math.ceil(numberOfBlanks / i)
		if (maxBlanksPerRow >= blanksPerRow) {
			numberOfRows = i
			break
		}
	}

	const numberOfBlanksPerRow = Math.ceil(numberOfBlanks / numberOfRows)

	// scalingPositionOffset is shifting rows down due to scaling of cards.
	const scalingPositionOffset = (cardSize - blankSize) / 2

	const additionalBottomOffset = 0

	const scalingBottomOffset = -1 * (scalingPositionOffset + blankSize) + additionalBottomOffset

	// The right position of the blank card is determined by the
	// number of cards from the last card in the row.
	const blankRightAnimate = isMoveBlank
		? (numberFromLastCard % numberOfBlanksPerRow) * (blankSize + blankGap) - scalingPositionOffset
		: 0

	// What row is this card in? Top row is 0.
	const thisCardRow = Math.floor(numberFromLastCard / numberOfBlanksPerRow)

	const showHowMuchBlankCard = 0.4

	// Bottom position is determined by the row number times the portion
	// of the card that we want to show, in this case 40%. And we are placing
	// the top row at bottom = 0, and all lower rows below the bottom = 0.
	const thisCardRowBottom = isMoveBlank
		? -1 * thisCardRow * blankSize * showHowMuchBlankCard + scalingBottomOffset
		: 0

	const lastRowBottom = isMoveBlank
		? -1 * (numberOfRows - 1) * blankSize * showHowMuchBlankCard + scalingBottomOffset
		: 0

	// blank cards do not turn around the y axis.
	// Cards with points turn but in a random direction, to the left or to the right
	const rotateY = isMoveBlank ? 0 : (Math.random() < 0.5 ? -1 : 1) * 180

	// blank cards are delayed so they slide left in a staggered sequence
	const blankMoveDelay = isMoveBlank ? 0.5 + (index - firstblankIndex) * 0.25 : 0

	const blankMoveDuration = 0.25

	// first blank card ends it's movement 0.75s from beginning of animation
	const totalblankMoveTime = 0.75 + numberOfBlanks * blankMoveDuration

	// cards with points take 0.5s to flip and show their points
	const animateDuration = 0.5

	// flip occurs 0.5s after the last blankcard has finished moving
	const animateDelay = isMoveBlank || !showPoints ? 0 : totalblankMoveTime + 0.5

	// blank cards rows are stacked on top of each other so z-index needs to
	// increase from top card row to bottom card row going down..
	// cards with points are not stacked, so z-index is 0
	const blankZIndex = isMoveBlank ? 50 - thisCardRow : 0

	return (
		<AnimatePresence>
			<motion.div
				initial={{
					scale: 0,
					right: 0,
					bottom: lastRowBottom,
					rotateY: rotateY,
					opacity: 0.5,
				}}
				animate={{
					scale: scaleAnimate,
					right: blankRightAnimate,
					bottom: thisCardRowBottom,
					rotateY: 0,
					opacity: 1,
				}}
				exit={{ opacity: 0, scale: 0 }}
				transition={{
					duration: blankMoveDuration,
					delay: blankMoveDelay,
					ease: 'easeInOut',
					rotateY: {
						duration: animateDuration,
						delay: animateDelay,
					},
					opacity: {
						duration: animateDuration,
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
					transition={{ duration: animateDuration, delay: animateDelay, ease: 'easeInOut' }}
					className={`card-body card-body-points ${bgTextColorGap}`}
				>
					{showPoints || isBlank ? (
						<h2
							className='card-title text-[2.5rem] h-12 tracking-wide'
							style={{
								textShadow: '1px 1px 1px black, 3px 3px 1px black',
							}}
						>
							{storyPoint}
						</h2>
					) : (
						<JellyFishOutlineIcon
							className='animate-fade-in-500 text-[3rem] h-12 font-bold'
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
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}
